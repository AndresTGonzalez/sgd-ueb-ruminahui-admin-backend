import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Personal, AssistancePersonalIdentificator } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { AssistanceEmployeeIdentificatorService } from 'src/assistance-employee-identificator/assistance-employee-identificator.service';

@Injectable()
export class PersonalService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly assistanceEmployeeIdentificatorService: AssistanceEmployeeIdentificatorService,
  ) {}

  async findAll() {
    return this.prismaService.personal.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.personal.findUnique({ where: { id } });
  }

  async update(id: number, data: Personal) {
    return this.prismaService.personal.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prismaService.personal.delete({ where: { id } });
  }

  async create(data: Personal) {
    // Registrar en Supabase
    const uuid = await this.registerInSupabase(data);
    data.uuid = uuid;
    // Agregar usuario en Supabase
    await this.addPersonalToSupabase(data);
    // Agregar el empleado en la base de datos
    const employee = await this.prismaService.personal.create({ data });
    // Agregar el identificador del empleado en la base de datos
    const identificator = {
      assistanceDispositiveId: 1,
      code: employee.uuid,
      PersonalId: employee.id,
    };
    await this.assistanceEmployeeIdentificatorService.create(identificator);

    return employee;
  }

  private async registerInSupabase(employee: Personal): Promise<string> {
    const supabase = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );
    const user = this.removeAccents(
      employee.names.charAt(0) + employee.lastNames.split(' ')[0],
    );

    const firstNumbersIdentificationCard =
      employee.identificationCard.substring(0, 5);

    const email = `${user.toLowerCase() + firstNumbersIdentificationCard}@sgdruminahui.com`;

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: employee.identificationCard,
    });

    if (error) {
      throw new Error('Error registrando en Supabase' + error);
    }
    return data.user.id;
  }

  private async addPersonalToSupabase(employee: Personal) {
    const supabase = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );
    const { data, error } = await supabase.from('users').insert({
      uuid: employee.uuid,
    });
    if (error) {
      throw new Error('Error registrando en Supabase');
    }
    return true;
  }

  private removeAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
