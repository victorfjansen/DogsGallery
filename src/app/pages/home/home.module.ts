import { DogsShowcaseComponent } from './sections/dogs-showcase/dogs-showcase.component';
import { HeroComponent } from './sections/hero/hero.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HeroComponent, HomeComponent, DogsShowcaseComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
