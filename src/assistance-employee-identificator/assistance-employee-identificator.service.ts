import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssistanceEmployeeIdentificatorService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.assistanceEmployeeIdentificator.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.assistanceEmployeeIdentificator.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return this.prismaService.assistanceEmployeeIdentificator.create({ data });
  }
}
