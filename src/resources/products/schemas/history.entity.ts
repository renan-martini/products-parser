import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HistoryDocument = HydratedDocument<HistoryEntry>;

export enum EntryStatus {
  SUCCESS = 'Success',
  ERROR = 'Error',
}

@Schema()
export class HistoryEntry {
  @Prop({ default: new Date() })
  datetime: Date;

  @Prop({ default: 'Success' })
  status: EntryStatus;
}

export const HistorySchema = SchemaFactory.createForClass(HistoryEntry);
