import { ApiProperty } from '@nestjs/swagger';

export class UpdateReportCommentDto {
  @ApiProperty()
  comment: string;
  @ApiProperty()
  user: string;
  @ApiProperty()
  report: string;
  @ApiProperty()
  reply: string;
  @ApiProperty()
  upvote: string[];
  @ApiProperty()
  downvote: string[];
}
