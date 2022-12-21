import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DogService } from 'src/app/services';
import {
  FavoriteButtonModule,
  LoadingModule,
  SnakcbarModule,
  YellowButtonModule,
} from 'src/shared';

import { DogsShowcaseComponent } from './components/dogs-showcase/dogs-showcase.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
  declarations: [HomeComponent, DogsShowcaseComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    LoadingModule,
    YellowButtonModule,
    FavoriteButtonModule,
    SnakcbarModule,
  ],
  providers: [DogService],
})
export class HomeModule {}
