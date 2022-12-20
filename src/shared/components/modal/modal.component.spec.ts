import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${ModalComponent.name} should have defined properties WHEN initializes`, () => {
    expect(component.visible).toBeDefined();
    expect(component.visible).toBeFalsy();
  });

  it(`${ModalComponent.name} should SWITCH visibility WHEN toggleVisibility is called`, () => {
    component.toggleVisibility();
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('.c-modal__component'));

    expect(modal).toBeTruthy();
  });

  it(`${ModalComponent.name} should SWITCH visibility WHEN overlay is clicked`, () => {
    component.toggleVisibility();
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('.c-modal__component'));
    expect(modal).toBeTruthy();

    const overlay = fixture.debugElement.query(By.css('.c-modal__overlay'));
    overlay.triggerEventHandler('click', null);

    fixture.detectChanges();

    const closedModal = fixture.debugElement.query(
      By.css('.c-modal__component')
    );
    expect(closedModal).toBeFalsy();
  });
});
