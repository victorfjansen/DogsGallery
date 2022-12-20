import { Observable, of } from 'rxjs';
import { DogViewModel } from '../models';
import { mockedDog } from './mocked-dogs.mock';

export class FavoriteDogStoreMock {
  setFavoriteDog(dog: DogViewModel): void {
    const currentData = this.getLocalDogData();
    currentData
      ? this.addDogToCurrentData(currentData, dog)
      : this.addDogToData(dog);
  }

  removeFavoriteDog(name: string): void {}

  getFavoriteDogList(): Observable<DogViewModel[]> | null {
    return of([mockedDog]);
  }

  private addDogToCurrentData(
    currentData: string,
    newData: DogViewModel
  ): void {}

  private addDogToData(dog: DogViewModel): void {}

  private getLocalDogData(): string | null {
    return 'up';
  }
}
