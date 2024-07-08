import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { NotificationMailService } from './notification-mail.service';
import { NotificationMailController } from './notification-mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.office365.com', // Servidor SMTP de Outlook
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'ueruminahui@outlook.com', // tu correo de outlook
          pass: 'Ruminahui2024', // tu contraseña de outlook
        },
      },
      defaults: {
        from: 'ueruminahui@outlook.com', // correo predeterminado de remitente
      },
      template: {
        dir: join(__dirname, '..', 'notification-mail', 'templates'),

        adapter: new HandlebarsAdapter(), // o cualquier adaptador de plantillas que prefieras
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [NotificationMailService],
  exports: [NotificationMailService],
  controllers: [NotificationMailController],
})
export class NotificationMailModule {}
