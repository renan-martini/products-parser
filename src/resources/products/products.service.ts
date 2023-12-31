import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './repository/product.repository';
import { DataProcessor } from 'src/utils/DataProcessor.util';
import { ImportHistoryRepository } from './repository/importHistory.repository';
import { TimeUtility } from 'src/utils/Time.utility';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { SearchService } from '../search/search.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly importHistoryRepository: ImportHistoryRepository,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly searchService: SearchService,
  ) {}

  async findAll(limit: number, skip: number) {
    return this.productRepository.findMany(skip || 0, limit || 8);
  }

  async findOne(code: number): Promise<CreateProductDto> {
    return this.productRepository.findOne(code);
  }

  async update(code: number, updateProductDto: UpdateProductDto) {
    const { _id, ...updatedProduct } = (
      await this.productRepository.update(code, updateProductDto)
    ).toObject();
    await this.searchService.indexProduct(updatedProduct);
    return updatedProduct;
  }

  async remove(code: number): Promise<CreateProductDto> {
    const { _id, ...deleted } = (
      await this.productRepository.delete(code)
    ).toObject();
    await this.searchService.indexProduct(deleted);
    return deleted;
  }

  async saveData() {
    const mostRecentImport = await this.importHistoryRepository.getMostRecent();

    //Veriry if its been more than 1 day without being updated when the api starts
    if (
      !mostRecentImport ||
      TimeUtility.hoursBetween(mostRecentImport.datetime, new Date()) >= 24
    ) {
      await DataProcessor.processData(
        this.productRepository,
        this.importHistoryRepository,
        this.searchService,
      );
    } else {
      console.log(
        `\nThe database has been updated less then 1 day ago! (${mostRecentImport.datetime})`,
      );
    }
  }

  createCronJob() {
    const bestTimeToUpdate = process.env.BEST_HOUR_TO_IMPORT || '00:00';
    const minutesHour = `${bestTimeToUpdate.split(':')[1]} ${
      bestTimeToUpdate.split(':')[0]
    }`;

    const job = new CronJob(
      `0 ${minutesHour} * * *`,
      async () => {
        await DataProcessor.processData(
          this.productRepository,
          this.importHistoryRepository,
          this.searchService,
        );
      },
      null,
      true,
      'America/Sao_Paulo',
    );

    this.schedulerRegistry.addCronJob('updateDataBase', job);
  }
  async onModuleInit() {
    this.saveData();
    this.createCronJob();

    //this.productRepository.clearCollection();
    //this.searchService.removeAll();
  }
}
