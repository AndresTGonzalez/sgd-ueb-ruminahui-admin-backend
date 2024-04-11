import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MaritalStatus } from '@prisma/client';

@Injectable()
export class MaritalStatusesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<MaritalStatus[]> {
    return this.prismaService.maritalStatus.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number): Promise<MaritalStatus> {
    return this.prismaService.maritalStatus.findUnique({
      where: { id },
    });
  }
}
