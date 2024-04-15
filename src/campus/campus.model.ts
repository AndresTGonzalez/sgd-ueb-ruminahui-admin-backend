import { ApiProperty } from '@nestjs/swagger';

export class CreateCampusDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  secondaryName: string;
}
