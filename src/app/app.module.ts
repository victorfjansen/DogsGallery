import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotifierModule } from 'angular-notifier';
import { NgMixpanelModule } from 'src/shared/lib/mixpanel/src/ng-mixpanel.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MIXPANEL_TOKEN } from './config';
import { DefaultContainerModule } from './container/default-container/default-container.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DefaultContainerModule,
    NotifierModule,
    FontAwesomeModule,
    NgMixpanelModule.forRoot(
      MIXPANEL_TOKEN,
      'userId',
      true
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
