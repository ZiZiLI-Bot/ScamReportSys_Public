import { ApiProperty } from '@nestjs/swagger';

export class UpdateTsReviewDto {
  @ApiProperty()
  userCreated: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  bank_account: string;

  @ApiProperty()
  bank_name: string;

  @ApiProperty()
  phoneNumber: string;
}
