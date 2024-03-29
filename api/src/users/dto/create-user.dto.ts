import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  gender: string;
  @ApiProperty()
  address: string;
}
