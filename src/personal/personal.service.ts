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
import { PersonalChildrenService } from 'src/personal-children/personal-children.service';
import { PersonalDocumentsService } from 'src/personal-documents/personal-documents.service';
import { PersonalPhotoService } from 'src/personal-photo/personal-photo.service';

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
    private readonly personalChildrenService: PersonalChildrenService,
    private readonly personalDocumentsService: PersonalDocumentsService,
    private readonly personalPhotoService: PersonalPhotoService,
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
        PersonalPhoto: true,
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

    // Eliminar en cascada en Backend
    await this.assistanceService.deleteByPersonalId(employee.id);
    await this.assistancePersonalIdentificatorService.deleteByPersonalId(
      employee.id,
    );
    await this.institutionalPersonalDataService.deleteByPersonalId(employee.id);
    await this.personalChildrenService.removeByPersonalId(employee.id);
    await this.medicalPersonalDataService.deleteByPersonalId(employee.id);
    await this.titleService.deleteByPersonalId(employee.id);
    await this.certificationService.deleteByPersonalId(employee.id);
    await this.personalScheduleService.deleteByPersonalId(employee.id);
    await this.justificationService.deleteJustificationsByPersonalId(
      employee.id,
    );
    await this.personalChildrenService.removeByPersonalId(employee.id);
    await this.personalDocumentsService.deletePersonalDocumentsByPersonalId(
      employee.id,
    );
    await this.personalPhotoService.deletePhoto(employee.id);

    // Eliminar en Supabase
    await this.personalSupabaseService.deleteAssistanceInSupabase(
      employee.uuid,
    );
    await this.justificationSupabaseService.deleteJustifications(employee.uuid);
    await this.personalSupabaseService.deleteUserPersonalUserInSupabase(
      employee.uuid,
    );
    await this.personalSupabaseService.deletePersonalInSupabase(employee.uuid);

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

    const personalIdentificator = {
      assistanceDispositiveId: 2,
      code: employee.identificationCard,
      personalId: employee.id,
    };

    await this.assistancePersonalIdentificatorService.create(
      personalIdentificator,
    );

    return employee;
  }

  async getPersonalForExcelReport() {
    const data = await this.prismaService.personal.findMany({
      select: {
        identificationCard: true,
        names: true,
        lastNames: true,
        birthdate: true,
        Gender: {
          select: {
            name: true,
          },
        },
        City: {
          select: {
            name: true,
            Province: {
              select: {
                name: true,
              },
            },
          },
        },
        phone: true,
        email: true,
        address: true,
        InstitutionalPersonalData: {
          select: {
            Journal: true,
            Category: {
              select: {
                name: true,
              },
            },
            Function: {
              select: {
                name: true,
              },
            },
            CampusPersonal: {
              select: {
                Campus: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        MedicalPersonalData: {
          select: {
            BloodType: true,
            personalAllergy: true,
            personalMedication: true,
          },
        },
        MaritalStatus: true,
        _count: {
          select: {
            PersonalChildren: true,
          },
        },
      },
    });

    // Construir la salida
    return data.map((item) => {
      const institutionalData = item.InstitutionalPersonalData?.[0] ?? null;
      const medicalData = item.MedicalPersonalData?.[0] ?? null;

      return {
        identificationCard: item.identificationCard ?? 'Sin cédula',
        names: item.names ?? 'Sin nombres',
        lastNames: item.lastNames ?? 'Sin apellidos',
        birthdate: item.birthdate ?? 'Sin fecha de nacimiento',
        gender: item.Gender?.name ?? 'Sin género',
        maritalStatus: item.MaritalStatus.name ?? 'Sin estado civil',
        province: item.City?.Province?.name ?? 'Sin provincia',
        city: item.City?.name ?? 'Sin ciudad',
        phone: item.phone ?? 'Sin teléfono',
        children: item._count?.PersonalChildren ?? 0,
        email: item.email ?? 'Sin correo',
        address: item.address ?? 'Sin dirección',

        category: institutionalData
          ? institutionalData.Category.name
          : 'Sin categoría',
        function: institutionalData
          ? institutionalData.Function.name
          : 'Sin función',
        journal: institutionalData
          ? institutionalData.Journal.name
          : 'Sin jornada',
        bloodType: medicalData
          ? medicalData.BloodType.name
          : 'Sin tipo de sangre',
        personalAllergy: medicalData
          ? medicalData.personalAllergy
          : 'Sin alergias',
        personalMedication: medicalData
          ? medicalData.personalMedication
          : 'Sin medicamentos',

        campusPersonal:
          (institutionalData ?? { CampusPersonal: [] }).CampusPersonal.map(
            (campus) => campus.Campus?.name,
          ).join(', ') ?? 'Sin campus',
      };
    });
  }
}
