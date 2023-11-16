import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoryEntry } from '../schemas/history.entity';
import { CreateHistoryDto } from '../dto/createHistory.dto';

@Injectable()
export class ImportHistoryRepository {
  constructor(
    @InjectModel('history') private readonly historyModel: Model<HistoryEntry>,
  ) {}

  async savehistory(history?: CreateHistoryDto) {
    const savedhistory = new this.historyModel(history);
    return savedhistory.save();
  }

  async getMostRecent() {
    const mostRecent = await this.historyModel
      .find()
      .sort({ datetime: 'desc' })
      .limit(1);
    return mostRecent[0];
  }
}
