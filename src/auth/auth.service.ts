import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './auth.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CryptoService } from 'src/crypto/crypto.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private crypto: CryptoService,
    private jwtService: JwtService,
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

  async loginUser(data: LoginUserDto): Promise<{
    access_token: string;
  }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // const password = this.crypto.decrypt(user.password);
    const password = user.password;
    if (password !== data.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
