import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseInterceptors,
  Query,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundInterceptor } from 'src/interceptors/notFound.interceptor';
import { PaginationParams } from './dto/paginationParams.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() { limit, skip }: PaginationParams) {
    return this.productsService.findAll(+limit, +skip);
  }

  @Get(':code')
  @UseInterceptors(new NotFoundInterceptor('Product not found'))
  findOne(@Param('code') code: string) {
    return this.productsService.findOne(+code);
  }

  @Put(':code')
  @UseInterceptors(new NotFoundInterceptor('Product not found'))
  update(
    @Param('code') code: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+code, updateProductDto);
  }

  @Delete(':code')
  @UseInterceptors(new NotFoundInterceptor('Product not found'))
  remove(@Param('code') code: string) {
    return this.productsService.remove(+code);
  }
}
