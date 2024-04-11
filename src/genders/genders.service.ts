import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Gender } from '@prisma/client';

@Injectable()
export class GendersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Gender[]> {
    return this.prismaService.gender.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number): Promise<Gender> {
    return this.prismaService.gender.findUnique({
      where: { id },
    });
  }
}
