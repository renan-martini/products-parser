import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { StatusEnum } from '../schemas/product.entity';

export class CreateProductDto {
  @IsNotEmpty()
  code: number;

  @IsNotEmpty()
  status: StatusEnum;

  @IsNotEmpty()
  @IsDateString()
  imported_t: Date;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  creator: string;

  @IsDate()
  @IsNotEmpty()
  created_t: number;

  @IsDate()
  @IsNotEmpty()
  last_modified_t: number;

  @IsNotEmpty()
  product_name: string;

  @IsNotEmpty()
  quantity: string;

  @IsNotEmpty()
  brands: string;

  @IsNotEmpty()
  categories: string;

  @IsNotEmpty()
  labels: string;

  cities: string;

  @IsNotEmpty()
  purchase_places: string;

  @IsNotEmpty()
  stores: string;

  @IsNotEmpty()
  ingredients_text: string;

  @IsNotEmpty()
  traces: string;

  @IsNotEmpty()
  serving_size: string;

  @IsNumber()
  @IsNotEmpty()
  serving_quantity: number;

  @IsNumber()
  @IsNotEmpty()
  nutriscore_score: number;

  @IsNotEmpty()
  nutriscore_grade: string;

  @IsNotEmpty()
  main_category: string;

  @IsUrl()
  image_url: string;

  constructor(partial: Partial<CreateProductDto>) {
    Object.assign(this, {
      ...partial,
      code: partial.code.toString().replace('"', ''),
    });
  }
}
