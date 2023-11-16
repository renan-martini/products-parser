import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './repository/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.entity';
import { ImportHistoryRepository } from './repository/importHistory.repository';
import { HistorySchema } from './schemas/history.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'product', schema: ProductSchema },
      { name: 'history', schema: HistorySchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [ProductsController],
  providers: [ProductRepository, ImportHistoryRepository, ProductsService],
})
export class ProductsModule {}
