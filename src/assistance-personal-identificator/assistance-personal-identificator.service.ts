import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssistancePersonalIdentificator } from '@prisma/client';

@Injectable()
export class AssistancePersonalIdentificatorService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.assistancePersonalIdentificator.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.assistancePersonalIdentificator.findUnique({
      where: { id },
      include: { Personal: true },
    });
  }

  async create(data: any) {
    return this.prismaService.assistancePersonalIdentificator.create({ data });
  }

  async findByCode(code: string) {
    return this.prismaService.assistancePersonalIdentificator.findFirst({
      where: { code },
    });
  }

  // Delete by personalId
  async deleteByPersonalId(personalId: number) {
    return this.prismaService.assistancePersonalIdentificator.deleteMany({
      where: { personalId },
    });
  }
}
