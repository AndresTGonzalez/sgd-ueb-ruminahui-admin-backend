import { ApiProperty } from '@nestjs/swagger';

export class CreateAssistanceEmployeeIdentificatorDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  employeId: number;

  @ApiProperty()
  assistanceDispositiveId: number;
}
