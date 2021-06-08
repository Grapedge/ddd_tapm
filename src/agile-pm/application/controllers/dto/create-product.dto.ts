import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

export class CreateProductRes {
  productId: string;
}
