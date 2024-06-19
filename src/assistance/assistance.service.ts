import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Assistance, AssistancePersonalIdentificator } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { AssistancePersonalIdentificatorService } from 'src/assistance-personal-identificator/assistance-personal-identificator.service';
import { AssistanceSupabaseFetch } from './assistance-supabase.model';
import { createAssistance } from './assistance.model';
import { PersonalScheduleService } from 'src/personal-schedule/personal-schedule.service';

@Injectable()
export class AssistanceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly assistancePersonalIdentificatorService: AssistancePersonalIdentificatorService,
    private readonly personalScheduleService: PersonalScheduleService,
  ) {}

  async findAll(): Promise<any[]> {
    const records = await this.prismaService.assistance.findMany({
      orderBy: {
        clockCheck: 'desc',
      },
      include: {
        AssistanceStatus: true,
        AssistancePersonalIdentificator: {
          include: {
            Personal: {
              select: {
                identificationCard: true,
                names: true,
                lastNames: true,
              },
            },
          },
        },
      },
    });
    return records.map((record) => ({
      id: record.id,
      identificationCard:
        record.AssistancePersonalIdentificator.Personal.identificationCard,
      names: record.AssistancePersonalIdentificator.Personal.names,
      lastNames: record.AssistancePersonalIdentificator.Personal.lastNames,
      clockCheck: record.clockCheck,
      assistanceStatusId: record.assistanceStatusId,
      assistanceStatusTag: record.AssistanceStatus.name.toUpperCase(),
    }));
  }

  async findOne(id: number): Promise<Assistance> {
    return this.prismaService.assistance.findUnique({
      where: { id },
    });
  }

  async getAssistancesWithinDateRange(startDate: Date, endDate: Date) {
    return this.prismaService.assistance.findMany({
      where: {
        clockCheck: {
          gte: startDate, // Fecha de inicio del rango
          lte: endDate, // Fecha de fin del rango
        },
      },
    });
  }

  async getAssistancesWithinDateRangeForExcel(startDate: Date, endDate: Date) {
    let assistancesList = [];

    const assistances = await this.getAssistancesWithinDateRange(
      startDate,
      endDate,
    );

    for (const assistance of assistances) {
      const assistancePersonalIdentificator =
        await this.assistancePersonalIdentificatorService.findOne(
          assistance.assistancePersonalIdentificatorId,
        );

      const identificationCard =
        assistancePersonalIdentificator.Personal.identificationCard;

      const fullName =
        assistancePersonalIdentificator.Personal.names +
        ' ' +
        assistancePersonalIdentificator.Personal.lastNames;

      const clockCheck = assistance.clockCheck;

      assistancesList.push({
        identificationCard,
        fullName,
        clockCheck,
      });
    }
    return assistancesList;
  }

  async getAssistancesWithinDateRangeByPersonalId(
    startDate: Date,
    endDate: Date,
    personalId: number,
  ) {
    const assistancePersonalIdentificators =
      await this.prismaService.assistancePersonalIdentificator.findMany({
        where: { personalId },
      });

    const assistances: Assistance[] = [];
    for (const assistancePersonalIdentificator of assistancePersonalIdentificators) {
      const assistance = await this.prismaService.assistance.findMany({
        where: {
          assistancePersonalIdentificatorId: assistancePersonalIdentificator.id,
          clockCheck: {
            gte: startDate, // Fecha de inicio del rango
            lte: endDate, // Fecha de fin del rango
          },
        },
      });
      assistances.push(...assistance);
    }

    return assistances;
  }

  async findByPersonalId(personalId: number) {
    const assistancePersonalIdentificators =
      await this.prismaService.assistancePersonalIdentificator.findMany({
        where: { personalId },
      });

    const assistances: Assistance[] = [];
    for (const assistancePersonalIdentificator of assistancePersonalIdentificators) {
      const assistance = await this.prismaService.assistance.findMany({
        where: {
          assistancePersonalIdentificatorId: assistancePersonalIdentificator.id,
        },
      });
      assistances.push(...assistance);
    }

    return assistances;
  }

  async create(data: any): Promise<Assistance> {
    return this.prismaService.assistance.create({ data });
  }

  async update(id: number, data: Assistance): Promise<Assistance> {
    return this.prismaService.assistance.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Assistance> {
    return this.prismaService.assistance.delete({
      where: { id },
    });
  }

  // Delete by personalId
  async deleteByPersonalId(personalId: number) {
    const assistancePersonalIdentificators =
      await this.prismaService.assistancePersonalIdentificator.findMany({
        where: { personalId },
      });

    for (const assistancePersonalIdentificator of assistancePersonalIdentificators) {
      await this.prismaService.assistance.deleteMany({
        where: {
          assistancePersonalIdentificatorId: assistancePersonalIdentificator.id,
        },
      });
    }
  }

  async sync() {
    await this.syncFromSupabase();
    // await this.syncFromZKTeco();
    // await this.syncFromHikvision();
  }

  async syncFromSupabase(): Promise<any> {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
    );

    const { data, error } = await supabase
      .from('assistance')
      .select('*')
      .eq('sync_status', false);

    if (error) {
      throw new Error(
        'Error al obtener los registros de asistencias: ' + error.message,
      );
    }

    const assistances = data;

    if (assistances.length === 0) {
      console.log('No hay registros de asistencia para sincronizar.');
      return true;
    }

    let startDate: Date | null = null;
    const endDate = new Date();

    for (const assistance of assistances) {
      const assistancePersonalIdentificator =
        await this.prismaService.assistancePersonalIdentificator.findFirst({
          where: { code: assistance.user_uuid },
        });

      if (!assistancePersonalIdentificator) continue;

      const clockCheckDate = new Date(assistance.clock_check);

      if (!startDate || clockCheckDate < startDate) {
        startDate = clockCheckDate;
      }

      const newAssistance = {
        assistancePersonalIdentificatorId: assistancePersonalIdentificator.id,
        clockCheck: clockCheckDate,
        assistanceStatusId: await this.verifyOnTime(
          clockCheckDate,
          assistancePersonalIdentificator.personalId,
        ), // Código para asistencia
      };

      await this.prismaService.assistance.create({ data: newAssistance });

      await supabase
        .from('assistance')
        .update({ sync_status: true })
        .eq('id', assistance.id);
    }
    if (startDate) {
      await this.checkForAbsences(startDate, endDate);
    }
    return true;
  }

  async verifyOnTime(clockCheck: Date, personalId: number): Promise<any> {
    const clockCheckDate = new Date(clockCheck);
    const clockCheckHour = clockCheckDate.getUTCHours();
    const clockCheckMinutes = clockCheckDate.getMinutes();
    const clockCheckDay = clockCheckDate.getDay();

    const personalSchedule =
      await this.prismaService.personalSchedule.findFirst({
        where: {
          personalId,
          dayOfWeek: clockCheckDay,
        },
      });

    if (!personalSchedule) {
      console.log('No schedule found for this day.');
      return 4;
    }

    const [entryHour, entryMinutes] = personalSchedule.start
      .split(':')
      .map(Number);
    const [departureHour, departureMinutes] = personalSchedule.end
      .split(':')
      .map(Number);

    if (clockCheckHour === entryHour) {
      if (Math.abs(clockCheckMinutes - entryMinutes) <= 2) {
        console.log('Entrada a tiempo');
        return 1; // Código para a tiempo
      } else {
        console.log('Entrada tarde');
        return 2; // Código para tarde
      }
    } else if (clockCheckHour === departureHour) {
      if (Math.abs(clockCheckMinutes - departureMinutes) <= 2) {
        console.log('Salida a tiempo');
        return 1; // Código para a tiempo
      } else {
        console.log('Salida a deshora');
        return 2; // Código para tarde
      }
    } else {
      console.log('Fuera de horario');
      return 4; // Código para inconsistencia
    }
  }

  async checkForAbsences(startDate: Date, endDate: Date): Promise<any> {
    const employees = await this.prismaService.personal.findMany();

    for (const employee of employees) {
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const clockCheckDay = currentDate.getDay();

        const personalSchedule =
          await this.prismaService.personalSchedule.findFirst({
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

        const assistances = await this.prismaService.assistance.findMany({
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
      await this.prismaService.assistancePersonalIdentificator.findFirst({
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
      clockCheck: date, // Utilizamos la fecha proporcionada como el momento de no registro de asistencia
      assistanceStatusId: 3, // Código para falta de asistencia
    };

    await this.prismaService.assistance.create({ data: newAssistance });

    console.log(
      `Se ha registrado la falta de asistencia del empleado ${personalId} el ${date.toDateString()}.`,
    );
  }
}
