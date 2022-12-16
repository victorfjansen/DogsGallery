import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DogAdapter } from 'src/app/adapter';
import { DogDto } from 'src/app/dto';
import { DogSnackbarViewModel } from 'src/app/models';
import { BaseService } from '../base/base.service';

@Injectable()
export class DogService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('https://api.thedogapi.com/v1/');
  }

  getDogList(params = 'breeds?limit=10'): Observable<DogSnackbarViewModel[]> {
    return this.httpClient
      .get<DogDto[]>(this.getApiUrl(params))
      .pipe(map(DogAdapter.getDogSnackbarData));
  }
}
