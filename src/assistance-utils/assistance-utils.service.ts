import { Injectable } from '@nestjs/common';
import { NotificationMailService } from 'src/notification-mail/notification-mail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssistanceUtilsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationMailService,
  ) {}

  async verifyOnTime(clockCheck: Date, personalId: number): Promise<any> {
    console.log('clockCheck', clockCheck);

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
      // await this.notificationService.sendRecordatory(
      //   personal.names + ' ' + personal.lastNames,
      //   personal.email,
      // );
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

    if (clockCheckHour > departureHour) return 1;

    if (
      clockCheckHour === departureHour &&
      clockCheckMinutes - departureMinutes > 0
    ) {
      return 1;
    }

    if (clockCheckHour === entryHour) {
      const diff = clockCheckMinutes - entryMinutes;
      if (diff < 0) {
        return 1; // Código para a tiempo
      } else {
        // Aqui se envia el correo
        // await this.notificationService.sendRecordatory(
        //   personal.names + ' ' + personal.lastNames,
        //   personal.email,
        // );
        return 2; // Código para tarde
      }
    } else if (clockCheckHour === departureHour) {
      if (Math.abs(clockCheckMinutes - departureMinutes) <= 59) {
        return 1; // Código para a tiempo
      } else {
        // Aqui se envia el correo
        // await this.notificationService.sendRecordatory(
        //   personal.names + ' ' + personal.lastNames,
        //   personal.email,
        // );
        return 2; // Código para tarde
      }
    } else {
      // Aqui se envia el correo
      // await this.notificationService.sendRecordatory(
      //   personal.names + ' ' + personal.lastNames,
      //   personal.email,
      // );
      return 4; // Código para inconsistencia
    }
  }

  private convertUTCToEcuadorTime(date: Date): Date {
    // Ecuador is UTC-5
    const ecuadorOffset = -5;
    const ecuadorTime = new Date(
      date.getTime() + ecuadorOffset * 60 * 60 * 1000,
    );
    return ecuadorTime;
  }

  private isActualDate(date: Date): boolean {
    const fechaActual = new Date();

    return (
      date.getFullYear() === fechaActual.getFullYear() &&
      date.getMonth() === fechaActual.getMonth() &&
      date.getDate() === fechaActual.getDate()
    );
  }

  private isActualHourMinuteAndSecond(date: Date): boolean {
    const fechaActual = new Date();

    return (
      date.getFullYear() === fechaActual.getFullYear() &&
      date.getMonth() === fechaActual.getMonth() &&
      date.getDate() === fechaActual.getDate() &&
      date.getHours() === fechaActual.getHours() &&
      date.getMinutes() === fechaActual.getMinutes()
    );
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

        // Si el current date es igual al dia en el que me encuentro

        const startOfDay = new Date(currentDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(currentDate);
        if (!this.isActualDate(currentDate)) {
          endOfDay.setHours(23, 59, 59, 999);
        } else {
          // Se asigna la hora actual en formato ecuador al endOfDay
          const ecuadorTime = this.convertUTCToEcuadorTime(currentDate);
          endOfDay.setHours(
            ecuadorTime.getHours(),
            ecuadorTime.getMinutes(),
            ecuadorTime.getSeconds(),
            ecuadorTime.getMilliseconds(),
          );
        }

        // Capturar todo el día
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

        const entryRecords = [];
        const exitRecords = [];
        const inconsistencyRecords = [];
        const lateRecords = [];

        // Itero sobre asistencias
        for (const assistance of assistances) {
          const checkTime = new Date(assistance.clockCheck);

          const diffHourEntry = checkTime.getUTCHours() - entryHour;
          const diffMinutesEntry = checkTime.getMinutes() - entryMinutes;

          const diffHourExit = checkTime.getUTCHours() - departureHour;
          const diffMinutesExit = checkTime.getMinutes() - departureMinutes;

          if (
            (diffHourEntry === 0 && diffMinutesEntry <= 2) ||
            diffHourEntry < 0
          ) {
            entryRecords.push(assistance);
          }

          if (diffHourExit > 0 || (diffHourExit === 0 && diffMinutesExit > 0)) {
            exitRecords.push(assistance);
          }

          if (assistance.assistanceStatusId === 4) {
            inconsistencyRecords.push(assistance);
          }

          if (assistance.assistanceStatusId === 2) {
            lateRecords.push(assistance);
          }
        }

        // Obtengo el empleado
        const personal = await this.prisma.personal.findUnique({
          where: { id: employee.id },
        });

        if (personal.isActived) {
          // Falta
          if (
            entryRecords.length === 0 &&
            exitRecords.length === 0 &&
            lateRecords.length === 0 &&
            inconsistencyRecords.length === 0
          ) {
            // Se verifica que no tiene registro previamente cargado
            const noAssistanceRecord = await this.prisma.assistance.findFirst({
              where: {
                AssistancePersonalIdentificator: {
                  personalId: employee.id,
                },
                clockCheck: {
                  // Filtrar por la misma fecha ignorando la hora
                  gte: new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate(),
                  ),
                  lt: new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate() + 1,
                  ),
                },
                assistanceStatusId: 5, // Falta
              },
            });
            if (!noAssistanceRecord) {
              await this.registerNoAssistance(employee.id, currentDate, 5); // Falta
            }
          }

          if (
            entryRecords.length === 0 &&
            exitRecords.length === 0 &&
            lateRecords.length == 0 &&
            inconsistencyRecords.length === 0 &&
            !this.isActualHourMinuteAndSecond(currentDate)
          ) {
            const noAssistanceRecord = await this.prisma.assistance.findFirst({
              where: {
                AssistancePersonalIdentificator: {
                  personalId: employee.id,
                },
                clockCheck: currentDate,
                assistanceStatusId: 3, // No registro entrada
              },
            });
            if (!noAssistanceRecord) {
              await this.registerNoAssistance(employee.id, currentDate, 3); // No registro entrada
            }
          }

          if (
            exitRecords.length === 0 &&
            lateRecords.length === 0 &&
            inconsistencyRecords.length == 0 &&
            entryRecords.length == 0 &&
            !this.isActualHourMinuteAndSecond(currentDate)
          ) {
            const noAssistanceRecord = await this.prisma.assistance.findFirst({
              where: {
                AssistancePersonalIdentificator: {
                  personalId: employee.id,
                },
                clockCheck: currentDate,
                assistanceStatusId: 3, // No registro salida
              },
            });
            if (!noAssistanceRecord) {
              await this.registerNoAssistance(employee.id, currentDate, 3); // No registro salida
            }
          }
        }

        currentDate.setDate(currentDate.getDate() + 1); // Avanzar al siguiente día
      }
    }
  }

  async registerNoAssistance(
    personalId: number,
    date: Date,
    statusId: number,
  ): Promise<any> {
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
      assistanceStatusId: statusId, // Código para falta de asistencia
    };

    await this.prisma.assistance.create({ data: newAssistance });

    console.log(
      `Se ha registrado la falta de asistencia del empleado ${personalId} el ${date.toDateString()}.`,
    );
  }

  async findAssistancesBetweenDatesPersonalIdAndAssistanceStatusId(
    startDate: Date,
    endDate: Date,
    personalId: number,
    assistanceStatusId: number,
  ): Promise<any> {
    console.log('startDate', startDate);
    console.log('endDate', endDate);

    const assistances = await this.prisma.assistance.findMany({
      where: {
        AssistancePersonalIdentificator: {
          personalId,
        },
        clockCheck: {
          gte: startDate,
          lt: endDate,
        },
        assistanceStatusId,
      },
    });

    return assistances;
  }

  // Cambiar el estado de la asistencia
  async changeAssistanceStatus(id: number, statusId: number) {
    // Obtengo la asistencia
    const assistance = await this.prisma.assistance.findUnique({
      where: { id },
    });

    // Si la asistencia no existe, retorno un error
    if (!assistance) {
      return { error: 'La asistencia no existe.' };
    }

    return this.prisma.assistance.update({
      where: { id },
      data: { assistanceStatusId: statusId },
    });
  }
}
