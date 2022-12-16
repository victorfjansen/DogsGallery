import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DogService } from 'src/app/services';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { DogsShowcaseComponent } from './sections/dogs-showcase/dogs-showcase.component';
import { HeroComponent } from './sections/hero/hero.component';

@NgModule({
  declarations: [HeroComponent, HomeComponent, DogsShowcaseComponent],
  imports: [CommonModule, HomeRoutingModule],
  providers: [DogService],
})
export class HomeModule {}
