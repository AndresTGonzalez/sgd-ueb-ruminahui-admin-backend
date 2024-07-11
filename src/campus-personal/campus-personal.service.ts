import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CampusPersonal } from '@prisma/client';

@Injectable()
export class CampusPersonalService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<CampusPersonal[]> {
    return this.prismaService.campusPersonal.findMany();
  }

  async findOne(id: number): Promise<CampusPersonal> {
    return this.prismaService.campusPersonal.findUnique({
      where: { id },
    });
  }

  async findByCampusId(campusId: number): Promise<CampusPersonal[]> {
    return this.prismaService.campusPersonal.findMany({
      where: { campusId },
      orderBy: { campusId: 'asc' },
    });
  }

  async findByPersonalId(personalId: number): Promise<number[]> {
    // Devolve un array de numeros de campusId
    return this.prismaService.campusPersonal
      .findMany({
        where: { personalId },
        select: { campusId: true },
      })
      .then((data) => data.map((item) => item.campusId));
  }

  async create(campusIds: number[], personalId: number) {
    const insertData = campusIds.map((campusId) => ({
      campusId,
      personalId,
    }));

    // ELiminar los campus anteriores
    await this.deleteByPersonalId(personalId);

    const insertedRecords = await this.prismaService.campusPersonal.createMany({
      data: insertData,
    });

    return insertedRecords;
  }

  async update(id: number, data: CampusPersonal): Promise<CampusPersonal> {
    return this.prismaService.campusPersonal.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<CampusPersonal> {
    return this.prismaService.campusPersonal.delete({
      where: { id },
    });
  }

  // Eliminar los campus de un personal
  async deleteByPersonalId(personalId: number) {
    return this.prismaService.campusPersonal.deleteMany({
      where: { personalId },
    });
  }
}
