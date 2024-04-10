import { Injectable } from '@nestjs/common';
// import { User } from '@prisma/client';
import { CreateUserDto } from './auth.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private crypto: CryptoService,
  ) {}

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: this.crypto.encrypt(data.password),
      },
    });
    return user;
  }

  
}
