import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendRecordatory(fullName: string, email: string) {

    console.log('Enviando correo a: ', email);

    const response = await this.mailerService.sendMail({
      // to: 'andrestgonza@gmail.com',
      to: email,
      subject: 'NOTIFICACIÓN DE ASISTENCIA',
      template: './test', // La plantilla que se encuentra en la carpeta templates
      context: {
        fullName,
      },
    });
    console.log(response);
  }
}
