import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeerResenaPage } from './leer-resena.page';

const routes: Routes = [
  {
    path: '',
    component: LeerResenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeerResenaPageRoutingModule {}
