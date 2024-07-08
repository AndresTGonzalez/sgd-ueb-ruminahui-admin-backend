import { Controller, Post } from '@nestjs/common';
import { NotificationMailService } from './notification-mail.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notification-mail')
@Controller('notification-mail')
export class NotificationMailController {
  constructor(
    private readonly notificationMailService: NotificationMailService,
  ) {}

  @Post()
  async sendUserConfirmation() {
    return await this.notificationMailService.sendRecordatory(
      'Andres',
    );
  }
}
