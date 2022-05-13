import { HttpService } from '@nestjs/axios';
import { Injectable } from 'nestjs-injectable';
import { lastValueFrom } from 'rxjs';
import { Logger } from '@nestjs/common';

import { SMS, SmsService } from '../sms.service';
import { SendSmsDto } from '../dto';

@Injectable().As(SMS)
export class ApiService implements SmsService {
  static providers = [];

  private readonly logger = new Logger(ApiService.name);

  constructor(private readonly httpService: HttpService) {
    httpService.axiosRef.interceptors.request.use((config) => {
      // empty

      return config;
    });

    httpService.axiosRef.interceptors.response.use(
      (response) => {
        // empty

        return response;
      },
      (error) => Promise.reject(error),
    );
  }

  async send(sendSmsDto: SendSmsDto): Promise<void> {
    try {
      const $data = this.httpService.post('send', sendSmsDto);

      await lastValueFrom($data);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
