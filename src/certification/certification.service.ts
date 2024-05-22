import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Certification } from '@prisma/client';

@Injectable()
export class CertificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Certification[]> {
    return this.prismaService.certification.findMany();
  }

  async findOne(id: number): Promise<Certification> {
    return this.prismaService.certification.findUnique({
      where: { id },
    });
  }

  // Find by personalId
  async findByPersonalId(personalId: number): Promise<Certification[]> {
    return this.prismaService.certification.findMany({ where: { personalId } });
  }

  async create(data: Certification) {
    return this.prismaService.certification.create({ data });
  }

  async update(id: number, data: Certification) {
    return this.prismaService.certification.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prismaService.certification.delete({ where: { id } });
  }

  // Delete by personalId
  async deleteByPersonalId(personalId: number) {
    return this.prismaService.certification.deleteMany({
      where: { personalId },
    });
  }
}
