import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthCheckDto } from './dto/health-check.dto';

@Controller('/')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns API details.',
    description:
      'Returns API details, database connection status, last time CRON was executed, uptime and memory usage',
    tags: ['HealthCheck'],
  })
  @ApiResponse({ type: HealthCheckDto })
  @HealthCheck({ swaggerDocumentation: false })
  async check() {
    const mongoDBStatus = await this.healthService.getMongoStatus();
    const lastDataImport = await this.healthService.getLastDataImport();

    const memoryUsage = await this.healthService.getMemoryUsage();

    const uptime = this.healthService.getUptime();

    return { ...mongoDBStatus, lastDataImport, memoryUsage, uptime };
  }
}
