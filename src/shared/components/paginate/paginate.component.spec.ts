import { By } from '@angular/platform-browser';
import { SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { runOnPushDetectChanges } from '../../helpers';
import { PaginateComponent } from './paginate.component';

const defaultChanges = {
  current: {
    currentValue: 6,
  },
  total: {
    currentValue: 12,
  },
};

describe('PaginateComponent', () => {
  let component: PaginateComponent;
  let fixture: ComponentFixture<PaginateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginateComponent);
    component = fixture.componentInstance;
    runOnPushDetectChanges(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${PaginateComponent.name} should HAVE defined instances WHEN initializes`, () => {
    expect(component.current).toBeDefined();
    expect(component.total).toBeDefined();
    expect(component.changePageEvent).toBeDefined();
    expect(component.pages).toBeDefined();
  });

  it(`${PaginateComponent.name} should RETURN  progressive pages from 1 to 5 WHEN currentValue or total value changes and total value is less than 7`, () => {
    const mockedChanges = {
      current: {
        currentValue: 1,
      },
      total: {
        currentValue: 0,
      },
    };

    component.current = 1;
    component.total = 5;

    component.ngOnChanges(mockedChanges as unknown as SimpleChanges);
    runOnPushDetectChanges(fixture);

    expect(component.pages).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it(`${PaginateComponent.name} should RETURN  progressive pages from 1 to 5 WHEN currentValue or total value changes and total value is less than 7`, () => {
    const mockedChanges = {
      current: {
        currentValue: 0,
      },
      total: {
        currentValue: 5,
      },
    };

    component.current = 1;
    component.total = 5;

    component.ngOnChanges(mockedChanges as unknown as SimpleChanges);
    runOnPushDetectChanges(fixture);

    expect(component.pages).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it(`${PaginateComponent.name} should RETURN  progressive pages ( 1 to 5 / -1 / 8) WHEN currentValue or total value changes and total value is 8`, () => {
    const mockedChanges = {
      current: {
        currentValue: 1,
      },
      total: {
        currentValue: 8,
      },
    };

    component.current = 1;
    component.total = 8;

    component.ngOnChanges(mockedChanges as unknown as SimpleChanges);
    runOnPushDetectChanges(fixture);

    expect(component.pages).toStrictEqual([1, 2, 3, 4, 5, -1, 8]);
  });

  it(`${PaginateComponent.name} should RETURN  progressive pages ( 1 / -1 / 4 to 8) WHEN currentValue or total value changes and current value is greater than 5 and total - 4 is less than current page`, () => {
    const mockedChanges = {
      current: {
        currentValue: 6,
      },
      total: {
        currentValue: 8,
      },
    };

    component.current = 6;
    component.total = 8;

    component.ngOnChanges(mockedChanges as unknown as SimpleChanges);
    runOnPushDetectChanges(fixture);

    expect(component.pages).toStrictEqual([1, -1, 4, 5, 6, 7, 8]);
  });

  it(`${PaginateComponent.name} should RETURN  progressive pages ( 1 / -1 / 5 to 7 / -1 / 12) WHEN currentValue or total value changes and current value is greater than 5 and total - 4 is greater than current page`, () => {
    component.current = 6;
    component.total = 12;

    component.ngOnChanges(defaultChanges as unknown as SimpleChanges);
    runOnPushDetectChanges(fixture);

    expect(component.pages).toStrictEqual([1, -1, 5, 6, 7, -1, 12]);
  });

  it(`${PaginateComponent.name} should EMIT an event WHEN prev button was clicked`, () => {
    const spyEmitter = jest.spyOn(component.changePageEvent, 'emit');

    component.current = 6;
    component.total = 12;

    component.ngOnChanges(defaultChanges as unknown as SimpleChanges);
    runOnPushDetectChanges(fixture);

    const buttonElement = fixture.debugElement.query(
      By.css('.c-pagination__prev-button')
    );
    buttonElement.triggerEventHandler('click', null);

    expect(spyEmitter).toHaveBeenCalled();
    expect(buttonElement).toBeTruthy();
  });

  it(`${PaginateComponent.name} should EMIT an event WHEN mid button was clicked`, () => {
    const spyEmitter = jest.spyOn(component.changePageEvent, 'emit');

    component.current = 6;
    component.total = 12;

    component.ngOnChanges(defaultChanges as unknown as SimpleChanges);
    runOnPushDetectChanges(fixture);

    const buttonElement = fixture.debugElement.query(
      By.css('.c-pagination__mid-button')
    );
    buttonElement.triggerEventHandler('click', null);

    expect(spyEmitter).toHaveBeenCalled();
    expect(buttonElement).toBeTruthy();
  });

  it(`${PaginateComponent.name} should EMIT an event WHEN mid button was clicked`, () => {
    const spyEmitter = jest.spyOn(component.changePageEvent, 'emit');

    component.current = 6;
    component.total = 12;

    component.ngOnChanges(defaultChanges as unknown as SimpleChanges);
    runOnPushDetectChanges(fixture);

    const buttonElement = fixture.debugElement.query(
      By.css('.c-pagination__next-button')
    );
    buttonElement.triggerEventHandler('click', null);

    expect(spyEmitter).toHaveBeenCalled();
    expect(buttonElement).toBeTruthy();
  });
});
