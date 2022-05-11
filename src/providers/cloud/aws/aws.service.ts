import { Injectable, Logger } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import temp from 'temp';

@Injectable()
export class AWSService {
  private readonly logger = new Logger(AWSService.name);

  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  downloadObjectAsTemporaryFileFromS3(
    params: { Bucket: string; Key: string },
    callback: (path: string, done: () => void) => void,
  ) {
    const input = this.s3.getObject(params).createReadStream();

    temp.track();

    const output = temp.createWriteStream();

    output.on('close', () => {
      output.end();

      callback(output.path as string, () => {
        temp.cleanup();
      });
    });

    input.pipe(output);
  }
}
