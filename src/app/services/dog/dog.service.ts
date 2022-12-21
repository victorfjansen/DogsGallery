import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { DogRequestParams, DogViewModel } from '../../../shared';
import { DogAdapter } from '../../adapter';
import { DogDto } from '../../dto';
import { BaseService } from '../base/base.service';

//cria serviço com o injectable extendendo ao baseService pra ter acesso ao método getApiUrl e pra usar os query params
@Injectable()
export class DogService extends BaseService {
  // define instancia do header de autenticação
  private authHeader: { [key: string]: string };

  constructor(private httpClient: HttpClient) {
    // define a baseUrl requerida pelo BaseService
    super('https://api.thedogapi.com/v1');

    // define o authHeader
    this.authHeader = {
      'x-api-key':
        'api_key=live_gos3nyT4VOovm0JPiZnqQswj9LyXSNkhA8TD6yenwNX7SsHO6ODXfoZqjxCaRs1r',
    };
  }

  // função que retorna um observabke com os dados da request
  // dentro dela pego os parâmetros dinamicamente e monto os queryParams com a função getQueryParams contida no BaseService
  getDogList(parameters?: DogRequestParams): Observable<DogViewModel[]> {
    const defaultParams: DogRequestParams = {
      page: 1,
      limit: 15,
    };

    const params = this.getQueryParams(parameters || defaultParams);

    // recebe como DTO e transforma em ViewModel pra estabelecer o padrão comum de camelCase e filtrar os dados
    return this.httpClient
      .get<DogDto[]>(this.getApiUrl('breeds'), {
        headers: new HttpHeaders(this.authHeader),
        params,
      })
      .pipe(map(DogAdapter.getDogSnackbarData));
  }
}
