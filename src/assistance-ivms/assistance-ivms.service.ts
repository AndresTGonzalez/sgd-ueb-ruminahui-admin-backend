import { Injectable } from '@nestjs/common';
import { AssistanceUtilsService } from 'src/assistance-utils/assistance-utils.service';
import { PrismaIvmsService } from 'src/prisma-ivms/prisma-ivms.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssistanceIvmsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaIvms: PrismaIvmsService,
    private readonly assistanceUtilsService: AssistanceUtilsService,
  ) {}

  async getAssistanceIvms() {
    return await this.prismaIvms.logs.findMany();
  }

  async syncAssistance() {
    // Primero se obtiene los registros de asistencia de la base de datos de biotime que tengan Null en el SyncStatus
    const assistances = await this.prismaIvms.logs.findMany({
      where: {
        SyncStatus: null,
      },
    });

    let startDate: Date | null = null;
    const endDate = new Date();

    // Recorrer los registros de asistencia
    for (const assistance in assistances) {
      // Obtener el empleado con el codigo de empleado
      const assistancePersonalIdentificator =
        await this.prisma.assistancePersonalIdentificator.findFirst({
          where: { code: assistances[assistance].ID },
        });

      const personal = await this.prisma.personal.findFirst({
        where: {
          AssistancePersonalIdentificator: {
            some: { code: assistances[assistance].ID },
          },
        },
      });

      // Si no se encuentra el empleado se continua al siguiente
      if (!assistancePersonalIdentificator) {
        console.log(
          `No se encontró el empleado con el código ${assistances[assistance].ID}.`,
        );
        continue;
      }

      const clockCheckDate = new Date(assistances[assistance].AuthDateTime);

      if (!startDate || clockCheckDate < startDate) {
        startDate = clockCheckDate;
      }

      await this.prismaIvms.logs.update({
        where: { LogId: assistances[assistance].LogId },
        data: { SyncStatus: 1 },
      });

      if (personal.isActived) {
        // Se crea un nuevo registro de asistencia
        const newAssistance = {
          assistancePersonalIdentificatorId: assistancePersonalIdentificator.id,
          clockCheck: clockCheckDate,
          assistanceStatusId: await this.assistanceUtilsService.verifyOnTime(
            clockCheckDate,
            assistancePersonalIdentificator.personalId,
          ), // Código para asistencia
        };
        await this.prisma.assistance.create({ data: newAssistance });
      }

      // Actualizar el sync_status del registro de asistencia
    }
    // if (startDate) {
    //   // await this.checkForAbsences(startDate, endDate);
    // }
  }
}
