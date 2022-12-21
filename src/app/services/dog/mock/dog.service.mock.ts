import { Observable, of } from 'rxjs';
import { DogRequestParams, DogViewModel, mockedDog } from 'src/shared';

export class DogServiceMock {
  getDogList(parameters?: DogRequestParams): Observable<DogViewModel[]> {
    return of([mockedDog]);
  }
}
