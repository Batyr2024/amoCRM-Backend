import { Injectable } from '@nestjs/common';
import { configGenerate } from './auth/config';
import { Client } from 'amocrm-js';
import { IGetCriteria } from 'amocrm-js/dist/api/factories/mixins/hasGetByCriteria';
import { IAPIResponse } from 'amocrm-js/dist/interfaces/common';

@Injectable()
export class AppService {
  async getLeads(filter?: IGetCriteria) {
    const config = configGenerate();
    const client = new Client(config);
    const status = await client.connection.connect();
    console.log({ status });
    if (filter !== null && filter !== undefined)
      return (await client.request.get(`/api/v4/leads?filter=${filter}`)).data;
    const data: IAPIResponse<any> = await client.request.get(
      '/api/v4/leads?with=contacts',
    );
    console.log(data.data._embedded.leads[0]._embedded.contacts[0].id);
    return data.data;
  }
}
