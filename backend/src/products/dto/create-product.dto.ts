import {
  IsNotEmpty,
  IsUrl,
  Min,
  ValidateNested,
  IsObject,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class IProductPrice {
  @Min(1)
  amount: number;
  @IsNotEmpty()
  currency: string;
}

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  imageUrl: string;

  @Min(1)
  availableQuantity: number;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => IProductPrice)
  price: IProductPrice;
}
