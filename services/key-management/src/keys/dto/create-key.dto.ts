import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateKeyDto {
  @IsUUID('4')
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsOptional()
  reqRate: number;

  @IsDateString()
  @IsOptional()
  expiration: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
