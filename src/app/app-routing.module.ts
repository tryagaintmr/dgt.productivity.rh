import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'crud',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'elf',
    loadChildren: () =>
      import('./elf/dummy.data.module').then((m) => m.DummyDataElfModule),
  },
  {
    path: 'form',
    loadChildren: () =>
      import('./form/form.module').then((m) => m.FormModule),
  },
  {
    path: '',
    redirectTo: 'crud',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true, enableTracing: false, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
