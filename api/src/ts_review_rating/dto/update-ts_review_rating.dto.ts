import { ApiProperty } from '@nestjs/swagger';

export class UpdateTsReviewRatingDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  TSReviewId: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  rating: number;
}
