import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTsReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  userCreated: string;

  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  bank_account: string;

  @ApiProperty()
  @IsNotEmpty()
  bank_name: string;

  @ApiProperty()
  phoneNumber: string;
}
