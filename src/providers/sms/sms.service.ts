import { SendSmsDto } from './dto';

export const SMS = Symbol();

export interface SmsService {
  send(sendSmsDto: SendSmsDto): Promise<void>;
}
