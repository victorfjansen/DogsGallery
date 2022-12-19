import { TestBed } from '@angular/core/testing';

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
});
