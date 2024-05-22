import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MedicalPersonalData } from '@prisma/client';

@Injectable()
export class MedicalPersonalDataService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<MedicalPersonalData[]> {
    return this.prismaService.medicalPersonalData.findMany({
      include: {
        BloodType: true,
        Personal: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.medicalPersonalData.findUnique({
      where: { id },
    });
  }

  // Find by personalId
  async findByPersonalId(personalId: number) {
    return this.prismaService.medicalPersonalData.findMany({
      where: { personalId },
      include: {
        BloodType: true,
        Personal: true,
      },
    });
  }

  async create(data: MedicalPersonalData) {
    return this.prismaService.medicalPersonalData.create({ data });
  }

  async update(id: number, data: MedicalPersonalData) {
    return this.prismaService.medicalPersonalData.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prismaService.medicalPersonalData.delete({
      where: { id },
    });
  }

  // Delete by personalId
  async deleteByPersonalId(personalId: number) {
    return this.prismaService.medicalPersonalData.deleteMany({
      where: { personalId },
    });
  }
}
