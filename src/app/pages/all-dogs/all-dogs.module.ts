import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllDogsComponent } from './all-dogs.component';
import { AllDogsRoutingModule } from './home.routing.module';

@NgModule({
  declarations: [AllDogsComponent],
  imports: [CommonModule, AllDogsRoutingModule],
})
export class AllDogsModule {}
