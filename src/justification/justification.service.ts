import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Justification } from '@prisma/client';
import { JustificationFileService } from 'src/justification-file/justification-file.service';
import { JustificationSupabaseService } from 'src/justification-supabase/justification-supabase.service';

@Injectable()
export class JustificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly justificationFileService: JustificationFileService,
    private readonly justificationSupabase: JustificationSupabaseService,
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

    // Castear extraInfo a un objeto JSON
    // data.extraInfo = JSON.parse(data.extraInfo);
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
}
