import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReportCommentDto {
  @ApiProperty({ example: 'This is a comment' })
  @IsNotEmpty()
  comment: string;
  @ApiProperty()
  @IsNotEmpty()
  user: string;
  @ApiProperty()
  @IsNotEmpty()
  report: string;
  @ApiProperty()
  reply: string;
  @ApiProperty()
  upvote: string[];
  @ApiProperty()
  downvote: string[];
}
