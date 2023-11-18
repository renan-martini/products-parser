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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginatedProductsDto } from './dto/paginated-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all products paginated',
    description: 'You can pass query params to configure the paginations',
    tags: ['Products'],
  })
  @ApiResponse({ type: PaginatedProductsDto })
  findAll(@Query() { limit, skip }: PaginationParams) {
    return this.productsService.findAll(+limit, +skip);
  }

  @Get(':code')
  @ApiOperation({
    summary: 'Retrieve a product by its code',
    description:
      'Returns the product with the respective code. Throws a status 404 if its not found.',
    tags: ['Products'],
  })
  @ApiResponse({ type: CreateProductDto })
  @UseInterceptors(new NotFoundInterceptor('Product not found'))
  findOne(@Param('code') code: string) {
    return this.productsService.findOne(+code);
  }

  @Put(':code')
  @ApiOperation({
    summary: 'Update a product by its code',
    description:
      'Returns the updated product with the respective code. Throws a status 404 if its not found.',
    tags: ['Products'],
  })
  @ApiResponse({ type: CreateProductDto })
  @UseInterceptors(new NotFoundInterceptor('Product not found'))
  update(
    @Param('code') code: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+code, updateProductDto);
  }

  @Delete(':code')
  @ApiOperation({
    summary: 'Changes the status of a product by its code',
    description:
      'Returns the deleted product with the respective code and with the "status" property as "trash". Throws a status 404 if its not found.',
    tags: ['Products'],
  })
  @ApiResponse({ type: CreateProductDto })
  @UseInterceptors(new NotFoundInterceptor('Product not found'))
  remove(@Param('code') code: string) {
    return this.productsService.remove(+code);
  }
}
