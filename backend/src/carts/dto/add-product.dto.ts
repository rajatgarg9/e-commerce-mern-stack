import { Min } from 'class-validator';

export class IAddProductDto {
  @Min(0)
  selectedQuantity: number;
}
