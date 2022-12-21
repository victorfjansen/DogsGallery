import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ModalModule,
  runOnPushDetectChanges,
  YellowButtonModule,
} from 'src/shared';
import { ListModalTemplateComponent } from '../list-modal-template/list-modal-template.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, ListModalTemplateComponent],
      imports: [YellowButtonModule, ModalModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${HeaderComponent.name} should change theme to dark WHEN input component emits an event to do it`, () => {
    document = jest.fn(() => {
      documentElement: {
        getAttribute: () => 'light';
      }
    }) as unknown as Document;

    const inputElement = fixture.debugElement.query(
      By.css('.c-header__switch-theme')
    );
    inputElement.triggerEventHandler('change', { target: { checked: true } });

    runOnPushDetectChanges(fixture);

    expect(document.documentElement.getAttribute('data-theme')).toStrictEqual(
      'dark'
    );
  });

  it(`${HeaderComponent.name} should change theme to light WHEN input component emits an event to do it`, () => {
    document = jest.fn(() => {
      documentElement: {
        getAttribute: () => 'dark';
      }
    }) as unknown as Document;

    const inputElement = fixture.debugElement.query(
      By.css('.c-header__switch-theme')
    );
    inputElement.triggerEventHandler('change', { target: { checked: true } });

    runOnPushDetectChanges(fixture);

    expect(document.documentElement.getAttribute('data-theme')).toStrictEqual(
      'dark'
    );
  });
});
