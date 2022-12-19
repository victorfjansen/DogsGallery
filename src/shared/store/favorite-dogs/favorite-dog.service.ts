import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DogViewModel } from 'src/app/models';

@Injectable({
  providedIn: `root`,
})
export class FavoriteDogStore {
  private readonly localStorageName: string;
  private favoriteDogStore$: BehaviorSubject<DogViewModel[]>;

  constructor() {
    this.localStorageName = 'favorite-dogs';
    this.favoriteDogStore$ = new BehaviorSubject<DogViewModel[]>([]);
  }

  setFavoriteDog(dog: DogViewModel): void {
    const currentData = this.getLocalDogData();
    currentData
      ? this.addDogToCurrentData(currentData, dog)
      : this.addDogToData(dog);
  }

  removeFavoriteDog(name: string): void {
    const currentData = this.getLocalDogData();
    if (!currentData) return;

    const parsedData: DogViewModel[] = JSON.parse(currentData);
    const filterData = parsedData.filter((localDog) => localDog.name !== name);
    console.log(filterData);

    localStorage.setItem(this.localStorageName, JSON.stringify(filterData));
    this.favoriteDogStore$.next(filterData);
  }

  getFavoriteDogList(): Observable<DogViewModel[]> | null {
    const currentData = this.getLocalDogData();
    if (!currentData) return null;

    this.favoriteDogStore$.next(JSON.parse(currentData));
    return this.favoriteDogStore$;
  }

  private addDogToCurrentData(
    currentData: string,
    newData: DogViewModel
  ): void {
    const parsedData: DogViewModel[] = JSON.parse(currentData);
    if (parsedData.find((localDog) => localDog.name === newData.name)) return;

    parsedData.push(newData);
    localStorage.setItem(this.localStorageName, JSON.stringify(parsedData));

    this.favoriteDogStore$.next([...this.favoriteDogStore$.value, newData]);
  }

  private addDogToData(dog: DogViewModel): void {
    localStorage.setItem(this.localStorageName, JSON.stringify([dog]));
    this.favoriteDogStore$.next([dog]);
  }

  private getLocalDogData(): string | null {
    return localStorage.getItem(this.localStorageName);
  }
}
