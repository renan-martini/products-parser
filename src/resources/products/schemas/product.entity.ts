import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

export enum StatusEnum {
  DRAFT = 'draft',
  TRASH = 'trash',
  PUBLISHED = 'published',
}

@Schema()
export class Product {
  @Prop({ unique: true })
  code: number;

  @Prop({ default: 'published' })
  status: StatusEnum;

  @Prop({ default: new Date() })
  imported_t: Date;

  @Prop()
  url: string;

  @Prop()
  creator: string;

  @Prop()
  created_t: number;

  @Prop()
  last_modified_t: number;

  @Prop()
  product_name: string;

  @Prop()
  quantity: string;

  @Prop()
  brands: string;

  @Prop()
  categories: string;

  @Prop()
  labels: string;

  @Prop()
  cities: string;

  @Prop()
  purchase_places: string;

  @Prop()
  stores: string;

  @Prop()
  ingredients_text: string;

  @Prop()
  traces: string;

  @Prop()
  serving_size: string;

  @Prop()
  serving_quantity: number;

  @Prop()
  nutriscore_score: number;

  @Prop()
  nutriscore_grade: string;

  @Prop()
  main_category: string;

  @Prop()
  image_url: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
