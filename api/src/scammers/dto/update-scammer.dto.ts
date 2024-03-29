import { ApiProperty } from '@nestjs/swagger';

export class UpdateScammerDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
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
  email: string;
  @ApiProperty()
  bankAccount: string;
  @ApiProperty()
  bankName: string;
  @ApiProperty()
  socialNetwork: string[];
}
