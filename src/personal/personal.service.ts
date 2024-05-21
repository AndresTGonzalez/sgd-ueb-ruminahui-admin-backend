import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Personal,
  AssistancePersonalIdentificator,
  Assistance,
} from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { AssistancePersonalIdentificatorService } from 'src/assistance-personal-identificator/assistance-personal-identificator.service';

@Injectable()
export class PersonalService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly assistancePersonalIdentificatorService: AssistancePersonalIdentificatorService,
  ) {}

  async findAll(): Promise<Personal[]> {
    return this.prismaService.personal.findMany({
      include: {
        Gender: true,
        MaritalStatus: true,
        City: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.personal.findUnique({ where: { id } });
  }

  async update(id: number, data: Personal) {
    return this.prismaService.personal.update({ where: { id }, data });
  }

  async delete(id: number) {
    // TODO: Manejar excepciones en caso de error

    // return this.prismaService.personal.delete({ where: { id } });
    const employee = await this.prismaService.personal.findUnique({
      where: { id },
    });
    if (!employee) {
      throw new Error('Empleado no encontrado');
    }
    // Eliminar en Supabase
    await this.deleteUserPersonalInSupabase(employee.uuid);
    await this.deletePersonalInSupabase(employee.uuid);

    // Eliminar identificador de empleado
    await this.deleteEmployeeIdentificator(employee.uuid);

    return this.prismaService.personal.delete({ where: { id } });
  }

  async create(data: Personal) {
    // TODO: Manejar excepciones en caso de error

    // Registrar en Supabase
    const uuid = await this.registerInSupabase(data);
    data.uuid = uuid;

    if (!data.uuid) {
      throw new Error('Error registrando en Supabase');
    }
    // Agregar usuario en Supabase
    const response = await this.addPersonalToSupabase(data);
    // Agregar el empleado en la base de datos
    const employee = await this.prismaService.personal.create({ data });
    // Agregar el identificador del empleado en la base de datos
    const identificator = {
      assistanceDispositiveId: 1,
      code: employee.uuid,
      personalId: employee.id,
    };
    await this.assistancePersonalIdentificatorService.create(identificator);

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

  private async deleteUserPersonalInSupabase(uuid: string) {
    const supabase = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_SERVICE_ROLE_KEY'),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    const { data, error } = await supabase.auth.admin.deleteUser(uuid);
    if (error) {
      console.log(error);
      throw new Error('Error eliminando en Supabase el usuario');
    }
    return true;
  }

  private async deletePersonalInSupabase(uuid: string) {
    const supabase = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('uuid', uuid);
    if (error) {
      throw new Error('Error eliminando en Supabase');
    }
    return true;
  }

  private async deleteEmployeeIdentificator(uuid: string) {
    const identificator =
      await this.prismaService.assistancePersonalIdentificator.findFirst({
        where: { code: uuid },
      });
    if (!identificator) {
      throw new Error('Identificador no encontrado');
    }
    return this.prismaService.assistancePersonalIdentificator.delete({
      where: { id: identificator.id },
    });
  }

  // TODO: Implementar
  private deleteAllAssistance() {}
}
