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
      include: {
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
      onTime: record.onTime,
    }));

    // return this.prismaService.assistance.findMany({
    //   include: {
    //     AssistancePersonalIdentificator: {
    //       include: {
    //         Personal: true,
    //       },
    //     },
    //   },
    // });
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

  async syncFromSupabase(): Promise<Boolean> {
    const supabase = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );
    const { data, error } = await supabase
      .from('assistance')
      .select('*')
      .eq('sync_status', false);

    if (error) {
      throw new Error('Error al obtener los registros de asistencias' + error);
    }
    const assistances: AssistanceSupabaseFetch[] = data;

    for (const assistance of assistances) {
      const assistancePersonalIdentificator =
        await this.assistancePersonalIdentificatorService.findByCode(
          assistance.user_uuid,
        );
      const newAssistance = {
        assistancePersonalIdentificatorId: assistancePersonalIdentificator.id,
        clockCheck: new Date(assistance.clock_check),
        onTime: true,
      };
      const response = await this.create(newAssistance);

      const updatedAssistance = await supabase
        .from('assistance')
        .update({ sync_status: true })
        .eq('id', assistance.id);
    }
    return true;
  }

  // TODO: Implementar
  async syncFromZKTeco() {}

  // TODO: Implementar
  async syncFromHikvision() {}

  async verifyOnTime(clockCheck: Date, personalId: number) {
    const clockCheckDate = new Date(clockCheck);

    const clockCheckHour = clockCheckDate.getUTCHours();
    const clockCheckMinutes = clockCheckDate.getMinutes();

    const clockCheckDay = clockCheckDate.getDay();

    // Obtener el horario del personal para el día de la semana
    const personalSchedule =
      await this.personalScheduleService.findByPersonalIdAndDay(
        personalId,
        clockCheckDay,
      );

    console.log(personalSchedule);
    console.log(clockCheck);
    // Obtener la hora de entrada y salida del personal
    const entryTime = personalSchedule[0].start;
    const departureTime = personalSchedule[0].end;

    // Seoarar la hora, minutos y segundos de la hora de entrada
    const [entryHour, entryMinutes, entrySeconds] = entryTime.split(':');
    const [departureHour, departureMinutes, departureSeconds] =
      departureTime.split(':');

    // Pasear a entero la hora, minutos y segundos de la hora de entrada
    const entryHourInt = parseInt(entryHour);
    const entryMinutesInt = parseInt(entryMinutes);

    // Pasear a entero la hora, minutos y segundos de la hora de salida
    const departureHourInt = parseInt(departureHour);
    const departureMinutesInt = parseInt(departureMinutes);

    if (clockCheckHour === entryHourInt) {
      if (Math.abs(clockCheckMinutes - entryMinutesInt) <= 2) {
        console.log('Entrada a tiempo');
        return true;
      } else {
        console.log('Entrada tarde');
        return false;
      }
    } else if (clockCheckHour === departureHourInt) {
      if (Math.abs(clockCheckMinutes - departureMinutesInt) <= 2) {
        console.log('Salida a tiempo');
        return true;
      } else {
        console.log('Salida a deshora');
        return false;
      }
    } else {
      console.log('Fuera de horario');
      return false;
    }
  }
}
