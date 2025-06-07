import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../../pipes/safe.pipe';

import { IonicModule } from '@ionic/angular';

import { PeliculaPageRoutingModule } from './pelicula-routing.module';

import { PeliculaPage } from './pelicula.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeliculaPageRoutingModule,
    SafePipe
  ],
  declarations: [PeliculaPage]
})
export class PeliculaPageModule {}
