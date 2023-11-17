import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { StatusEnum } from '../schemas/product.entity';
import { Expose } from 'class-transformer';

export class CreateProductDto {
  @Expose()
  @IsNotEmpty()
  code: number;

  @Expose()
  @IsNotEmpty()
  status: StatusEnum;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  imported_t: Date;

  @Expose()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @Expose()
  @IsNotEmpty()
  creator: string;

  @Expose()
  @IsDate()
  @IsNotEmpty()
  created_t: number;

  @Expose()
  @IsDate()
  @IsNotEmpty()
  last_modified_t: number;

  @Expose()
  @IsNotEmpty()
  product_name: string;

  @Expose()
  @IsNotEmpty()
  quantity: string;

  @Expose()
  @IsNotEmpty()
  brands: string;

  @Expose()
  @IsNotEmpty()
  categories: string;

  @Expose()
  @IsNotEmpty()
  labels: string;

  @Expose()
  @IsNotEmpty()
  cities: string;

  @Expose()
  @IsNotEmpty()
  purchase_places: string;

  @Expose()
  @IsNotEmpty()
  stores: string;

  @Expose()
  @IsNotEmpty()
  ingredients_text: string;

  @IsNotEmpty()
  traces: string;

  @Expose()
  @IsNotEmpty()
  serving_size: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  serving_quantity: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  nutriscore_score: number;

  @Expose()
  @IsNotEmpty()
  nutriscore_grade: string;

  @Expose()
  @IsNotEmpty()
  main_category: string;

  @Expose()
  @IsUrl()
  image_url: string;

  constructor(partial: Partial<CreateProductDto>) {
    Object.assign(this, {
      ...partial,
      code: parseInt(partial?.code?.toString().replace('"', '')),
    });
  }
}
