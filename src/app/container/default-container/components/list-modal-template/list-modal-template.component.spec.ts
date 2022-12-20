import { NotifierModule, NotifierService } from 'angular-notifier';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ModalModule,
  SnakcbarModule,
  FavoriteDogStore,
  FavoriteDogStoreMock,
} from '../../../../../shared';
import { ListModalTemplateComponent } from './list-modal-template.component';

describe('ListModalTemplateComponent', () => {
  let component: ListModalTemplateComponent;
  let fixture: ComponentFixture<ListModalTemplateComponent>;
  let dogStore: FavoriteDogStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListModalTemplateComponent],
      imports: [ModalModule, SnakcbarModule, NotifierModule],
      providers: [
        {
          provide: FavoriteDogStore,
          useClass: FavoriteDogStoreMock,
        },
        {
          provide: NotifierService,
          useValue: {
            notify: () => 'success',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListModalTemplateComponent);
    dogStore = TestBed.inject(FavoriteDogStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${ListModalTemplateComponent.name} should have defined properties when initializes`, () => {
    expect(component.dogList).toBeDefined();
    expect(component.unsubscribe$).toBeDefined();
    expect(component.modal).toBeDefined();
  });

  it(`${ListModalTemplateComponent.name} should GET favorite dog list when initializes`, () => {
    const spyService = jest.spyOn(dogStore, 'getFavoriteDogList');

    component.ngOnInit();
    expect(spyService).toHaveBeenCalled();
  });

  it(`${ListModalTemplateComponent.name} should GET favorite dog list when initializes`, () => {
    const spyService = jest.spyOn(dogStore, 'getFavoriteDogList');

    component.ngOnInit();
    expect(spyService).toHaveBeenCalled();
  });
});
