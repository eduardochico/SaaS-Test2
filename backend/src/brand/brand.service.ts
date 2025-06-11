import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private repo: Repository<Brand>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(dto: CreateBrandDto) {
    const brand = this.repo.create(dto);
    return this.repo.save(brand);
  }

  async update(id: number, dto: UpdateBrandDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
