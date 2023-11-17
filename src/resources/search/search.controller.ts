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

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @SerializeOptions({
    excludeExtraneousValues: true,
  })
  @Get('products')
  @UseInterceptors(ClassSerializerInterceptor)
  async search(@Query() { search }: SearchParam): Promise<CreateProductDto[]> {
    return await this.searchService.search(search);
  }
}
