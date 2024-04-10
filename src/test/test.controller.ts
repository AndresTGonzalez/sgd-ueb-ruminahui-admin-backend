import { Param, Controller, Post, Get } from '@nestjs/common';
import { CryptoService } from 'src/crypto/crypto.service';

@Controller('test')
export class TestController {
  constructor(private cryptoService: CryptoService) {}

  @Get('encrypt/:text')
  async encrypt(@Param('text') text: string) {
    return this.cryptoService.encrypt(text);
  }

  @Get('decrypt/:text')
  async decrypt(@Param('text') text: string) {
    return this.cryptoService.decrypt(text);
  }
}
