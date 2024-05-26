import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Justification } from '@prisma/client';
import { JustificationSupabaseService } from 'src/justification-supabase/justification-supabase.service';

@Injectable()
export class JustificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly justificationSupabase: JustificationSupabaseService,
  ) {}

  async create(data: Justification) {
    return this.prisma.justification.create({ data });
  }

  async findAll() {
    return this.prisma.justification.findMany();
  }

  async findOne(id: number) {
    return this.prisma.justification.findUnique({ where: { id } });
  }

  async update(id: number, data: Justification) {
    return this.prisma.justification.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.justification.delete({ where: { id } });
  }

  // Sync Justifications from Supabase
  async syncJustifications() {
    return this.justificationSupabase.syncJustifications();
  }
}
