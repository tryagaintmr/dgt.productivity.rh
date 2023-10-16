
import { HomePage } from './home.page';
import { DummyDataCrudComponent } from './dummy-data-crud/dummy-data-crud.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'crud',
    children: [
      {
        path: 'dummy-data-crud',
        component: DummyDataCrudComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
