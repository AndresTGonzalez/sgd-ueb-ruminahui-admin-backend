import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Journal } from '@prisma/client';

@Injectable()
export class JournalService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Journal[]> {
    return this.prismaService.journal.findMany();
  }

  async findOne(id: number): Promise<Journal> {
    return this.prismaService.journal.findUnique({
      where: { id },
    });
  }
}
