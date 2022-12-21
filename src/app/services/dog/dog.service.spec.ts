import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockedDog, mockedDogDto } from 'src/shared';

import { DogService } from './dog.service';

const baseUrl = 'https://api.thedogapi.com/v1/breeds?page=1&limit=15';

describe('DogService', () => {
  let service: DogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DogService],
    });

    service = TestBed.inject(DogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`${DogService.prototype.getDogList.name} should GET dogList when #getDogList was called`, (done) => {
    service.getDogList().subscribe({
      next: (data) => {
        expect(data).toStrictEqual([
          {
            imageUrl: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
            lifeSpan: '10 - 12 years',
            name: 'Affenpinscher',
            origin: 'Germany, France',
            temperament:
              'Stubborn, Curious, Playful, Adventurous, Active, Fun-loving',
          },
        ]);
        done();
      },
    });

    const request = httpMock.expectOne(baseUrl);
    request.flush([mockedDogDto]);
    expect(request.request.method).toBe('GET');
  });

  it(`${DogService.prototype.getDogList.name} should NOT get dogList when #getDogList was called`, (done) => {
    service.getDogList().subscribe({
      next: () => done(),
      error: (err: HttpErrorResponse) => {
        expect(err.status).toBe(500);
        done();
      },
    });

    const request = httpMock.expectOne(baseUrl);
    request.error(new ErrorEvent('internal error'), {
      status: 500,
      statusText: 'internal error',
    });
    expect(request.request.method).toBe('GET');
  });
});
