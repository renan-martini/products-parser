import { CreateProductDto } from './create-product.dto';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class PaginatedProductsDto {
  @ApiProperty()
  page_total: number;
  @ApiProperty()
  total: number;
  @ApiProperty()
  status: number;
  @ApiProperty()
  nextPage: string;
  @ApiProperty()
  lastPage?: string;
  @ApiProperty({
    type: 'array',
    items: { $ref: getSchemaPath(CreateProductDto) },
  })
  products: CreateProductDto[];
}
