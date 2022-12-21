import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DogViewModel } from 'src/shared/models';

//definido como root pra garantir uma única instancia dessa store. Assim não tem distinção de informações pela aplicação
@Injectable({
  providedIn: `root`,
})
export class FavoriteDogStore {
  //define instancias da store
  private readonly localStorageName: string;
  private favoriteDogStore$: BehaviorSubject<DogViewModel[]>;

  constructor() {
    this.localStorageName = 'favorite-dogs';
    this.favoriteDogStore$ = new BehaviorSubject<DogViewModel[]>([]);
  }

  //direciona a lógica pra setar o dog no localStorage
  setFavoriteDog(dog: DogViewModel): void {
    const currentData = this.getLocalDogData();
    currentData
      ? this.addDogToCurrentData(currentData, dog)
      : this.addDogToData(dog);
  }

  // remove do localStorage o respectivo dog informado no parametro
  removeFavoriteDog(name: string): void {
    const currentData = this.getLocalDogData();
    if (!currentData) return;

    const parsedData: DogViewModel[] = JSON.parse(currentData);
    const filterData = parsedData.filter((localDog) => localDog.name !== name);

    localStorage.setItem(this.localStorageName, JSON.stringify(filterData));
    this.favoriteDogStore$.next(filterData);
  }

  //pega an lista inteira de dogs contidas no localStorage e passa pro BehaviorSubject
  getFavoriteDogList(): Observable<DogViewModel[]> | null {
    const currentData = this.getLocalDogData();
    if (!currentData) return null;

    this.favoriteDogStore$.next(JSON.parse(currentData));
    return this.favoriteDogStore$;
  }

  // adiciona o dog ao localStorage se já houver algum dog nela
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

  // adiciona dog ao localStorage se não houver nenhum lá
  private addDogToData(dog: DogViewModel): void {
    localStorage.setItem(this.localStorageName, JSON.stringify([dog]));
    this.favoriteDogStore$.next([dog]);
  }

  //pega o localStorage data
  private getLocalDogData(): string | null {
    return localStorage.getItem(this.localStorageName);
  }
}
