import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from './paginate.component';

@NgModule({
  declarations: [PaginateComponent],
  imports: [CommonModule],
  exports: [PaginateComponent],
})
export class PaginateModule {}
