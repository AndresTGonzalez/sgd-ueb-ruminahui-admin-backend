import { ApiProperty } from '@nestjs/swagger';

export class CreateAssistanceDispositiveDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  campusId: number;

  @ApiProperty()
  serial: string;
}
