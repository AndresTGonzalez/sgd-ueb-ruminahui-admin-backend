import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { City } from '@prisma/client';

@Injectable()
export class CitiesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<City[]> {
    return this.prismaService.city.findMany();
  }

  async findOne(id: number): Promise<City> {
    return this.prismaService.city.findUnique({
      where: { id },
    });
  }

  async findByProvinceId(provinceId: number): Promise<City[]> {
    return this.prismaService.city.findMany({
      where: { provinceId },
      orderBy: { name: 'asc' },
    });
  }
}
