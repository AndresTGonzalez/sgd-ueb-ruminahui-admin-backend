import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  identificationCard: string;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  names: string;

  @ApiProperty()
  lastNames: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  birthdate: Date;

  @ApiProperty()
  childrens: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  genderId: number;

  @ApiProperty()
  maritalStatusId: number;

  @ApiProperty()
  cityId: number;

  @ApiProperty()
  laboralRegimeId: number;

  @ApiProperty()
  positionId: number;

  @ApiProperty()
  laboralRelationshipId: number;
}
