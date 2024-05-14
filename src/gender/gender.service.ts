import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Gender } from '@prisma/client';

@Injectable()
export class GenderService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Gender[]> {
    return this.prisma.gender.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number): Promise<Gender> {
    return this.prisma.gender.findFirst({
      where: { id },
    });
  }
}
