import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Personal } from '@prisma/client';
import { AssistancePersonalIdentificatorService } from 'src/assistance-personal-identificator/assistance-personal-identificator.service';
import { InstitutionalPersonalDataService } from 'src/institutional-personal-data/institutional-personal-data.service';
import { MedicalPersonalDataService } from 'src/medical-personal-data/medical-personal-data.service';
import { AssistanceService } from 'src/assistance/assistance.service';
import { TitleService } from 'src/title/title.service';
import { CertificationService } from 'src/certification/certification.service';
import { PersonalSupabaseService } from 'src/personal-supabase/personal-supabase.service';
import { PersonalScheduleService } from 'src/personal-schedule/personal-schedule.service';
import { JustificationService } from 'src/justification/justification.service';
import { JustificationSupabaseService } from 'src/justification-supabase/justification-supabase.service';

@Injectable()
export class PersonalService {
  constructor(
    @Inject(forwardRef(() => JustificationSupabaseService))
    private readonly justificationSupabaseService: JustificationSupabaseService,
    private readonly prismaService: PrismaService,
    private readonly assistancePersonalIdentificatorService: AssistancePersonalIdentificatorService,
    private readonly institutionalPersonalDataService: InstitutionalPersonalDataService,
    private readonly medicalPersonalDataService: MedicalPersonalDataService,
    private readonly assistanceService: AssistanceService,
    private readonly titleService: TitleService,
    private readonly certificationService: CertificationService,
    private readonly personalSupabaseService: PersonalSupabaseService,
    private readonly personalScheduleService: PersonalScheduleService,
    private readonly justificationService: JustificationService,
  ) {}

  async findAll(): Promise<Personal[]> {
    return this.prismaService.personal.findMany({
      include: {
        City: {
          include: {
            Province: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.personal.findUnique({
      where: { id },
      include: {
        City: {
          include: {
            Province: true,
          },
        },
      },
    });
  }

  async update(id: number, data: Personal) {
    return this.prismaService.personal.update({ where: { id }, data });
  }

  async findByUuid(uuid: string) {
    return this.prismaService.personal.findUnique({ where: { uuid } });
  }

  async delete(id: number) {
    const employee = await this.prismaService.personal.findUnique({
      where: { id },
    });
    if (!employee) {
      throw new Error('Empleado no encontrado');
    }
    // Eliminar en Supabase
    await this.personalSupabaseService.deleteAssistanceInSupabase(
      employee.uuid,
    );
    await this.justificationSupabaseService.deleteJustifications(employee.uuid);
    await this.personalSupabaseService.deleteUserPersonalUserInSupabase(
      employee.uuid,
    );
    await this.personalSupabaseService.deletePersonalInSupabase(employee.uuid);

    // Eliminar en cascada en Backend
    await this.assistanceService.deleteByPersonalId(employee.id);
    await this.assistancePersonalIdentificatorService.deleteByPersonalId(
      employee.id,
    );
    await this.institutionalPersonalDataService.deleteByPersonalId(employee.id);
    await this.medicalPersonalDataService.deleteByPersonalId(employee.id);
    await this.titleService.deleteByPersonalId(employee.id);
    await this.certificationService.deleteByPersonalId(employee.id);
    await this.personalScheduleService.deleteByPersonalId(employee.id);
    await this.justificationService.deleteJustificationsByPersonalId(
      employee.id,
    );

    return this.prismaService.personal.delete({ where: { id } });
  }

  async create(data: Personal) {
    // Registrar en Supabase
    // const uuid = await this.registerInSupabase(data);
    const uuid = await this.personalSupabaseService.registerInSupabase(data);
    data.uuid = uuid;

    if (!data.uuid) {
      throw new Error('Error registrando en Supabase');
    }
    // Agregar usuario en Supabase
    // const response = await this.addPersonalToSupabase(data);
    const response =
      await this.personalSupabaseService.addPersonalToSupabase(data);
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
}
