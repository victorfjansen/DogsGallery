import { TestBed } from '@angular/core/testing';
import { mockedDog } from '../../mocks';

import { FavoriteDogStore } from './favorite-dog.service';

describe('FavoriteDogStore', () => {
  let service: FavoriteDogStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteDogStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`${FavoriteDogStore.name} should SET favorite dog when setFavoriteDog was called`, (done) => {
    service.setFavoriteDog(mockedDog);

    service.getFavoriteDogList()?.subscribe({
      next: (data) => {
        expect(data).toStrictEqual([mockedDog]);
        done();
      },
    });
  });

  it(`${FavoriteDogStore.name} should SET just one instance of dog when called two times ans is the same instance`, (done) => {
    service.setFavoriteDog(mockedDog);
    service.setFavoriteDog(mockedDog);

    service.getFavoriteDogList()?.subscribe({
      next: (data) => {
        expect(data).toStrictEqual([mockedDog]);
        done();
      },
    });
  });

  it(`${FavoriteDogStore.name} should SET two instances of dog when called two times and both are different`, (done) => {
    service.setFavoriteDog(mockedDog);
    service.setFavoriteDog({ ...mockedDog, name: 'different_name' });

    service.getFavoriteDogList()?.subscribe({
      next: (data) => {
        expect(data).toStrictEqual([
          mockedDog,
          { ...mockedDog, name: 'different_name' },
        ]);
        done();
      },
    });
  });

  it(`${FavoriteDogStore.name} should REMOVE a dog from favoriteDogList WHEN #removeFavoriteDog was called`, (done) => {
    service.setFavoriteDog(mockedDog);
    service.setFavoriteDog({ ...mockedDog, name: 'different_name' });

    service.removeFavoriteDog('different_name');

    service.getFavoriteDogList()?.subscribe({
      next: (data) => {
        expect(data).toStrictEqual([mockedDog]);
        done();
      },
    });
  });
});
