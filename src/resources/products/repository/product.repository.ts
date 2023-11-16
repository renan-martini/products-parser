import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Product } from '../schemas/product.entity';

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

  async clearCollection() {
    await this.productModel.deleteMany();
  }
}
