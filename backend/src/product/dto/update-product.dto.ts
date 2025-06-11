export class UpdateProductDto {
  sku?: string;
  name?: string;
  brandId?: number;
  categoryIds?: number[];
  price?: number;
  imageUrl?: string;
  discount?: number;
}
