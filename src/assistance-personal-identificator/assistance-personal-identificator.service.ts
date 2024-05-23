import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssistancePersonalIdentificator } from '@prisma/client';

@Injectable()
export class AssistancePersonalIdentificatorService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const records =
      await this.prismaService.assistancePersonalIdentificator.findMany({
        include: { Personal: true, AssistanceDispositive: true },
      });

    return records.map((record) => ({
      id: record.id,
      code: record.code,
      dispositive: record.AssistanceDispositive.name,
    }));
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
