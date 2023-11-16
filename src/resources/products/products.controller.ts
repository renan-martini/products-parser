import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundInterceptor } from 'src/interceptors/notFound.interceptor';
import { PaginationParams } from './dto/paginationParams.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() { limit, skip }: PaginationParams) {
    return this.productsService.findAll(+limit, +skip);
  }

  @Get(':code')
  @UseInterceptors(new NotFoundInterceptor('Product not found'))
  findOne(@Param('code') code: string) {
    return this.productsService.findOne(+code);
  }

  @Patch(':code')
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
