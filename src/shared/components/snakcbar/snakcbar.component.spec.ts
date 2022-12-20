import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NotifierModule } from 'angular-notifier';

import { runOnPushDetectChanges } from '../../helpers';
import { FavoriteButtonModule } from '../favorite-dog-button/favorite-dog-button.module';
import { SnakcbarComponent } from './snakcbar.component';

describe('SnakcbarComponent', () => {
  let component: SnakcbarComponent;
  let fixture: ComponentFixture<SnakcbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnakcbarComponent],
      imports: [FavoriteButtonModule, NotifierModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SnakcbarComponent);
    component = fixture.componentInstance;
    runOnPushDetectChanges(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${SnakcbarComponent.name} should HAVE defined properties WHEN initializes`, () => {
    expect(component.clickEvent).toBeTruthy();
    expect(component.dog).toBeTruthy();
    expect(component.withFavButton).toBeDefined();
  });

  it(`${SnakcbarComponent.name} should EMIT an event WHEN snackbar component was clicked`, () => {
    const spyEmit = jest.spyOn(component.clickEvent, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('.c-snackbar'));

    buttonElement.triggerEventHandler('click', null);

    expect(buttonElement).toBeTruthy();
    expect(spyEmit).toHaveBeenCalled();
  });

  it(`${SnakcbarComponent.name} should HAVE arrow image when withFavButton property is false`, () => {
    component.withFavButton = false;
    runOnPushDetectChanges(fixture);

    const arrowElement = fixture.debugElement.query(
      By.css('.c-snackbar__arrow-img')
    );
    expect(arrowElement).toBeTruthy();
  });

  it(`${SnakcbarComponent.name} should HAVE arrow favoriteButton when withFavButton property is true`, () => {
    component.withFavButton = true;
    runOnPushDetectChanges(fixture);

    const favButtonElement = fixture.debugElement.query(
      By.css('.c-snackbar__fav-button')
    );
    expect(favButtonElement).toBeTruthy();
  });
});
