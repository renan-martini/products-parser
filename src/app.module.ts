import { Module } from '@nestjs/common';
import { ProductsModule } from './resources/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ImportHistoryRepository } from './resources/products/repository/importHistory.repository';
import { HistorySchema } from './resources/products/schemas/history.entity';
import { HealthService } from './app.service';
import { SearchModule } from './resources/search/search.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ProductsModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@cluster0.ku3maxu.mongodb.net/?retryWrites=true&w=majority`,
    ),
    MongooseModule.forFeature([{ name: 'history', schema: HistorySchema }]),
    TerminusModule,
    SearchModule,
  ],
  controllers: [HealthController],
  providers: [ImportHistoryRepository, HealthService],
})
export class AppModule {}
