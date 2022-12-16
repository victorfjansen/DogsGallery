import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultContainerModule } from './container/default-container/default-container.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DefaultContainerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
