import { Injectable } from '@nestjs/common';
import { PrismaIvmsService } from 'src/prisma-ivms/prisma-ivms.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssistanceIvmsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaIvms: PrismaIvmsService,
  ) {}

  async getAssistanceIvms() {
    return await this.prismaIvms.logs.findMany();
  }

  async syncAssistance() {
    // Primero se obtiene los registros de asistencia de la base de datos de biotime que tengan Null en el SyncStatus
    const assistances = await this.prismaIvms.logs.findMany({
      where: {
        SyncStatus: null,
      },
    });

    let startDate: Date | null = null;
    const endDate = new Date();

    // Recorrer los registros de asistencia
    for (const assistance in assistances) {
      // Obtener el empleado con el codigo de empleado
      const assistancePersonalIdentificator =
        await this.prisma.assistancePersonalIdentificator.findFirst({
          where: { code: assistances[assistance].ID },
        });

      // Si no se encuentra el empleado se continua al siguiente
      if (!assistancePersonalIdentificator) {
        console.log(
          `No se encontró el empleado con el código ${assistances[assistance].ID}.`,
        );
        continue;
      }

      const clockCheckDate = new Date(assistances[assistance].AuthDateTime);

      if (!startDate || clockCheckDate < startDate) {
        startDate = clockCheckDate;
      }

      // Se crea un nuevo registro de asistencia
      const newAssistance = {
        assistancePersonalIdentificatorId: assistancePersonalIdentificator.id,
        clockCheck: clockCheckDate,
        assistanceStatusId: await this.verifyOnTime(
          clockCheckDate,
          assistancePersonalIdentificator.personalId,
        ), // Código para asistencia
      };

      await this.prisma.assistance.create({ data: newAssistance });

      // Actualizar el sync_status del registro de asistencia
      await this.prismaIvms.logs.update({
        where: { LogId: assistances[assistance].LogId },
        data: { SyncStatus: 1 },
      });
    }
    if (startDate) {
      // await this.checkForAbsences(startDate, endDate);
    }
  }

  async verifyOnTime(clockCheck: Date, personalId: number): Promise<any> {
    const clockCheckDate = new Date(clockCheck);
    const clockCheckHour = clockCheckDate.getUTCHours();
    const clockCheckMinutes = clockCheckDate.getMinutes();
    const clockCheckDay = clockCheckDate.getDay();

    const personalSchedule = await this.prisma.personalSchedule.findFirst({
      where: {
        personalId,
        dayOfWeek: clockCheckDay,
      },
    });

    if (!personalSchedule) {
      // console.log('No schedule found for this day.');
      return 4;
    }

    const [entryHour, entryMinutes] = personalSchedule.start
      .split(':')
      .map(Number);
    const [departureHour, departureMinutes] = personalSchedule.end
      .split(':')
      .map(Number);

    // Si la hora de registro es igual o menor a 1 hora entrada se debe agregar un rango
    if (clockCheckHour === entryHour - 1) return 1;

    if (clockCheckHour === departureHour + 1) return 1;

    if (clockCheckHour === entryHour) {
      const diff = Math.abs(clockCheckMinutes - entryMinutes);
      if (diff <= 2) {
        // console.log('Entrada a tiempo');
        return 1; // Código para a tiempo
      } else {
        // console.log('Entrada tarde');
        return 2; // Código para tarde
      }
    } else if (clockCheckHour === departureHour) {
      if (Math.abs(clockCheckMinutes - departureMinutes) <= 59) {
        // console.log('Salida a tiempo');
        return 1; // Código para a tiempo
      } else {
        // console.log('Salida a deshora');
        return 2; // Código para tarde
      }
    } else {
      // console.log('Fuera de horario');
      return 4; // Código para inconsistencia
    }
  }

  async checkForAbsences(startDate: Date, endDate: Date): Promise<any> {
    const employees = await this.prisma.personal.findMany();

    for (const employee of employees) {
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const clockCheckDay = currentDate.getDay();

        const personalSchedule = await this.prisma.personalSchedule.findFirst({
          where: {
            personalId: employee.id,
            dayOfWeek: clockCheckDay,
          },
        });
        if (!personalSchedule) {
          currentDate.setDate(currentDate.getDate() + 1);
          continue; // Si no hay horario programado, saltar al siguiente día
        }

        const startOfDay = new Date(currentDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(currentDate);
        // endOfDay.setHours(23, 59, 59, 999);
        // Establecer la hora de endOfDay a la hora actual
        endOfDay.setHours(
          currentDate.getHours(),
          currentDate.getMinutes(),
          0,
          0,
        );

        const assistances = await this.prisma.assistance.findMany({
          where: {
            AssistancePersonalIdentificator: {
              personalId: employee.id,
            },
            clockCheck: {
              gte: startOfDay,
              lt: endOfDay,
            },
          },
        });

        const entryHour = parseInt(personalSchedule.start.split(':')[0]);
        const entryMinutes = parseInt(personalSchedule.start.split(':')[1]);

        const departureHour = parseInt(personalSchedule.end.split(':')[0]);
        const departureMinutes = parseInt(personalSchedule.end.split(':')[1]);

        const entryRecords = assistances.filter((a) => {
          const checkTime = new Date(a.clockCheck);
          return (
            checkTime.getUTCHours() === entryHour &&
            Math.abs(checkTime.getUTCMinutes() - entryMinutes) <= 2
          );
        });

        const exitRecords = assistances.filter((a) => {
          const checkTime = new Date(a.clockCheck);
          return (
            checkTime.getUTCHours() === departureHour &&
            Math.abs(checkTime.getUTCMinutes() - departureMinutes) <= 2
          );
        });

        if (entryRecords.length === 0 || exitRecords.length === 0) {
          console.log(
            `El empleado ${employee.id} no ha registrado su asistencia correctamente el ${currentDate.toDateString()}.`,
          );
          await this.registerNoAssistance(employee.id, currentDate);
        }

        currentDate.setDate(currentDate.getDate() + 1); // Avanzar al siguiente día
      }
    }
  }

  async registerNoAssistance(personalId: number, date: Date): Promise<any> {
    const assistancePersonalIdentificator =
      await this.prisma.assistancePersonalIdentificator.findFirst({
        where: { personalId },
      });

    if (!assistancePersonalIdentificator) {
      console.log(
        `No se encontró el identificador de asistencia para el empleado ${personalId}.`,
      );
      return;
    }

    const newAssistance = {
      assistancePersonalIdentificatorId: assistancePersonalIdentificator.id,
      // clockCheck: new Date('1970-01-01T00:00:00.000Z'), // Utilizamos la siguiente fecha para registrar la falta de asistencia 01/01/1970
      clockCheck: date,
      assistanceStatusId: 3, // Código para falta de asistencia
    };

    await this.prisma.assistance.create({ data: newAssistance });

    console.log(
      `Se ha registrado la falta de asistencia del empleado ${personalId} el ${date.toDateString()}.`,
    );
  }
}
