import { CreateProductDTO, IProductPrice } from './create-product.dto';
import { IsOptional } from 'class-validator';

export class PatchProductDTO extends CreateProductDTO {
  @IsOptional()
  name: string;

  @IsOptional()
  imageUrl: string;

  @IsOptional()
  availableQuantity: number;

  @IsOptional()
  price: IProductPrice;
}
