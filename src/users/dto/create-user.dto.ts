import { ApiProperty } from '@nestjs/swagger';
import { Matches, MinLength } from 'class-validator';
import { Product } from '../../products/schemas/product.schemas';

export class CreateUserDto {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  @MinLength(6, {
    message: 'Password is too short',
  })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/, {
    message:
      'Password must contain at least one numeric digit, one uppercase and one lowercase letter',
  })
  readonly password: string;
  @ApiProperty()
  readonly products: Product[];
}
