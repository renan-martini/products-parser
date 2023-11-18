import { ApiProperty } from '@nestjs/swagger';

export class MemoryUsageDto {
  @ApiProperty()
  rss: string;
  @ApiProperty()
  heapTotal: string;
  @ApiProperty()
  heapUsed: string;
  @ApiProperty()
  external: string;
}

export class HealthCheckDto {
  @ApiProperty()
  lastDataImport: Date;
  @ApiProperty({ type: MemoryUsageDto })
  memoryUsage: MemoryUsageDto;
  @ApiProperty()
  uptime: string;
}
