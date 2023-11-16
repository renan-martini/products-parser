import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './repository/product.repository';
import { DataProcessor } from 'src/utils/DataProcessor.util';
import { ImportHistoryRepository } from './repository/importHistory.repository';
import { TimeUtility } from 'src/utils/Time.utility';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly importHistoryRepository: ImportHistoryRepository,
    private schedulerRegistry: SchedulerRegistry,
  ) {}
  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.saveProduct(createProductDto);
  }

  async findAll(limit: number, skip: number) {
    return this.productRepository.findMany(skip || 0, limit || 8);
  }

  async findOne(code: number): Promise<CreateProductDto> {
    return this.productRepository.findOne(code);
  }

  async update(code: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(code, updateProductDto);
  }

  async remove(code: number): Promise<CreateProductDto> {
    return this.productRepository.delete(code);
  }

  async saveData() {
    const mostRecentImport = await this.importHistoryRepository.getMostRecent();

    //Veriry if its been more than 1 day without being updated when the api starts
    if (TimeUtility.hoursBetween(mostRecentImport.datetime, new Date()) >= 24) {
      await DataProcessor.processData(
        this.productRepository,
        this.importHistoryRepository,
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
  }
}
