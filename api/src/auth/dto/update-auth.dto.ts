import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthDto {
  @ApiProperty()
  role: string;
  @ApiProperty()
  user: string;
  @ApiProperty()
  isBlocked: boolean;
}
