import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { StatusEnum } from '../schemas/product.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  code: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  status: StatusEnum;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsDateString()
  imported_t: Date;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  creator: string;

  @ApiProperty()
  @Expose()
  @IsDate()
  @IsNotEmpty()
  created_t: number;

  @ApiProperty()
  @Expose()
  @IsDate()
  @IsNotEmpty()
  last_modified_t: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  product_name: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  quantity: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  brands: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  categories: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  labels: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  cities: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  purchase_places: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  stores: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  ingredients_text: string;

  @ApiProperty()
  @IsNotEmpty()
  traces: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  serving_size: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  serving_quantity: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  nutriscore_score: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  nutriscore_grade: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  main_category: string;

  @ApiProperty()
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
