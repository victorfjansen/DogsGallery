import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModalTemplateComponent } from './list-modal-template.component';

describe('ListModalTemplateComponent', () => {
  let component: ListModalTemplateComponent;
  let fixture: ComponentFixture<ListModalTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListModalTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListModalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
