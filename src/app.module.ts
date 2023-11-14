import { Module } from '@nestjs/common';
import { ProductsModule } from './resources/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
