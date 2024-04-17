import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LaboralRelationshipService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.laboralRelationship.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.laboralRelationship.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return this.prismaService.laboralRelationship.create({ data });
  }

  async update(id: number, data) {
    return this.prismaService.laboralRelationship.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prismaService.laboralRelationship.delete({
      where: { id },
    });
  }
}
