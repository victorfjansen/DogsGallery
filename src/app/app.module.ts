import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultContainerModule } from './container/default-container/default-container.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultContainerModule,
    NotifierModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
