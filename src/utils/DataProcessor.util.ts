import { createWriteStream, readdirSync, readdir, rm } from 'fs';
import axios from 'axios';
import { ProductRepository } from 'src/resources/products/repository/product.repository';
import objectSize from 'object-sizeof';
import fs from 'fs';
import JSONStream from 'JSONStream';
import radash from 'radash';
import es from 'event-stream';
import * as zlib from 'zlib';
import { CreateProductDto } from 'src/resources/products/dto/create-product.dto';
import { ImportHistoryRepository } from 'src/resources/products/repository/importHistory.repository';

export class DataProcessor {
  private static baseUrl = 'https://challenges.coode.sh/food/data/json/';

  private static async downloadFile(
    fileUrl: string,
    outputLocationPath: string,
  ) {
    const writer = createWriteStream(outputLocationPath);
    return axios
      .get(fileUrl, {
        responseType: 'stream',
        timeout: 40000,
      })
      .then((response) => {
        return new Promise((resolve) => {
          response.data
            .on('data', (chunk: Buffer) => writer.write(chunk))
            .on('end', () => {
              resolve(true);
            });
        });
      })
      .catch((error) => console.log(error));
  }

  private static unzipFiles = async (filePath: string) => {
    const directoryFiles = readdirSync(filePath);

    return await Promise.all(
      directoryFiles.map((filename) => {
        return new Promise((resolve) => {
          if (filename.endsWith('.gz')) {
            const fileContents = fs.createReadStream(`./temp/${filename}`);
            const writeStream = createWriteStream(
              `./temp/${filename.slice(0, -3)}`,
            );
            const unzip = zlib.createGunzip();
            fileContents
              .pipe(unzip)
              .on('data', (chunk: Buffer) => writeStream.write(chunk))
              .on('finish', () => {
                resolve(null);
              });
            return;
          }
          resolve(null);
        });
      }),
    ).finally(() => console.log('Unzipping complete'));
  };

  private static processFile = (file: string) => {
    return this.downloadFile(`${this.baseUrl}${file}`, `temp/${file}`);
  };

  static saveOnDB = async (repository: ProductRepository, file: string) => {
    let arrayToInsert = [];

    let objectCounter = 0;

    const stream = fs.createReadStream(`temp/${file}`, {
      flags: 'r',
      encoding: 'utf-8',
    });
    stream.pipe(JSONStream.parse()).pipe(
      es.through(async function (data) {
        stream.pause();
        objectCounter++;
        arrayToInsert.push(new CreateProductDto(data));

        if (objectCounter === 100) {
          console.log(
            `arrayToInsert size of ${file} - `,
            objectSize(arrayToInsert) * 0.00000095367432,
            'mb\n',
          );

          await repository.upsertMany(arrayToInsert);
          arrayToInsert = [];
          objectCounter++;

          await radash.sleep(100);

          stream.destroy();
        }
        stream.resume();
      }),
    );
  };

  static processData = async (
    repository: ProductRepository,
    historyRepository: ImportHistoryRepository,
  ) => {
    let files = [];
    await axios
      .get(`${this.baseUrl}index.txt`, {
        responseType: 'text',
      })
      .then((res) => (files = res.data.split('\n')));

    try {
      readdirSync('temp');
    } catch (error) {
      fs.mkdir('temp', () => {});
    }
    console.log('\nDownloading database...');

    await Promise.all(
      files.map((file) => {
        if (file) {
          return this.processFile(file);
        }
      }),
    );
    console.log('Download complete.\n');
    console.log('Unzipping...');
    await this.unzipFiles('temp');
    try {
      readdir('temp', async (err, compFiles) => {
        console.log('\nSending to atlas...\n');
        await Promise.all(
          compFiles
            .filter((compFile) => compFile.endsWith('.json'))
            .map((compFile) => {
              return this.saveOnDB(repository, compFile);
            }),
        );
        rm(`temp/`, { recursive: true, force: true }, () => {});
        historyRepository.savehistory();
        console.log('Database updated successfully!!');
        setTimeout(() => console.clear(), 3000);
      });
    } catch (err) {}
  };
}