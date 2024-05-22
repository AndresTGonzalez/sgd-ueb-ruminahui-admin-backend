import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InstitutionalPersonalData } from '@prisma/client';

@Injectable()
export class InstitutionalPersonalDataService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<InstitutionalPersonalData[]> {
    return this.prismaService.institutionalPersonalData.findMany({
      include: {
        CampusPersonal: true,
        Category: true,
        Function: true,
        Journal: true,
        LaboralRegime: true,
        LaboralRelationship: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.institutionalPersonalData.findUnique({
      where: { id },
    });
  }

  // Find by personalId
  async findByPersonalId(personalId: number) {
    return this.prismaService.institutionalPersonalData.findMany({
      where: { personalId },
      include: {
        CampusPersonal: true,
        Category: true,
        Function: true,
        Journal: true,
        LaboralRegime: true,
        LaboralRelationship: true,
      },
    });
  }

  async create(data: InstitutionalPersonalData) {
    return this.prismaService.institutionalPersonalData.create({ data });
  }

  async update(id: number, data: InstitutionalPersonalData) {
    return this.prismaService.institutionalPersonalData.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prismaService.institutionalPersonalData.delete({
      where: { id },
    });
  }

  // Delete by personalId
  async deleteByPersonalId(personalId: number) {
    return this.prismaService.institutionalPersonalData.deleteMany({
      where: { personalId },
    });
  }
}
