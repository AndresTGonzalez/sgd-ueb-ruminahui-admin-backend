import { Injectable } from '@nestjs/common';
import { AssistancePersonalIdentificator } from '@prisma/client';
import { AssistanceUtilsService } from 'src/assistance-utils/assistance-utils.service';
import { PrismaBiotimeService } from 'src/prisma-biotime/prisma-biotime.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssistanceBiotimeService {
  constructor(
    private readonly prismaBiotime: PrismaBiotimeService,
    private readonly prisma: PrismaService,
    private readonly assistanceUtilsService: AssistanceUtilsService,
  ) {}

  async getAssistanceBiotime() {
    return await this.prismaBiotime.iclock_transaction.findMany();
  }

  // Get assistance by emp_code
  async getAssistanceByEmpCode(emp_code: string) {
    return await this.prismaBiotime.iclock_transaction.findMany({
      where: {
        emp_code: emp_code,
      },
    });
  }

  // Sincronizar en base de datos los registros que se tiene de un docente
  async syncAssistance() {
    // Primero se obtiene los registros de asistencia de la base de datos de biotime
    const assistances = await this.prismaBiotime.iclock_transaction.findMany();

    let startDate: Date | null = null;
    const endDate = new Date();

    // Recorrer los registros de asistencia
    for (const assistance in assistances) {
      // Obtener el empleado con el codigo de empleado
      const assistancePersonalIdentificator =
        await this.prisma.assistancePersonalIdentificator.findFirst({
          where: { code: assistances[assistance].emp_code },
        });

      // Si no se encuentra el empleado se continua al siguiente
      if (!assistancePersonalIdentificator) continue;

      const clockCheckDate = new Date(assistances[assistance].punch_time);

      if (!startDate || clockCheckDate < startDate) {
        startDate = clockCheckDate;
      }

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

      // Actualizar el sync_status del registro de asistencia
      await this.prismaBiotime.iclock_transaction.update({
        where: { id: assistances[assistance].id },
        data: { sync_status: 1 },
      });
    }
    // if (startDate) {
    //   await this.checkForAbsences(startDate, endDate);
    // }
  }
}
