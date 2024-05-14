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

  async findByPersonalId(personalId: number): Promise<CampusPersonal[]> {
    return this.prismaService.campusPersonal.findMany({
      where: { personalId },
      orderBy: { personalId: 'asc' },
    });
  }

  async create(data: CampusPersonal): Promise<CampusPersonal> {
    return this.prismaService.campusPersonal.create({ data });
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
}
