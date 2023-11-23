import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

export class FileService {
  findFile(fileName: string): Promise<Buffer> {
    const filePath = path.join('./files', fileName);

    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async getFile(fileName: string, res: Response) {
    try {
      const file = await this.findFile(fileName);
      if (file) {
        res.contentType('image/webp');
        res.send(file);
      }

      throw new HttpException('file not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
