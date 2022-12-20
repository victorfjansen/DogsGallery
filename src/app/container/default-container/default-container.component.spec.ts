import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './components/header/header.component';
import { ListModalTemplateComponent } from './components/list-modal-template/list-modal-template.component';

import { DefaultContainerComponent } from './default-container.component';

describe('DefaultContainerComponent', () => {
  let component: DefaultContainerComponent;
  let fixture: ComponentFixture<DefaultContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DefaultContainerComponent,
        HeaderComponent,
        ListModalTemplateComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
