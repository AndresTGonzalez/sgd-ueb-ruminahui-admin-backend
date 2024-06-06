import { Injectable } from '@nestjs/common';
import { AssistancePersonalIdentificator } from '@prisma/client';
import { PrismaBiotimeService } from 'src/prisma-biotime/prisma-biotime.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssistanceBiotimeService {
  constructor(
    private readonly prismaBiotime: PrismaBiotimeService,
    private readonly prisma: PrismaService,
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
    console.log('Sincronizando asistencias');
    // Obtener los assistances id
    const assistancesId =
      await this.prisma.assistancePersonalIdentificator.findMany();

    // Recorrer los assistancesId
    for (const item in assistancesId) {
      // Obtener los registros de asistencia de ese empleado si no tiene se continua al siguiente
      const assistances = await this.prismaBiotime.iclock_transaction.findMany({
        where: {
          emp_code: assistancesId[item].code,
        },
      });
      if (assistances.length === 0) {
        continue;
      }
      // Recorrer los registros de asistencia
      for (const assistance in assistances) {
        let assistanceData = {
          assistancePersonalIdentificatorId: assistancesId[item].id,
          clockCheck: assistances[assistance].punch_time,
          assistanceStatusId: 3,
        };
        // Guardar el registro de asistencia
        const response = await this.prisma.assistance.create({
          data: assistanceData,
        });

        console.log(response);
      }
    }
  }
}
