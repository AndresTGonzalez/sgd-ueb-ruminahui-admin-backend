import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssistanceEmployeeIdentificatorDto } from './assistance-employee-identificator.model';

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

  async create(
    createAssistanceEmployeeIdentificatorDto: CreateAssistanceEmployeeIdentificatorDto,
  ) {
    return this.prismaService.assistanceEmployeeIdentificator.create({
      data: createAssistanceEmployeeIdentificatorDto,
    });
  }

  async getAssistanceEmployeeIdentificatorByCode(
    code: string,
    assistanceDispositiveId: number,
  ) {
    return this.prismaService.assistanceEmployeeIdentificator.findFirst({
      where: { assistanceDispositiveId, code },
    });
  }
}
