import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotifierModule, NotifierService } from 'angular-notifier';
import {
  FavoriteButtonModule,
  FavoriteDogStore,
  FavoriteDogStoreMock,
  mockedDog,
  ModalModule,
  runOnPushDetectChanges,
} from 'src/shared';

import { DogModalTemplateComponent } from './dog-modal-template.component';

describe('DogModalTemplateComponent', () => {
  let component: DogModalTemplateComponent;
  let fixture: ComponentFixture<DogModalTemplateComponent>;
  let dogStore: FavoriteDogStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DogModalTemplateComponent],
      imports: [FavoriteButtonModule, ModalModule, NotifierModule],
      providers: [
        {
          provide: NotifierService,
          useValue: {
            notify: () => null,
          },
        },
        {
          provide: FavoriteDogStore,
          useClass: FavoriteDogStoreMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DogModalTemplateComponent);
    dogStore = TestBed.inject(FavoriteDogStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${DogModalTemplateComponent.name} should have defined instances when initializes`, () => {
    expect(component.selectedDog).toBeDefined();
    expect(component.isFavorite).toBeDefined();
    expect(component.unsubscribe$).toBeDefined();
  });

  it(`${DogModalTemplateComponent.name} should get DogStore when initializes`, () => {
    const spyStore = jest.spyOn(dogStore, 'getFavoriteDogList');
    component.ngOnInit();

    expect(spyStore).toHaveBeenCalled();
  });

  it(`${DogModalTemplateComponent.name} should get DogStore and set as favorite WHEN dog is mockedDog`, () => {
    const spyStore = jest.spyOn(dogStore, 'getFavoriteDogList');
    component.selectedDog = mockedDog;

    component.ngOnInit();

    expect(spyStore).toHaveBeenCalled();
    expect(component.isFavorite).toBeTruthy();
  });

  it(`${DogModalTemplateComponent.name} should get DogStore and not set as favorite WHEN dog is not a mockedDog`, () => {
    const spyStore = jest.spyOn(dogStore, 'getFavoriteDogList');

    runOnPushDetectChanges(fixture);
    component.ngOnInit();

    expect(spyStore).toHaveBeenCalled();
    expect(component.isFavorite).toBeFalsy();
  });

  it(`${DogModalTemplateComponent.name} should open modal when toggleVisibility was called`, () => {
    component.toggleVisibility(mockedDog);

    const modalComponent = fixture.debugElement.query(
      By.css('.c-dog-modal__modal')
    );
    expect(modalComponent).toBeTruthy();
  });
});
