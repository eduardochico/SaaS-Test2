import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Brand } from '../brand/brand.entity';
import { Category } from '../category/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sku: string;

  @Column()
  name: string;

  @ManyToOne(() => Brand, brand => brand.products, { eager: true })
  brand: Brand;

  @ManyToMany(() => Category, category => category.products, { eager: true })
  @JoinTable({ name: 'product_categories' })
  categories: Category[];

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  discount: number;
}
