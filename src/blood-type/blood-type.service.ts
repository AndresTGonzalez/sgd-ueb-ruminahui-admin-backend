import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BloodType } from '@prisma/client';

@Injectable()
export class BloodTypeService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string }): Promise<BloodType> {
    return this.prisma.bloodType.create({ data });
  }

  async findAll(): Promise<BloodType[]> {
    return this.prisma.bloodType.findMany();
  }

  async findOne(id: number): Promise<BloodType> {
    return this.prisma.bloodType.findUnique({ where: { id } });
  }

  async update(id: number, data: { name: string }): Promise<BloodType> {
    return this.prisma.bloodType.update({ where: { id }, data });
  }

  async remove(id: number): Promise<BloodType> {
    return this.prisma.bloodType.delete({ where: { id } });
  }
}
