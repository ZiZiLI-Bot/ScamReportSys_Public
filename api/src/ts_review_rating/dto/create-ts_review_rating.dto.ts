import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTsReviewRatingDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  TSReviewId: string;

  @ApiProperty()
  @IsNotEmpty()
  comment: string;

  @ApiProperty()
  @IsNotEmpty()
  rating: number;
}
