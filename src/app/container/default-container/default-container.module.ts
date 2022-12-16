import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DefaultContainerComponent } from './default-container.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, DefaultContainerComponent],
  imports: [CommonModule, RouterModule],
  exports: [DefaultContainerComponent],
})
export class DefaultContainerModule {}
