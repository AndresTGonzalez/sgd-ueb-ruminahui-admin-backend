import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { PrismaService } from 'src/prisma/prisma.service';
import { JustificationSupabaseFetch } from './justification-supabase.model';
import { PersonalService } from 'src/personal/personal.service';

@Injectable()
export class JustificationSupabaseService {
  constructor(
    @Inject(forwardRef(() => PersonalService))
    private readonly personalService: PersonalService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    // private readonly personalService: PersonalService,
  ) {}

  // Sync Justifications from Supabase
  async syncJustifications() {
    const supabase = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );

    const { data, error } = await supabase
      .from('justification')
      .select('*')
      .eq('syncStatus', false);

    if (error) {
      throw new Error('Error sincronizando justificaciones' + error.message);
    }

    console.log(data);
    const justifications: JustificationSupabaseFetch[] = data;

    for (const justification of justifications) {
      const employee = await this.personalService.findByUuid(
        justification.userId,
      );

      if (!employee) {
        throw new Error('Empleado no encontrado');
      }

      const aplicationDateISO = new Date(justification.applicationDate);

      const newJustification = {
        personalId: employee.id,
        affair: justification.affair,
        fromDate: justification.fromDate.toString(),
        toDate: justification.toDate.toString(),
        applicationDate: aplicationDateISO,
        exitHour: justification.exitHour,
        returnHour: justification.returnHour,
        extraInfo: justification.extraInfo,
        justificationTypeId: justification.justificationTypeId,
        statusId: 1,
      };

      const response = await this.prisma.justification.create({
        data: newJustification,
      });

      const updateJustification = await supabase
        .from('justification')
        .update({ syncStatus: true })
        .eq('id', justification.id);
    }
  }

  // Delete Justifications by UUID de solo de supabase
  async deleteJustifications(uuid: string) {
    const supabase = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );

    const { data, error } = await supabase
      .from('justification')
      .delete()
      .eq('userId', uuid);

    if (error) {
      throw new Error('Error eliminando justificación' + error.message);
    }

    return data;
  }
}
