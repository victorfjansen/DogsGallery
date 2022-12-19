import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SnakcbarModule, YellowButtonModule } from 'src/shared';
import { ModalModule } from 'src/shared/components/modal/modal.module';

import { HeaderComponent } from './components/header/header.component';
import { ListModalTemplateComponent } from './components/list-modal-template/list-modal-template.component';
import { DefaultContainerComponent } from './default-container.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DefaultContainerComponent,
    ListModalTemplateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    YellowButtonModule,
    ModalModule,
    SnakcbarModule,
  ],
  exports: [DefaultContainerComponent],
})
export class DefaultContainerModule {}
