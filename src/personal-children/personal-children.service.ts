import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PersonalChildren } from '@prisma/client';

@Injectable()
export class PersonalChildrenService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<PersonalChildren[]> {
    return this.prismaService.personalChildren.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.personalChildren.findUnique({
      where: { id },
    });
  }

  async create(data: PersonalChildren) {

    data.personalId = Number(data.personalId);

    return this.prismaService.personalChildren.create({ data });
  }

  async update(id: number, data: PersonalChildren) {
    return this.prismaService.personalChildren.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prismaService.personalChildren.delete({ where: { id } });
  }

  async removeByPersonalId(personalId: number) {
    return this.prismaService.personalChildren.deleteMany({
      where: { personalId },
    });
  }

  async findByPersonalId(personalId: number) {
    return this.prismaService.personalChildren.findMany({
      where: { personalId },
    });
  }
}
