import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DogService } from 'src/app/services';
import { LoadingModule } from 'src/shared';

import { AllDogsComponent } from './all-dogs.component';
import { DogCardComponent } from './components/dog-card/dog-card.component';
import { AllDogsRoutingModule } from './home.routing.module';

@NgModule({
  declarations: [AllDogsComponent, DogCardComponent],
  imports: [
    CommonModule,
    AllDogsRoutingModule,
    HttpClientModule,
    LoadingModule,
    ReactiveFormsModule,
  ],
  providers: [DogService],
})
export class AllDogsModule {}
