import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendRecordatory(fullName: string) {
    await this.mailerService.sendMail({
      to: 'andrestgonza@gmail.com',
      subject: 'Mail de prueba',
      template: './test', // La plantilla que se encuentra en la carpeta templates
      context: {
        fullName,
      },
    });
  }
}
