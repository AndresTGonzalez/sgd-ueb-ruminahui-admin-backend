import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CryptoModule } from './crypto/crypto.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProvincesModule } from './provinces/provinces.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CryptoModule,
    PrismaModule,
    ProvincesModule,
    CitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
