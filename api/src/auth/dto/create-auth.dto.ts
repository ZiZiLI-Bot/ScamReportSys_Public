import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'admin@dev.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'admin123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Nguyen Van' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'ABC' })
  @IsNotEmpty()
  lastName: string;
}
