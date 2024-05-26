import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Justification } from '@prisma/client';
import { JustificationSupabaseService } from 'src/justification-supabase/justification-supabase.service';
import { application } from 'express';

@Injectable()
export class JustificationService {
  constructor(
    private readonly prisma: PrismaService,
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
    return this.prisma.justification.findUnique({ where: { id } });
  }

  async update(id: number, data: Justification) {
    return this.prisma.justification.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.justification.delete({ where: { id } });
  }

  // Sync Justifications from Supabase
  async syncJustifications() {
    return this.justificationSupabase.syncJustifications();
  }
}
