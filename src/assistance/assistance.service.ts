import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Assistance } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { AssistancePersonalIdentificatorService } from 'src/assistance-personal-identificator/assistance-personal-identificator.service';
import { AssistanceIvmsService } from 'src/assistance-ivms/assistance-ivms.service';
import { AssistanceBiotimeService } from 'src/assistance-biotime/assistance-biotime.service';
import { AssistanceUtilsService } from 'src/assistance-utils/assistance-utils.service';
import { NotificationMailService } from 'src/notification-mail/notification-mail.service';

@Injectable()
export class AssistanceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly assistancePersonalIdentificatorService: AssistancePersonalIdentificatorService,
    private readonly assistanceIvmsService: AssistanceIvmsService,
    private readonly assistanceBiotimeService: AssistanceBiotimeService,
    private readonly assistanceUtilsService: AssistanceUtilsService,
    private readonly notificationMailService: NotificationMailService,
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

  async getAssistancesWithinDateRangeForTable(startDate: Date, endDate: Date) {
    const records = await this.prismaService.assistance.findMany({
      where: {
        clockCheck: {
          gte: startDate, // Fecha de inicio del rango
          lte: endDate, // Fecha de fin del rango
        },
      },
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
    const records = await this.prismaService.assistance.findMany({
      where: {
        clockCheck: {
          gte: startDate, // Fecha de inicio del rango
          lte: endDate, // Fecha de fin del rango
        },
      },
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

  async getAssistancesDataWithinDateRangeForExcel(
    startDate: Date,
    endDate: Date,
  ) {
    return this.prismaService.assistance.findMany({
      orderBy: {
        clockCheck: 'desc',
      },
      select: {
        clockCheck: true,
        id: true,
        assistanceStatusId: true,
        assistancePersonalIdentificatorId: true,
        AssistanceStatus: true,
        AssistancePersonalIdentificator: {
          select: {
            AssistanceDispositive: {
              select: {
                name: true,
              },
            },
          },
        },
      },
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

    const assistances = await this.getAssistancesDataWithinDateRangeForExcel(
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

      const dateCheck = new Date(clockCheck);
      const hourCheck = dateCheck.getHours();
      const minuteCheck = dateCheck.getMinutes();
      const secondCheck = dateCheck.getSeconds();
      const status = assistance.AssistanceStatus.name.toUpperCase();

      assistancesList.push({
        identificationCard,
        fullName: fullName.toUpperCase(),
        dateCheck: dateCheck.toLocaleDateString(),
        hourCheck: hourCheck + ':' + minuteCheck + ':' + secondCheck,
        status,
        bimetricDispositive:
          assistance.AssistancePersonalIdentificator.AssistanceDispositive.name,
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
    await this.assistanceIvmsService.syncAssistance();
    await this.assistanceBiotimeService.syncAssistance();
    // Get the current date
    let currentDate = new Date();

    // Subtract 7 days from the current date
    let dateOneWeekAgo = new Date();
    dateOneWeekAgo.setDate(currentDate.getDate() - 7);

    await this.assistanceUtilsService.checkForAbsences(
      dateOneWeekAgo,
      currentDate,
    );
  }

  async changeStatusNoPresencialAssistance(status: boolean) {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
    );

    const { data, error } = await supabase
      .from('config')
      .update({ assistance_activate: status })
      .eq('id', 1);

    if (error) {
      throw new Error(
        'Error al actualizar el estado de la asistencia no presencial: ' +
          error.message,
      );
    }

    return data;
  }

  async getStatusNoPresencialAssistance() {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
    );

    const { data, error } = await supabase
      .from('config')
      .select('*')
      .eq('id', 1);

    if (error) {
      throw new Error(
        'Error al obtener el estado de la asistencia no presencial: ' +
          error.message,
      );
    }

    return data;
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

      const personal = await this.prismaService.personal.findFirst({
        where: {
          AssistancePersonalIdentificator: {
            some: { code: assistance.user_uuid },
          },
        },
      });

      if (!assistancePersonalIdentificator) continue;

      const clockCheckDate = new Date(assistance.clock_check);

      if (!startDate || clockCheckDate < startDate) {
        startDate = clockCheckDate;
      }

      await supabase
        .from('assistance')
        .update({ sync_status: true })
        .eq('id', assistance.id);

      if (personal.isActived) {
        const newAssistance = {
          assistancePersonalIdentificatorId: assistancePersonalIdentificator.id,
          clockCheck: clockCheckDate,
          assistanceStatusId: await this.assistanceUtilsService.verifyOnTime(
            clockCheckDate,
            assistancePersonalIdentificator.personalId,
          ), // Código para asistencia
        };
        await this.prismaService.assistance.create({ data: newAssistance });
      }
    }
  }

  // Asistencia manual
  async manualAssistance(personalId: number, date: Date, time: string) {
    // Agrero la hora a la fecha
    date = this.addHoursToDate(date, time);

    // Obtengo el identificador de asistencia de la persona con el personalId
    const assistancePersonalIdentificator =
      await this.assistancePersonalIdentificatorService.findByPersonalIdAndDispositiveId(
        personalId,
        2,
      );

    // Verifico si el identificador de asistencia existe
    if (!assistancePersonalIdentificator) {
      throw new Error('No se encontró el identificador de asistencia');
    }

    // Creo la asistencia
    const newAssistance = {
      assistancePersonalIdentificatorId: assistancePersonalIdentificator.id,
      clockCheck: date,
      assistanceStatusId: await this.assistanceUtilsService.verifyOnTime(
        date,
        personalId,
      ), // Código para asistencia
    };

    // Guardo la asistencia
    await this.prismaService.assistance.create({ data: newAssistance });

    // Retorno la asistencia creada
    return newAssistance;
  }

  private addHoursToDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setUTCHours(hours, minutes, 0, 0);
    return newDate;
  }
}
