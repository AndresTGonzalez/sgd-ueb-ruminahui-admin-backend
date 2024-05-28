import { Injectable } from '@nestjs/common';
import { PrismaBiotimeService } from 'src/prisma-biotime/prisma-biotime.service';

@Injectable()
export class BiotimeService {
  constructor(private readonly prismaServie: PrismaBiotimeService) {}

  // Find all assistance
  async findAssistance() {
    return this.prismaServie.iclock_transaction.findMany();
  }


  // Find all assistance by employeId
  async findAssistanceByEmployeId(employeId: string) {
    return this.prismaServie.iclock_transaction.findMany({
      where: {
        emp_code: employeId
      }
    });
  }
}
