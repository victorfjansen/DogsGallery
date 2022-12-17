import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DogAdapter } from 'src/app/adapter';
import { DogDto } from 'src/app/dto';
import { DogRequestParams, DogSnackbarViewModel } from 'src/app/models';
import { BaseService } from '../base/base.service';

@Injectable()
export class DogService extends BaseService {
  authHeader: { [key: string]: string };
  constructor(private httpClient: HttpClient) {
    super('https://api.thedogapi.com/v1');

    this.authHeader = {
      'x-api-key':
        'api_key=live_gos3nyT4VOovm0JPiZnqQswj9LyXSNkhA8TD6yenwNX7SsHO6ODXfoZqjxCaRs1r',
    };
  }

  getDogList(
    parameters?: DogRequestParams
  ): Observable<DogSnackbarViewModel[]> {
    const defaultParams: DogRequestParams = {
      page: 0,
      limit: 20,
    };

    const params = parameters
      ? this.getQueryParams(parameters)
      : this.getQueryParams(defaultParams);

    return this.httpClient
      .get<DogDto[]>(this.getApiUrl('breeds'), {
        headers: new HttpHeaders(this.authHeader),
        params,
      })
      .pipe(map(DogAdapter.getDogSnackbarData));
  }
}
