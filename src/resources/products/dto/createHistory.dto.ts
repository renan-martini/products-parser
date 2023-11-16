import { IsDateString, IsNotEmpty } from 'class-validator';
import { EntryStatus } from '../schemas/history.entity';

export class CreateHistoryDto {
  @IsNotEmpty()
  status?: EntryStatus;

  @IsNotEmpty()
  @IsDateString()
  datetime?: Date;

  constructor(partial: Partial<CreateHistoryDto>) {
    Object.assign(this, partial);
  }
}
