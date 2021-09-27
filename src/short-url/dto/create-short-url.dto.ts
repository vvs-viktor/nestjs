import { ApiProperty } from '@nestjs/swagger';

export class CreateShortUrlDto {
  @ApiProperty()
  readonly full: string;
}
