import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
