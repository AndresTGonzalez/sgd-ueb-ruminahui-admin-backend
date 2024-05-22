import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Title } from '@prisma/client';

@Injectable()
export class TitleService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Title[]> {
    return this.prismaService.title.findMany();
  }

  async findOne(id: number): Promise<Title> {
    return this.prismaService.title.findUnique({
      where: { id },
    });
  }

  // Find by personalId
  async findByPersonalId(personalId: number): Promise<Title[]> {
    return this.prismaService.title.findMany({ where: { personalId } });
  }

  async create(data: Title) {
    return this.prismaService.title.create({ data });
  }

  async update(id: number, data: Title) {
    return this.prismaService.title.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prismaService.title.delete({ where: { id } });
  }

  // Delete by personalId
  async deleteByPersonalId(personalId: number) {
    return this.prismaService.title.deleteMany({ where: { personalId } });
  }
}
