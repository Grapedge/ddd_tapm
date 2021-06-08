import { IsString } from 'class-validator';

export class CreateProductForTuringDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  productOwnerId: string;

  @IsString({ each: true })
  teamMemberIds: string[];
}
