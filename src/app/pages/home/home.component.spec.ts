import { DogServiceMock } from './../../services/dog/mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotifierModule, NotifierService } from 'angular-notifier';
import {
  FavoriteButtonModule,
  LoadingModule,
  SnakcbarModule,
  YellowButtonModule,
  runOnPushDetectChanges,
  mockedDog,
} from 'src/shared';

import { DogService } from '../../services';
import { DogsShowcaseComponent } from './components/dogs-showcase/dogs-showcase.component';
import { HomeComponent } from './home.component';
import { of, throwError } from 'rxjs';
import { NOTIFIER_TYPES, PageState } from '../../enums';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let changeDetectorRef: ChangeDetectorRef;
  let notifierService: NotifierService;
  let dogService: DogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, DogsShowcaseComponent],
      imports: [
        HttpClientTestingModule,
        LoadingModule,
        YellowButtonModule,
        FavoriteButtonModule,
        SnakcbarModule,
        NotifierModule,
      ],
      providers: [
        {
          provide: DogService,
          useClass: DogServiceMock,
        },
        {
          provide: ChangeDetectorRef,
          useValue: {
            detectChanges: () => null,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    changeDetectorRef = TestBed.inject(ChangeDetectorRef);
    notifierService = TestBed.inject(NotifierService);
    dogService = TestBed.inject(DogService);
    runOnPushDetectChanges(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${HomeComponent.name} should have defined instances WHEN initializes`, () => {
    expect(component.state).toBeDefined();
    expect(component.dogShowcaseList).toBeDefined();
  });

  it(`${HomeComponent.name} should GET dogList when component initializes`, () => {
    const spyService = jest.spyOn(dogService, 'getDogList');

    component.ngOnInit();
    expect(spyService).toHaveBeenCalled();
  });

  it(`${HomeComponent.name} should GET dogList when component initializes and subscription operation was successful`, () => {
    const spyService = jest.spyOn(dogService, 'getDogList');
    component.ngOnInit();

    expect(spyService).toHaveBeenCalled();
    expect(component.dogShowcaseList).toStrictEqual([mockedDog]);
  });

  it(`${HomeComponent.name} should GET dogList when component initializes and subscription operation was successful and put component in NO_DATA state WHEN has no data`, () => {
    const spyService = jest
      .spyOn(dogService, 'getDogList')
      .mockReturnValue(of([]));

    component.ngOnInit();

    expect(spyService).toHaveBeenCalled();
    expect(component.dogShowcaseList).toStrictEqual([]);
    expect(component.state).toStrictEqual(PageState.NO_DATA);
  });

  it(`${HomeComponent.name} should NOT get dogList when component initializes and subscription operation was a failure`, () => {
    const spyService = jest
      .spyOn(dogService, 'getDogList')
      .mockReturnValue(throwError(() => new Error('algo errado')));
    const spyNotifier = jest.spyOn(notifierService, 'notify');

    component.ngOnInit();

    expect(spyService).toHaveBeenCalled();
    expect(spyNotifier).toHaveBeenCalledWith(
      NOTIFIER_TYPES.ERROR,
      'algo errado'
    );
    expect(component.dogShowcaseList).toStrictEqual([]);
    expect(component.state).toStrictEqual(PageState.NO_DATA);
  });
});
