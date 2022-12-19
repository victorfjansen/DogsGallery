import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FavoriteButtonModule } from '../favorite-dog-button/favorite-dog-button.module';

import { SnakcbarComponent } from './snakcbar.component';

@NgModule({
  declarations: [SnakcbarComponent],
  imports: [CommonModule, FavoriteButtonModule],
  exports: [SnakcbarComponent],
})
export class SnakcbarModule {}
