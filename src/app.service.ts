import { Injectable } from '@nestjs/common';
import { HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
import { ImportHistoryRepository } from './resources/products/repository/importHistory.repository';

@Injectable()
export class HealthService {
  constructor(
    private healthCheck: HealthCheckService,
    private mongooseHealth: MongooseHealthIndicator,
    private readonly importHistoryRepository: ImportHistoryRepository,
  ) {}
  async getMongoStatus() {
    return await this.healthCheck
      .check([() => this.mongooseHealth.pingCheck('mongoDB')])
      .then((status) => status.info);
  }

  async getLastDataImport() {
    return (await this.importHistoryRepository.getMostRecent()).datetime;
  }

  private formatMemoryUsage = (data) =>
    `${Math.round((data / 1024 / 1024) * 100) / 100} MB`;

  async getMemoryUsage() {
    const memoryData = process.memoryUsage();

    const memoryUsage = {
      rss: `${this.formatMemoryUsage(memoryData.rss)} -> Resident Set Size`,
      heapTotal: `${this.formatMemoryUsage(
        memoryData.heapTotal,
      )} -> total size of the allocated heap`,
      heapUsed: `${this.formatMemoryUsage(
        memoryData.heapUsed,
      )} -> actual memory used during the execution`,
      external: `${this.formatMemoryUsage(
        memoryData.external,
      )} -> V8 external memory`,
    };
    return memoryUsage;
  }

  getUptime() {
    const date = new Date(null);
    date.setSeconds(process.uptime());
    const uptime = date.toISOString().slice(11, 19);
    return uptime;
  }
}
