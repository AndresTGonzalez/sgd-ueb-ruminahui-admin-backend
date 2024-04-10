import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [CryptoModule],
  controllers: [TestController],
})
export class TestModule {}
