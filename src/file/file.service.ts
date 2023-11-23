import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk';

export class S3Service {
  s3Uploader = new AWS.S3({
    accessKeyId: 'Z1XTPE72PATXRGPARAFS',
    secretAccessKey: 'FpMEAtv0sMneG5B6QyilUkfVtUIJfHmtwa5T3hkh',
    endpoint: 's3.cloudfly.vn',
    s3ForcePathStyle: true,
  });
}

export class FileService extends S3Service {
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

  uploadToS3(params: S3.PutObjectRequest) {
    return new Promise((resolve, reject) => {
      this.s3Uploader.upload(params, (error: any, data: any) => {
        if (error) {
          reject();
        }
        resolve({
          data: data?.Location,
          message: 'Upload thành công',
          success: true,
        });
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
