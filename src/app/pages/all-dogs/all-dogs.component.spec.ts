import { DogService } from './../../services/dog/dog.service';
import { FavoriteButtonModule } from './../../../shared/components/favorite-dog-button/favorite-dog-button.module';
import { ModalModule } from './../../../shared/components/modal/modal.module';
import { PaginateModule } from './../../../shared/components/paginate/paginate.module';
import { LoadingModule } from './../../../shared/components/loading/loading.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AllDogsComponent } from './all-dogs.component';

describe('AllDogsComponent', () => {
  let component: AllDogsComponent;
  let fixture: ComponentFixture<AllDogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllDogsComponent],
      imports: [
        HttpClientTestingModule,
        LoadingModule,
        ReactiveFormsModule,
        PaginateModule,
        ModalModule,
        FavoriteButtonModule,
      ],
      providers: [DogService],
    }).compileComponents();

    fixture = TestBed.createComponent(AllDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
