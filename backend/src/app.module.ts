import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '34.58.204.105',
      port: +(process.env.DB_PORT || 3306),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'FgyyB}=^.}Sct.Q]',
      database: process.env.DB_NAME || 'test-db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    BrandModule,
    CategoryModule,
  ],
})
export class AppModule {}
