import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Sex } from '@prisma/client';

@Injectable()
export class SexsService {
  constructor(private readonly prismService: PrismaService) {}

  async findAll(): Promise<Sex[]> {
    return this.prismService.sex.findMany();
  }

  async findOne(id: number): Promise<Sex> {
    return this.prismService.sex.findFirst({
      where: { id: id },
    });
  }
}
