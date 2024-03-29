import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateScammerDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  userCreated: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  birthYear: number;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  bankAccount: string;
  @ApiProperty()
  bankName: string;
  @ApiProperty()
  socialNetwork: string[];
}
