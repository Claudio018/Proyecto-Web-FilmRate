import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'peliculas',
    loadChildren: () => import('./pages/peliculas/peliculas.module').then( m => m.PeliculasPageModule)
  },
  {
    path: 'resenas',
    loadChildren: () => import('./pages/resenas/resenas.module').then( m => m.ResenasPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./pages/registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'pelicula',
    loadChildren: () => import('./pages/pelicula/pelicula.module').then( m => m.PeliculaPageModule)
  },
  {
    path: 'pelicula/:id',
    loadChildren: () => import('./pages/pelicula/pelicula.module').then(m => m.PeliculaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'leer-resena',
    loadChildren: () => import('./pages/leer-resena/leer-resena.module').then( m => m.LeerResenaPageModule)
  },
  {
    path: 'crear-resena',
    loadChildren: () => import('./pages/crear-resena/crear-resena.module').then( m => m.CrearResenaPageModule)
  },

  {
    path: 'crear-resena/:id',
    loadChildren: () => import('./pages/crear-resena/crear-resena.module').then(m => m.CrearResenaPageModule)
  },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
