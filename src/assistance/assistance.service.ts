import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Assistance, AssistancePersonalIdentificator } from '@prisma/client';

@Injectable()
export class AssistanceService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Assistance[]> {
    return this.prismaService.assistance.findMany();
  }

  async findOne(id: number): Promise<Assistance> {
    return this.prismaService.assistance.findUnique({
      where: { id },
    });
  }

  async findByPersonalId(personalId: number) {
    // TODO: Probar correcta funcionalidad

    // Obtener todos los identificadores de asistencia de un personal
    const assistancePersonalIdentificators =
      await this.prismaService.assistancePersonalIdentificator.findMany({
        where: { personalId },
      });

    // Obtener todas las asistencias de un personal
    const assistances: Assistance[] = [];
    for (const assistancePersonalIdentificator of assistancePersonalIdentificators) {
      const assistance = await this.prismaService.assistance.findFirst({
        where: {
          assistancePersonalIdentificatorId: assistancePersonalIdentificator.id,
        },
      });
      assistances.push(assistance);
    }

    return assistances;
  }

  async create(data: Assistance): Promise<Assistance> {
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

  // TODO: Implementar
  async syncFromSupabase() {}

  // TODO: Implementar
  async syncFromZKTeco() {}

  // TODO: Implementar
  async syncFromHikvision() {}
}
