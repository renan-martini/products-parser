import { productStub } from '../test/stubs/product.stub';

export const ProductsService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue({
    page_total: 225,
    total: 900,
    status: 200,
    nextPage: `/products?skip=8&limit=8`,
    lastPage: null || `/products?skip=0&limit=8`,
    products: [productStub()],
  }),

  findOne: jest.fn().mockResolvedValue(productStub()),

  update: jest.fn().mockResolvedValue(productStub()),

  remove: jest.fn().mockResolvedValue(productStub()),
});
