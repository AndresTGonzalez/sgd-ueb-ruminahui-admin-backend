import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCampusDto } from './campus.model';
import { Campus } from '@prisma/client';

@Injectable()
export class CampusService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCampusDto: CreateCampusDto): Promise<Campus> {
    return this.prismaService.campus.create({
      data: createCampusDto,
    });
  }

  async findAll(): Promise<Campus[]> {
    return this.prismaService.campus.findMany();
  }

  async findOne(id: number): Promise<Campus> {
    return this.prismaService.campus.findUnique({ where: { id } });
  }

  async update(id: number, data: CreateCampusDto): Promise<Campus> {
    return this.prismaService.campus.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Campus> {
    return this.prismaService.campus.delete({ where: { id } });
  }
}
