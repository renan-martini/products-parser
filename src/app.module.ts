import { Module } from '@nestjs/common';
import { ProductsModule } from './resources/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env', isGlobal: true }),
    ProductsModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@cluster0.ku3maxu.mongodb.net/?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
