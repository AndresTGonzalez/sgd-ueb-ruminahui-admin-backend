import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma-ivms/prisma/client';

@Injectable()
export class PrismaIvmsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
