import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Personal } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class PersonalSupabaseService {
  constructor(private readonly configService: ConfigService) {}

  async registerInSupabase(employee: Personal): Promise<string> {
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

  async addPersonalToSupabase(employee: Personal) {
    const supabase = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );
    const { data, error } = await supabase.from('users').insert({
      uuid: employee.uuid,
      names: employee.names,
      last_names: employee.lastNames,
      identification_card: employee.identificationCard,
      address: employee.address,
      phone: employee.phone,
    });
    if (error) {
      throw new Error('Error registrando en Supabase' + error);
    }
    return true;
  }

  async deleteUserPersonalUserInSupabase(uuid: string) {
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
      throw new Error('Error eliminando en Supabase el usuario' + error);
    }
    return true;
  }

  async updatePersonalInSupabase(employee: Personal) {
    const supabase = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );

    const { data, error } = await supabase.from('users').update({
      names: employee.names,
      lastNames: employee.lastNames,
      identificationCard: employee.identificationCard,
      address: employee.address,
      phone: employee.phone,
    });
    if (error) {
      throw new Error('Error actualizando en Supabase');
    }
    return true;
  }

  async updatePersonalInSupabaseByUuid(uuid: string, employee: Personal) {
    const supabase = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );

    const { data, error } = await supabase
      .from('users')
      .update({
        names: employee.names,
        lastNames: employee.lastNames,
        identificationCard: employee.identificationCard,
        address: employee.address,
        phone: employee.phone,
      })
      .eq('uuid', uuid);
    if (error) {
      throw new Error('Error actualizando en Supabase');
    }
    return true;
  }

  async deletePersonalInSupabase(uuid: string) {
    const supabase = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );

    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('uuid', uuid);
    if (error) {
      throw new Error('Error eliminando en Supabase' + error.message);
    }
    return true;
  }

  async deleteAssistanceInSupabase(uuid: string) {
    const supabase = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );

    console.log(this.configService.get('SUPABASE_URL'));
    console.log(this.configService.get('SUPABASE_KEY'));

    const { data, error } = await supabase
      .from('assistance')
      .delete()
      .eq('user_uuid', uuid);
    if (error) {
      throw new Error('Error eliminando en Supabase' + error.message);
    }
    return true;
  }

  private removeAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
