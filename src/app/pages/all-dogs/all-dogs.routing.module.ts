import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDogsComponent } from './all-dogs.component';

const routes: Routes = [
  {
    path: '',
    component: AllDogsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllDogsRoutingModule {}
