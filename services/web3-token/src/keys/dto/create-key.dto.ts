import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateKeyDto {
  @IsUUID('4')
  @IsNotEmpty()
  key: string;

  @IsUUID('4')
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  reqRate: number;

  @IsDateString()
  expiration: Date;

  @IsBoolean()
  isActive: boolean;
}
