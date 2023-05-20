import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultContainerModule } from './container/default-container/default-container.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMixpanelModule } from 'src/shared/lib/mixpanel/src/ng-mixpanel.module';
import { DEFAULT_MIXPANEL_URI, MIXPANEL_TOKEN } from './config';

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
      'i2313',
      DEFAULT_MIXPANEL_URI,
      true
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
