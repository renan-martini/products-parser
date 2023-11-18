import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchParam } from '../products/dto/search.dto';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @SerializeOptions({
    excludeExtraneousValues: true,
  })
  @Get('products')
  @ApiOperation({
    summary:
      'List all of the products that matches the respective search string',
    description: 'Returns the products using the elasticsearch',
    tags: ['Products'],
  })
  @ApiResponse({
    schema: {
      allOf: [
        { type: 'array', items: { $ref: getSchemaPath(CreateProductDto) } },
      ],
    },
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async search(@Query() { search }: SearchParam): Promise<CreateProductDto[]> {
    return await this.searchService.search(search);
  }
}
