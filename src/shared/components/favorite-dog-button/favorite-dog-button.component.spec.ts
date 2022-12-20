import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotifierModule, NotifierService } from 'angular-notifier';

import { FavoriteDogStore, FavoriteDogStoreMock, mockedDog } from '../../store';
import { FavoriteButtonComponent } from './favorite-dog-button.component';
import { of } from 'rxjs';

describe('FavoriteButtonComponent', () => {
  let component: FavoriteButtonComponent;
  let fixture: ComponentFixture<FavoriteButtonComponent>;
  let dogService: FavoriteDogStore;
  let notifyService: NotifierService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, NotifierModule],
      declarations: [FavoriteButtonComponent],
      providers: [
        {
          provide: NotifierService,
          useValue: {
            notify: () => 'success',
          },
        },
        {
          provide: FavoriteDogStore,
          useClass: FavoriteDogStoreMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteButtonComponent);
    dogService = TestBed.inject(FavoriteDogStore);
    notifyService = TestBed.inject(NotifierService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${FavoriteButtonComponent.name} should have defined properties when initializes`, () => {
    expect(component.faHeart).toBeDefined();
    expect(component.dog).toBeDefined();
    expect(component.isDogFavorite).toBeDefined();
    expect(component.unsubscribe$).toBeDefined();
  });

  it(`${FavoriteButtonComponent.name} should VERIFY if dogs is favorite WHEN data changes`, () => {
    const spyService = jest.spyOn(dogService, 'getFavoriteDogList');

    component.ngOnChanges();

    expect(spyService).toHaveBeenCalled();
  });

  it(`${FavoriteButtonComponent.name} should CALL setFavoriteDog  WHEN favorite dog state is false and  #toggleFavoriteState was called`, () => {
    component.isDogFavorite = false;

    const spyService = jest.spyOn(dogService, 'setFavoriteDog');
    const spyNotifierService = jest.spyOn(notifyService, 'notify');

    const iconElement = fixture.debugElement.query(By.css('.c-favorite__icon'));
    iconElement.triggerEventHandler('click', null);

    expect(spyService).toHaveBeenCalled();
    expect(spyNotifierService).toHaveBeenCalled();
  });

  it(`${FavoriteButtonComponent.name} should CALL removeFAvoriteDog  WHEN favorite dog state is true and #toggleFavoriteState was called`, () => {
    component.isDogFavorite = true;

    const spyService = jest.spyOn(dogService, 'removeFavoriteDog');
    const iconElement = fixture.debugElement.query(By.css('.c-favorite__icon'));
    iconElement.triggerEventHandler('click', null);

    component.ngOnChanges();

    expect(spyService).toHaveBeenCalled();
    expect(component.isDogFavorite).toBeFalsy();
  });

  it(`${FavoriteButtonComponent.name} should define dog as favorite when initializes and dog come as true`, () => {
    component.dog = mockedDog;
    component.ngOnChanges();

    expect(component.isDogFavorite).toBeTruthy();
  });

  it(`${FavoriteButtonComponent.name} should define dog as non-favorite when initializes and dog come as false`, () => {
    component.dog = { ...mockedDog, name: 'other_dog' };
    component.ngOnChanges();

    expect(component.isDogFavorite).toBeFalsy();
  });
});
