import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotifierModule, NotifierService } from 'angular-notifier';
import {
  FavoriteButtonModule,
  mockedDog,
  ModalModule,
  runOnPushDetectChanges,
} from 'src/shared';
import { DogModalTemplateComponent } from '../dog-modal-template/dog-modal-template.component';
import { DogCardComponent } from './dog-card.component';

describe('DogCardComponent', () => {
  let component: DogCardComponent;
  let fixture: ComponentFixture<DogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DogCardComponent, DogModalTemplateComponent],
      imports: [FavoriteButtonModule, NotifierModule, ModalModule],
      providers: [
        {
          provide: NotifierService,
          useValue: {
            notify: () => null,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DogCardComponent);
    component = fixture.componentInstance;
    runOnPushDetectChanges(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${DogCardComponent.name} should have defined properties when initializes`, () => {
    expect(component.dogObject).toBeDefined();
  });

  it(`${DogCardComponent.name} should open modal when title of card was clicked`, () => {
    component.dogObject = mockedDog;

    const titleElement = fixture.debugElement.query(
      By.css('.c-dog-card__text-content__title')
    );
    titleElement.triggerEventHandler('click', null);

    runOnPushDetectChanges(fixture);

    const modalComponent = fixture.debugElement.query(
      By.css('.c-dog-card__modal')
    );
    expect(modalComponent).toBeTruthy();
  });
});
