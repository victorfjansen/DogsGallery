import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import {
  FavoriteButtonModule,
  LoadingModule,
  ModalModule,
  PaginateModule,
  runOnPushDetectChanges,
} from 'src/shared';

import { PageState } from '../../enums';
import { DogServiceMock } from '../../services/dog/mock';
import { mockedDog } from './../../../shared/mocks/mocked-dogs.mock';
import { DogService } from './../../services/dog/dog.service';
import { AllDogsComponent } from './all-dogs.component';
import { DogCardComponent } from './components/dog-card/dog-card.component';
import { DogModalTemplateComponent } from './components/dog-modal-template/dog-modal-template.component';

describe('AllDogsComponent', () => {
  let component: AllDogsComponent;
  let fixture: ComponentFixture<AllDogsComponent>;
  let dogService: DogService;
  let notifierService: NotifierService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AllDogsComponent,
        DogCardComponent,
        DogModalTemplateComponent,
      ],
      imports: [
        HttpClientTestingModule,
        LoadingModule,
        ReactiveFormsModule,
        PaginateModule,
        ModalModule,
        FavoriteButtonModule,
        NotifierModule,
      ],
      providers: [
        {
          provide: DogService,
          useClass: DogServiceMock,
        },
        {
          provide: NotifierService,
          useValue: {
            notify: () => null,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AllDogsComponent);
    dogService = TestBed.inject(DogService);
    notifierService = TestBed.inject(NotifierService);
    component = fixture.componentInstance;
    runOnPushDetectChanges(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${AllDogsComponent.name} should have defined instances when initializes`, () => {
    expect(component.state).toBeDefined();
    expect(component.dogShowcaseList).toBeDefined();
    expect(component.dogShowcaseByName).toBeDefined();
    expect(component.paginationOptions).toBeDefined();
    expect(component.nameSearchForm).toBeDefined();
    expect(component.unsubscribe$).toBeDefined();
  });

  it(`${AllDogsComponent.name} should get dog list when initializes`, () => {
    const spyService = jest.spyOn(dogService, 'getDogList');
    component.ngOnInit();
    expect(spyService).toHaveBeenCalled();
  });

  it(`${AllDogsComponent.prototype.dogTrackBy.name} should return dog name`, () => {
    const result = component.dogTrackBy(0, {
      ...mockedDog,
      name: 'generic_dog',
    });
    expect(result).toBe('generic_dog');
  });

  it(`${AllDogsComponent.name} should display no-data message when pageState is ${PageState.NO_DATA}`, () => {
    component.state = PageState.NO_DATA;
    runOnPushDetectChanges(fixture);

    const noDataElement = fixture.debugElement.query(
      By.css('.c-all-dogs__no-data')
    );
    expect(noDataElement).toBeTruthy();
  });

  it(`${AllDogsComponent.name} should display loading component when pageState is ${PageState.LOADING}`, () => {
    component.state = PageState.LOADING;
    runOnPushDetectChanges(fixture);

    const loadingElement = fixture.debugElement.query(
      By.css('.c-all-dogs__loading')
    );
    expect(loadingElement).toBeTruthy();
  });

  it(`${AllDogsComponent.name} should display default content when pageState is ${PageState.DEFAULT}`, () => {
    component.state = PageState.DEFAULT;
    runOnPushDetectChanges(fixture);

    const defaultContent = fixture.debugElement.query(
      By.css('.c-all-dogs__default-content')
    );
    expect(defaultContent).toBeTruthy();
  });

  it(`${AllDogsComponent.name} should display default content and default results when pageState is ${PageState.DEFAULT} and nameSearchValue has no data`, () => {
    component.state = PageState.DEFAULT;
    component.dogShowcaseList = [mockedDog];
    runOnPushDetectChanges(fixture);

    const defaultResult = fixture.debugElement.query(
      By.css('.c-all-dogs__default-content__default-result')
    );
    expect(defaultResult).toBeTruthy();
  });

  it(`${AllDogsComponent.name} should display no-data content when component initializes and subscription operation (on getDogList) was a failure`, () => {
    const spyService = jest
      .spyOn(dogService, 'getDogList')
      .mockReturnValue(throwError(() => new Error()));
    const spyNotifier = jest.spyOn(notifierService, 'notify');
    component.ngOnInit();

    expect(spyService).toHaveBeenCalled();
    expect(spyNotifier).toHaveBeenCalled();
    expect(component.dogShowcaseList.length).toStrictEqual(0);
    expect(component.state).toStrictEqual(PageState.NO_DATA);
  });

  it(`${AllDogsComponent.name} should display default content and search by name results when pageState is ${PageState.DEFAULT} and nameSearchValue has data`, () => {
    component.state = PageState.DEFAULT;
    component.dogShowcaseByName = [mockedDog];
    component.nameSearchForm.patchValue('generic_dog');

    component.ngOnInit();
    runOnPushDetectChanges(fixture);

    const resultByName = fixture.debugElement.query(
      By.css('.c-all-dogs__default-content__search-by-name')
    );
    expect(resultByName).toBeTruthy();
  });

  it(`${AllDogsComponent.name} should display default content and search by name (no-data) results when pageState is ${PageState.DEFAULT} and nameSearchValue has data`, () => {
    component.state = PageState.DEFAULT;
    component.nameSearchForm.patchValue('test');

    component.ngOnInit();
    runOnPushDetectChanges(fixture);

    const noDataInByName = fixture.debugElement.query(
      By.css('.c-all-dogs__no-data')
    );
    expect(noDataInByName).toBeTruthy();
  });

  it(`${AllDogsComponent.name} should display pagination component when pageState is ${PageState.DEFAULT}`, () => {
    component.state = PageState.DEFAULT;
    runOnPushDetectChanges(fixture);

    const paginateComponent = fixture.debugElement.query(
      By.css('.c-all-dogs__pagination-container')
    );
    expect(paginateComponent).toBeTruthy();
  });

  it(`${AllDogsComponent.name} should have paginate component and WHEN their emits an event should get new dogList`, () => {
    const spyService = jest.spyOn(dogService, 'getDogList');

    component.state = PageState.DEFAULT;
    runOnPushDetectChanges(fixture);

    const paginateComponent = fixture.debugElement.query(
      By.css('.c-all-dogs__pagination-container__component')
    );
    paginateComponent.triggerEventHandler('changePageEvent', 2);

    expect(paginateComponent).toBeTruthy();
    expect(spyService).toHaveBeenCalled();
    expect(component.paginationOptions.current).toStrictEqual(2);
  });
});
