import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsNotEmpty()
  userCreated: string;

  @ApiProperty()
  @IsNotEmpty()
  scammer_name: string;

  @ApiProperty()
  @IsNotEmpty()
  scammer_gender: string;

  @ApiProperty()
  scammer_email: string;

  @ApiProperty()
  scammer_phone: string;

  @ApiProperty()
  @IsNotEmpty()
  scammer_bankName: string;

  @ApiProperty()
  @IsNotEmpty()
  scammer_bankAccount: string;

  @ApiProperty()
  scammer_socialNetwork: string[];

  @ApiProperty()
  reportType: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
  status: string;
  @ApiProperty()
  evidencePhoto: string[];
}
