import { Injectable } from 'nestjs-injectable';
import puppeteer from 'puppeteer';

import { ExchangeRateService, EXCHANGE_RATE } from '../exchange-rate.service';
import { SunatResponseInterface } from '../interfaces';
import { ConfigService } from './config/config.service';

@Injectable().As(EXCHANGE_RATE)
export class CuantoestaeldolarService implements ExchangeRateService {
  static providers = [];

  constructor(private readonly configService: ConfigService) {}

  async sunat(): Promise<SunatResponseInterface> {
    const browser = await puppeteer.launch({});

    try {
      const page = await browser.newPage();

      await page.goto(this.configService.url, {
        waitUntil: 'networkidle2',
      });

      const elementCompra = await page.waitForSelector(
        'html body div.wrapper.container-publicity.bg-grey_ section.wrapper div.clear-fix.block-preci-one div.wrapper-table.block_price_d.pb-b.pb-0 div.row div.col-lg-6 div.wrapper-table div.td.padding-r.block-p-o.mb-m-j div.wrapper-table.tb_dollar.tb_hidden- div.td.tb_dollar_compra.tb_dollar__',
      );

      const valueCompra = await page.evaluate(
        (element) => element.getAttribute('data-compra'),
        elementCompra,
      );

      const elementVenta = await page.waitForSelector(
        'html body div.wrapper.container-publicity.bg-grey_ section.wrapper div.clear-fix.block-preci-one div.wrapper-table.block_price_d.pb-b.pb-0 div.row div.col-lg-6 div.wrapper-table div.td.padding-r.block-p-o.mb-m-j div.wrapper-table.tb_dollar.tb_hidden- div.td.tb_dollar_venta.tb_dollar__',
      );

      const valueVenta = await page.evaluate(
        (element) => element.getAttribute('data-venta'),
        elementVenta,
      );

      return {
        compra: Number(valueCompra),
        venta: Number(valueVenta),
      };
    } finally {
      await browser.close();
    }
  }
}
