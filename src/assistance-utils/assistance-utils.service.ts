import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssistanceUtilsService {
  constructor(private readonly prisma: PrismaService) {}

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
        return 1; // Código para a tiempo
      } else {
        return 2; // Código para tarde
      }
    } else if (clockCheckHour === departureHour) {
      if (Math.abs(clockCheckMinutes - departureMinutes) <= 59) {
        return 1; // Código para a tiempo
      } else {
        return 2; // Código para tarde
      }
    } else {
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

          const noAssistanceRecord = await this.prisma.assistance.findFirst({
            where: {
              AssistancePersonalIdentificator: {
                personalId: employee.id,
              },
              clockCheck: currentDate,
            },
          });

          if (!noAssistanceRecord) {
            await this.registerNoAssistance(employee.id, currentDate);
          } else {
            console.log(
              `Ya existe un registro de no asistencia para el empleado ${employee.id} el ${currentDate.toDateString()}.`,
            );
          }
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
