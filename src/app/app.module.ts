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
import { RouteReuseStrategy } from '@angular/router';
import { RouteReuseService } from 'src/shared/services/reuse-route-strategy.service';
import { AllDogsComponent } from './pages/all-dogs/all-dogs.component';
import { HttpClientModule } from '@angular/common/http';
import { FavoriteButtonModule, LoadingModule, ModalModule, PaginateModule } from 'src/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { DogCardComponent } from './pages/all-dogs/components/dog-card/dog-card.component';
import { DogModalTemplateComponent } from './pages/all-dogs/components/dog-modal-template/dog-modal-template.component';
import { DogService } from './services';


@NgModule({
  declarations: [AppComponent, DogModalTemplateComponent, DogCardComponent, AllDogsComponent],
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

    HttpClientModule,
    NgMixpanelModule.forChild(),
    LoadingModule,
    ReactiveFormsModule,
    PaginateModule,
    ModalModule,
    FavoriteButtonModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: RouteReuseService
    },
    DogService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
