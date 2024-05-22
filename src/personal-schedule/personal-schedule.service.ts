import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PersonalSchedule } from '@prisma/client';

@Injectable()
export class PersonalScheduleService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<PersonalSchedule[]> {
    return this.prismaService.personalSchedule.findMany();
  }

  async findOne(id: number): Promise<PersonalSchedule> {
    return this.prismaService.personalSchedule.findUnique({
      where: { id },
    });
  }

  async findByPersonalId(personalId: number): Promise<PersonalSchedule[]> {
    return this.prismaService.personalSchedule.findMany({
      where: { personalId },
    });
  }

  async findByPersonalIdAndDay(
    personalId: number,
    dayOfWeek: number,
  ): Promise<PersonalSchedule[]> {
    return this.prismaService.personalSchedule.findMany({
      where: {
        personalId,
        dayOfWeek,
      },
    });
  }

  async create(data: PersonalSchedule) {
    return this.prismaService.personalSchedule.create({
      data,
    });
  }

  async update(id: number, data: PersonalSchedule) {
    return this.prismaService.personalSchedule.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prismaService.personalSchedule.delete({
      where: { id },
    });
  }

  // Delete by personalId
  async deleteByPersonalId(personalId: number) {
    return this.prismaService.personalSchedule.deleteMany({
      where: { personalId },
    });
  }
}
