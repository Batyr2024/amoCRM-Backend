import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { IGetCriteria } from 'amocrm-js/dist/api/factories/mixins/hasGetByCriteria';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/leads')
  getLeads(@Query('filter') filter?: IGetCriteria) {
    return this.appService.getLeads(filter);
  }
}
