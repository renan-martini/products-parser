import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['imported_t', 'code', 'created_t'] as const),
) {
  constructor(partial: Partial<CreateProductDto>) {
    super(partial);
  }
}
