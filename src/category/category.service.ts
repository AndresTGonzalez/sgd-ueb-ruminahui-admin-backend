import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return this.prismaService.category.findMany();
  }

  async findOne(id: number): Promise<Category> {
    return this.prismaService.category.findUnique({
      where: { id },
    });
  }
}
