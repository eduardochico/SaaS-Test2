export class CreateProductDto {
  sku: string;
  name: string;
  brandId: number;
  categoryIds: number[];
  price: number;
  imageUrl?: string;
  discount?: number;
}
