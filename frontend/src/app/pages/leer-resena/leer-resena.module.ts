import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeerResenaPageRoutingModule } from './leer-resena-routing.module';

import { LeerResenaPage } from './leer-resena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeerResenaPageRoutingModule
  ],
  declarations: [LeerResenaPage]
})
export class LeerResenaPageModule {}
