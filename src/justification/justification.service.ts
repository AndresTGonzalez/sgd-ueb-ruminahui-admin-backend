import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Justification } from '@prisma/client';
import { JustificationFileService } from 'src/justification-file/justification-file.service';
import { JustificationSupabaseService } from 'src/justification-supabase/justification-supabase.service';
import { AssistanceUtilsService } from 'src/assistance-utils/assistance-utils.service';

@Injectable()
export class JustificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly justificationFileService: JustificationFileService,
    private readonly justificationSupabase: JustificationSupabaseService,
    private readonly assistanceUtilsService: AssistanceUtilsService,
  ) {}

  async create(data: Justification) {
    return this.prisma.justification.create({ data });
  }

  async findAll() {
    const data = await this.prisma.justification.findMany({
      include: { Personal: true, JustificationStatus: true, Type: true },
    });

    // Armar el JSON de respuesta
    const response = data.map((item) => {
      return {
        id: item.id,
        names: item.Personal.names,
        lastNames: item.Personal.lastNames,
        applicationDate: item.applicationDate,
        justificationStatusId: item.statusId,
        justificationStatus: item.JustificationStatus.name,
        type: item.Type.type,
      };
    });

    return response;
  }

  async findeBetweenDates(startDate: Date, endDate: Date) {
    const data = await this.prisma.justification.findMany({
      where: {
        applicationDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { Personal: true, JustificationStatus: true, Type: true },
    });

    // Armar el JSON de respuesta
    const response = data.map((item) => {
      return {
        id: item.id,
        names: item.Personal.names,
        lastNames: item.Personal.lastNames,
        applicationDate: item.applicationDate,
        justificationStatusId: item.statusId,
        justificationStatus: item.JustificationStatus.name,
        type: item.Type.type,
      };
    });

    return response;
  }

  async findOne(id: number) {
    // return this.prisma.justification.findUnique({ where: { id } });
    const data = await this.prisma.justification.findUnique({
      where: { id },
      include: { Personal: true, JustificationStatus: true, Type: true },
    });

    if (data.extraInfo) {
      data.extraInfo = JSON.parse(data.extraInfo);
    }

    // Armar el JSON de respuesta
    const response = {
      id: data.id,
      identificationCard: data.Personal.identificationCard,
      names: data.Personal.names,
      lastNames: data.Personal.lastNames,
      applicationDate: data.applicationDate,
      fromDate: data.fromDate,
      toDate: data.toDate,
      exitHour: data.exitHour,
      returnHour: data.returnHour,
      justificationStatusId: data.statusId,
      justificationStatus: data.JustificationStatus.name,
      type: data.Type.type,
      affair: data.affair,
      extraInfo: data.extraInfo,
    };

    return response;
  }

  async update(id: number, data: Justification) {
    return this.prisma.justification.update({ where: { id }, data });
  }

  async remove(id: number) {}

  // Sync Justifications from Supabase
  async syncJustifications() {
    return this.justificationSupabase.syncJustifications();
  }

  // Eliminar todas las justificaciones de un empleado
  async deleteJustificationsByPersonalId(personalId: number) {
    // Elimino todos los archivos de las justificaciones
    await this.justificationFileService.deleteJustificationFilesByPersonalId(
      personalId,
    );
    // Elimino todas las justificaciones
    return this.prisma.justification.deleteMany({ where: { personalId } });
  }

  // Cambiar el estado de una justificación
  async changeStatus(id: number, statusId: number) {
    const justification = await this.prisma.justification.findUnique({
      where: { id },
    });

    if (!justification) {
      return { error: 'La justificación no existe.' };
    }

    // Obtener la fecha salida y retorno de la justificación
    let fromDate = new Date(justification.fromDate);
    let toDate = new Date(justification.toDate);

    // Obtener las horas de salida y retorno de la justificación
    const exitHour = justification.exitHour;
    const returnHour = justification.returnHour;

    fromDate = this.addHoursToDate(fromDate, exitHour);
    toDate = this.addHoursToDate(toDate, returnHour);

    const personalId = justification.personalId;

    if (statusId === 2) {
      let assistance =
        await this.assistanceUtilsService.findAssistancesBetweenDatesPersonalIdAndAssistanceStatusId(
          fromDate,
          toDate,
          personalId,
          5,
        );
      if (assistance.length === 0) {
        assistance =
          await this.assistanceUtilsService.findAssistancesBetweenDatesPersonalIdAndAssistanceStatusId(
            fromDate,
            toDate,
            personalId,
            4,
          );
        if (assistance.length === 0) {
          assistance =
            await this.assistanceUtilsService.findAssistancesBetweenDatesPersonalIdAndAssistanceStatusId(
              fromDate,
              toDate,
              personalId,
              3,
            );
          if (assistance.length === 0) {
            assistance =
              await this.assistanceUtilsService.findAssistancesBetweenDatesPersonalIdAndAssistanceStatusId(
                fromDate,
                toDate,
                personalId,
                2,
              );
          }
        }
      }
      console.log(assistance);
      // Cambiar el estado de la asistencia
      const changeAssistanceStatus =
        await this.assistanceUtilsService.changeAssistanceStatus(
          assistance[0].id,
          6,
        );
    }

    if (statusId === 3) {
      const assistance =
        await this.assistanceUtilsService.findAssistancesBetweenDatesPersonalIdAndAssistanceStatusId(
          fromDate,
          toDate,
          personalId,
          6,
        );
      // Cambiar el estado de la asistencia
      const changeAssistanceStatus =
        await this.assistanceUtilsService.changeAssistanceStatus(
          assistance[0].id,
          4,
        );
    }

    return this.prisma.justification.update({
      where: { id },
      data: { statusId },
    });
  }

  private addHoursToDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setUTCHours(hours, minutes, 0, 0);
    return newDate;
  }

  // Obtener los estados de las justificaciones
  async getJustificationStatus() {
    return this.prisma.justificationStatus.findMany();
  }
}
