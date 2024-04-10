import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './auth.model';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return this.authService.createUser(data);
  }

  @Post('signIn')
  async login(@Body() data: LoginUserDto) {
    return this.authService.loginUser(data);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me() {
    return 'Hello from me';
  }
}
