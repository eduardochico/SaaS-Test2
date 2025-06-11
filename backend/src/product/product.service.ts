import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Brand } from '../brand/brand.entity';
import { Category } from '../category/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private catRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async create(dto: CreateProductDto) {
    const brand = await this.brandRepo.findOne({ where: { id: dto.brandId } });
    const categories = await this.catRepo.findByIds(dto.categoryIds || []);
    const product = this.repo.create({
      sku: dto.sku,
      name: dto.name,
      brand,
      categories,
      price: dto.price,
      imageUrl: dto.imageUrl,
      discount: dto.discount || 0,
    });
    return this.repo.save(product);
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (dto.brandId) {
      product.brand = await this.brandRepo.findOne({ where: { id: dto.brandId } });
    }
    if (dto.categoryIds) {
      product.categories = await this.catRepo.findByIds(dto.categoryIds);
    }
    Object.assign(product, {
      sku: dto.sku ?? product.sku,
      name: dto.name ?? product.name,
      price: dto.price ?? product.price,
      imageUrl: dto.imageUrl ?? product.imageUrl,
      discount: dto.discount ?? product.discount,
    });
    return this.repo.save(product);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
