import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateProductDto } from '../products/dto/create-product.dto';

@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService) {}

  private index = 'products';

  async createIndex() {
    const checkIndex = await this.esService.indices.exists({
      index: this.index,
    });

    if (!checkIndex) {
      await this.esService.indices.create({ index: this.index });
    }
  }

  async indexProduct(product: CreateProductDto) {
    return await this.esService.index(
      {
        index: this.index,
        id: `${product.code}`,
        body: product,
      },
      { signal: new AbortController().signal },
    );
  }

  async search(text: string) {
    const {
      hits: { hits },
    } = await this.esService.search({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: [
              'product_name',
              'categories',
              'ingredients_text',
              'traces',
              'labels',
              'purchase_places',
              'creator',
            ],
          },
        },
      },
    });
    const data = hits.map((hit) => new CreateProductDto(hit._source));

    return data;
  }

  public async removeAll() {
    this.esService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match_all: {},
        },
      },
    });
  }

  onModuleInit() {
    this.createIndex();
  }
}
