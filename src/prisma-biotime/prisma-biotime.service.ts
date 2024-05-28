import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma-biotime/prisma/client';
@Injectable()
export class PrismaBiotimeService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
