import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DogService } from 'src/app/services';
import {
  FavoriteButtonModule,
  LoadingModule,
  ModalModule,
  PaginateModule,
} from 'src/shared';

import { AllDogsComponent } from './all-dogs.component';
import { AllDogsRoutingModule } from './all-dogs.routing.module';
import { DogCardComponent } from './components/dog-card/dog-card.component';
import { DogModalTemplateComponent } from './components/dog-modal-template/dog-modal-template.component';

@NgModule({
  declarations: [AllDogsComponent, DogCardComponent, DogModalTemplateComponent],
  imports: [
    CommonModule,
    AllDogsRoutingModule,
    HttpClientModule,
    LoadingModule,
    ReactiveFormsModule,
    PaginateModule,
    ModalModule,
    FavoriteButtonModule,
  ],
  providers: [DogService],
})
export class AllDogsModule {}
