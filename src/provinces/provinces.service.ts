import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Province } from '@prisma/client';

@Injectable()
export class ProvincesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Province[]> {
    return this.prismaService.province.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number): Promise<Province> {
    return this.prismaService.province.findUnique({
      where: { id },
    });
  }
}
