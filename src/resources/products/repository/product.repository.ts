import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Product } from '../schemas/product.entity';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel('product') private readonly productModel: Model<Product>,
  ) {}

  async saveProduct(...products: CreateProductDto[]) {
    const savedProduct = await this.productModel.insertMany([...products], {});
    return savedProduct;
  }

  async upsertMany(data: CreateProductDto[]) {
    const promises: Array<Promise<UpdateWriteOpResult>> = [];
    data.forEach((item) => {
      const updatePromise = this.productModel.updateOne(
        { code: item.code },
        item,
        { upsert: true },
      );
      promises.push(updatePromise);
    });

    await Promise.all(promises);
    return true;
  }

  async findOne(code: number) {
    const product = await this.productModel.findOne({ code });
    return product;
  }

  async delete(code: number) {
    const product = await this.productModel
      .updateOne({ code }, { status: 'trash' })
      .findOne({ code });
    return product;
  }

  async findMany(skip: number, limit: number) {
    const count = await this.productModel.find().countDocuments();
    const page_total = Math.floor((count - 1) / limit) + 1;
    const products = await this.productModel
      .find()
      .sort({ code: 1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const lastPage =
      skip > 0
        ? `/products?skip=${skip - limit < 0 ? 0 : skip - limit}&limit=${limit}`
        : null;

    return {
      page_total: page_total,
      total: count,
      status: 200,
      nextPage: `/products?skip=${skip + limit}&limit=${limit}`,
      lastPage,
      products,
    };
  }

  async update(code: number, data: UpdateProductDto) {
    await this.productModel.findOneAndUpdate({ code }, data);
    const product = await this.productModel.findOne({ code });
    return product;
  }

  async clearCollection() {
    await this.productModel.deleteMany();
  }
}
