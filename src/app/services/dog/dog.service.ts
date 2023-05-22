import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { DogRequestParams, DogViewModel } from '../../../shared';
import { DogAdapter } from '../../adapter';
import { DogDto } from '../../dto';
import { BaseService } from '../base/base.service';

@Injectable()
export class DogService extends BaseService {
  private authHeader: { [key: string]: string };

  constructor(private httpClient: HttpClient) {
    super('https://api.thedogapi.com/v1');

    this.authHeader = {
      'x-api-key':
        'api_key=live_gos3nyT4VOovm0JPiZnqQswj9LyXSNkhA8TD6yenwNX7SsHO6ODXfoZqjxCaRs1r',
    };
  }

  getDogList(parameters?: DogRequestParams): Observable<DogViewModel[]> {
    const defaultParams: DogRequestParams = {
      page: 1,
      limit: 15,
    };

    const params = this.getQueryParams(parameters || defaultParams);

    return this.httpClient
      .get<DogDto[]>(this.getApiUrl('breeds'), {
        headers: new HttpHeaders(this.authHeader),
        params,
      })
      .pipe(map(DogAdapter.getDogSnackbarData));
  }
}
