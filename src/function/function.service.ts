import { Injectable } from '@nestjs/common';
import { Function } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FunctionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Function): Promise<Function> {
    return this.prismaService.function.create({ data });
  }

  async findAll(): Promise<Function[]> {
    return this.prismaService.function.findMany();
  }

  async findOne(id: number): Promise<Function> {
    return this.prismaService.function.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Function): Promise<Function> {
    return this.prismaService.function.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Function> {
    return this.prismaService.function.delete({
      where: { id },
    });
  }
}
