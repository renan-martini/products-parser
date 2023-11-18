import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { Product } from '../schemas/product.entity';
import { productStub } from './stubs/product.stub';
import { PaginatedProductsDto } from '../dto/paginated-products.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

jest.mock('../products.service');

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let product: Product;

      beforeEach(async () => {
        product = await controller.findOne(`${productStub().code}`);
      });

      test('then it should call productsService', () => {
        expect(service.findOne).toHaveBeenCalledWith(productStub().code);
      });

      test('then it should return a product', () => {
        expect(product).toEqual(productStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let products: PaginatedProductsDto;

      beforeEach(async () => {
        products = await controller.findAll({ limit: 8, skip: 0 });
      });

      test('then it should call productsService', () => {
        expect(service.findAll).toHaveBeenCalledWith(8, 0);
      });

      test('then it should return a product', () => {
        expect(products).toEqual({
          page_total: 225,
          total: 900,
          status: 200,
          nextPage: `/products?skip=8&limit=8`,
          lastPage: null || `/products?skip=0&limit=8`,
          products: [productStub()],
        });
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let product: Product;
      let updateProductDto: UpdateProductDto;

      beforeEach(async () => {
        updateProductDto = {
          creator: 'Renan',
        };
        product = await controller.update(
          `${productStub().code}`,
          updateProductDto,
        );
      });

      test('then it should call usersService', () => {
        expect(service.update).toHaveBeenCalledWith(
          productStub().code,
          updateProductDto,
        );
      });

      test('then it should return a user', () => {
        expect(product).toEqual(productStub());
      });
    });
  });
});
