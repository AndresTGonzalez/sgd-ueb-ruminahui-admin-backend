import { ApiProperty } from '@nestjs/swagger';

// personal.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreatePersonalDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  identificationCard: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  names: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastNames: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birthdate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  childrens: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  sexId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  maritalStatusId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  cityId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  functionId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  laboralRegimeId?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  laboralRelationshipId?: number;
}
