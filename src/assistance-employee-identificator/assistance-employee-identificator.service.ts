import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssistanceEmployeeIdentificatorService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.assistancePersonalIdentificator.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.assistancePersonalIdentificator.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return this.prismaService.assistancePersonalIdentificator.create({ data });
  }
}
