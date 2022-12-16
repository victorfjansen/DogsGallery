import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultContainerComponent } from './container/default-container/default-container.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
