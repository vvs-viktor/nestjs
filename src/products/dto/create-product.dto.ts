import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/schemas/user.schemas';

export class CreateProductDto {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly price: number;
  @ApiProperty()
  readonly owner: User;
}
