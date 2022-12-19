import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakcbarComponent } from './snakcbar.component';

describe('SnakcbarComponent', () => {
  let component: SnakcbarComponent;
  let fixture: ComponentFixture<SnakcbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnakcbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakcbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
