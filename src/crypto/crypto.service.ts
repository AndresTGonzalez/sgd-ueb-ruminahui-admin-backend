import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private key: Buffer;

  constructor(private configService: ConfigService) {
    const originalKey = this.configService.get<string>('CRYPTO_KEY') || '';
    const salt = 'salt';
    const iterations = 100000;
    const keyLength = 32;
    this.key = crypto.pbkdf2Sync(
      originalKey,
      salt,
      iterations,
      keyLength,
      'sha256',
    );
  }

  encrypt(data: string): string {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      this.key,
      Buffer.alloc(16, 0),
    );
    let encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(data: string): string {
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      this.key,
      Buffer.alloc(16, 0),
    );
    let decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }
}
