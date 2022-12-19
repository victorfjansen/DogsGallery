import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogModalTemplateComponent } from './dog-modal-template.component';

describe('DogModalTemplateComponent', () => {
  let component: DogModalTemplateComponent;
  let fixture: ComponentFixture<DogModalTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogModalTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogModalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
