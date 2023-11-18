import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SearchParam {
  @ApiProperty()
  @IsNotEmpty()
  search?: string;
}
