import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { runOnPushDetectChanges } from '../../helpers';

import { YellowButtonComponent } from './yellow-button.component';

describe('YellowButtonComponent', () => {
  let component: YellowButtonComponent;
  let fixture: ComponentFixture<YellowButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YellowButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YellowButtonComponent);
    component = fixture.componentInstance;
    runOnPushDetectChanges(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${YellowButtonComponent.name} should EMIT an event WHEN button was clicked`, () => {
    const spyEmmit = jest.spyOn(component.clickEvent, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('.c-button'));

    buttonElement.triggerEventHandler('click', null);

    expect(buttonElement).toBeTruthy();
    expect(spyEmmit).toHaveBeenCalled();
  });

  it(`${YellowButtonComponent.name} should HAVE custom text content WHEN this property is passed as input property`, () => {
    const genericPhrase = 'custom_phrase';
    component.content = genericPhrase;

    runOnPushDetectChanges(fixture);

    const textOnButton = (
      fixture.nativeElement.querySelector('button') as HTMLButtonElement
    ).textContent;

    expect(textOnButton).toBeTruthy();
    expect(textOnButton).toStrictEqual(genericPhrase);
  });

  it(`${YellowButtonComponent.name} should NOT HAVE custom text content WHEN no property is passed as input property`, () => {
    const textOnButton = (
      fixture.nativeElement.querySelector('button') as HTMLButtonElement
    ).textContent;

    expect(textOnButton).toBeTruthy();
    expect(textOnButton).toStrictEqual('Default Button');
  });
});
