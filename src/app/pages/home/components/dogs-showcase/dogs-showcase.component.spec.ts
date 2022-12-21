import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { APP_ROUTES, PageState } from '../../../../enums';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FavoriteButtonModule,
  LoadingModule,
  mockedDog,
  runOnPushDetectChanges,
  YellowButtonModule,
  SnakcbarModule,
} from 'src/shared';

import { DogsShowcaseComponent } from './dogs-showcase.component';
import { NotifierModule } from 'angular-notifier';
import { RouterTestingModule } from '@angular/router/testing';
import { AllDogsComponent } from '../../../all-dogs/all-dogs.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DogsShowcaseComponent', () => {
  let component: DogsShowcaseComponent;
  let fixture: ComponentFixture<DogsShowcaseComponent>;
  let route: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DogsShowcaseComponent],
      imports: [
        LoadingModule,
        FavoriteButtonModule,
        NotifierModule,
        YellowButtonModule,
        NotifierModule,
        SnakcbarModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: APP_ROUTES.ALL_DOGS, component: AllDogsComponent },
          { path: '**', redirectTo: APP_ROUTES.ALL_DOGS },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DogsShowcaseComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${DogsShowcaseComponent.name} should have defined properties when Initializes`, () => {
    expect(component.showcaseList).toBeDefined();
    expect(component.selectedDog).toBeDefined();
    expect(component.pageState).toBeDefined();
    expect(component.state).toBeDefined();
  });

  it(`${DogsShowcaseComponent.name} should display no-data message WHEN pageState is ${PageState.NO_DATA}`, () => {
    component.state = PageState.NO_DATA;
    runOnPushDetectChanges(fixture);

    const noDataMessage = fixture.debugElement.query(
      By.css('.c-dogs-showcase__no-data')
    );
    expect(noDataMessage).toBeTruthy();
  });

  it(`${DogsShowcaseComponent.name} should display loading component WHEN pageState is ${PageState.LOADING}`, () => {
    component.state = PageState.LOADING;
    runOnPushDetectChanges(fixture);

    const loadingComponent = fixture.debugElement.query(
      By.css('.c-dogs-showcase__loading')
    );
    expect(loadingComponent).toBeTruthy();
  });

  it(`${DogsShowcaseComponent.name} should display default content WHEN pageState is ${PageState.DEFAULT}`, () => {
    component.state = PageState.DEFAULT;
    runOnPushDetectChanges(fixture);

    const defaultComponent = fixture.debugElement.query(
      By.css('.c-dogs-showcase__default-content')
    );
    expect(defaultComponent).toBeTruthy();
  });

  it(`${DogsShowcaseComponent.name} should navigate to ${APP_ROUTES.ALL_DOGS} when yellowButton was clicked and pageState is ${PageState.DEFAULT}`, () => {
    component.state = PageState.DEFAULT;
    runOnPushDetectChanges(fixture);

    const spyRouter = jest.spyOn(route, 'navigate');
    const buttonComponent = fixture.debugElement.query(
      By.css('.c-dogs-showcase__container__header__button')
    );
    buttonComponent.triggerEventHandler('clickEvent');

    expect(buttonComponent).toBeTruthy();
    expect(spyRouter).toHaveBeenCalledWith([APP_ROUTES.ALL_DOGS]);
  });

  it(`${DogsShowcaseComponent.name} should change selectedDog WHEN snackbar was clicked  and pageState is ${PageState.DEFAULT}`, () => {
    component.state = PageState.DEFAULT;
    component.showcaseList = [mockedDog];
    runOnPushDetectChanges(fixture);

    const snackBar = fixture.debugElement.query(
      By.css('#c-dogs-showcase__container__content__snackbar-container-0')
    );
    snackBar.triggerEventHandler('clickEvent', null);

    expect(snackBar).toBeTruthy();
    expect(component.selectedDog).toStrictEqual(mockedDog);
  });

  it(`${DogsShowcaseComponent.prototype.dogTrackBy.name} return string when was called`, () => {
    const result = component.dogTrackBy({}, { ...mockedDog, name: 'generic' });
    expect(result).toBe('generic');
  });
});
