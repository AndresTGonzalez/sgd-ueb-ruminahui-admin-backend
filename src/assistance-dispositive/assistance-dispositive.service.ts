import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssistanceDispositiveDto } from './assistance-dispositive.model';
import { AssistanceDispositive } from '@prisma/client';

@Injectable()
export class AssistanceDispositiveService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createAssistanceDispositiveDto: CreateAssistanceDispositiveDto,
  ): Promise<AssistanceDispositive> {
    return this.prismaService.assistanceDispositive.create({
      data: createAssistanceDispositiveDto,
    });
  }

  async findAll(): Promise<AssistanceDispositive[]> {
    return this.prismaService.assistanceDispositive.findMany();
  }

  async findOne(id: number): Promise<AssistanceDispositive> {
    return this.prismaService.assistanceDispositive.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateAssistanceDispositiveDto: CreateAssistanceDispositiveDto,
  ): Promise<AssistanceDispositive> {
    return this.prismaService.assistanceDispositive.update({
      where: { id },
      data: updateAssistanceDispositiveDto,
    });
  }

  async remove(id: number): Promise<AssistanceDispositive> {
    return this.prismaService.assistanceDispositive.delete({ where: { id } });
  }

  async getBySerial(serial: string): Promise<AssistanceDispositive> {
    return this.prismaService.assistanceDispositive.findFirst({
      where: {
        serial: serial,
      },
    });
  }
}
