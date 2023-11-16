import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from './app.service';

@Controller('/')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  @HealthCheck()
  async check() {
    const mongoDBStatus = await this.healthService.getMongoStatus();
    const lastDataImport = await this.healthService.getLastDataImport();

    const memoryUsage = await this.healthService.getMemoryUsage();

    const uptime = this.healthService.getUptime();

    return { ...mongoDBStatus, lastDataImport, memoryUsage, uptime };
  }
}
