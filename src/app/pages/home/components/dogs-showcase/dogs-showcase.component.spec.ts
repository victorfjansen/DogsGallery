import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsShowcaseComponent } from './dogs-showcase.component';

describe('DogsShowcaseComponent', () => {
  let component: DogsShowcaseComponent;
  let fixture: ComponentFixture<DogsShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogsShowcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
