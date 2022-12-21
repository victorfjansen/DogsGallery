import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultContainerComponent } from './container/default-container/default-container.component';
import { APP_ROUTES } from './enums';

// define um container global pra aplicação e define os childrens dessa aplicação carregados com o lazy load
const routes: Routes = [
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
        path: APP_ROUTES.ALL_DOGS,
        loadChildren: () =>
          import('./pages/all-dogs/all-dogs.module').then(
            (m) => m.AllDogsModule
          ),
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
export class AppRoutingModule {}
