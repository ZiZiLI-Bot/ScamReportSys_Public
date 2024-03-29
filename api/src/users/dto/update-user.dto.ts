import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
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
