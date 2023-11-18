import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultContainerComponent } from './container/default-container/default-container.component';
import { APP_ROUTES } from './enums';
import { AllDogsComponent } from './pages/all-dogs/all-dogs.component';

const routes: Routes = [
  {
    path: APP_ROUTES.ALL_DOGS,
    component: AllDogsComponent
  },
  {
    path: '',
    component: DefaultContainerComponent,
    children: [
      {
        path: APP_ROUTES.HOME,
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },

      {
        path: '**',
        redirectTo: APP_ROUTES.HOME,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
