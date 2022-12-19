import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotifierService } from 'angular-notifier';

import { FavoriteButtonComponent } from './favorite-dog-button.component';

@NgModule({
  declarations: [FavoriteButtonComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [FavoriteButtonComponent],
  providers: [NotifierService],
})
export class FavoriteButtonModule {}
