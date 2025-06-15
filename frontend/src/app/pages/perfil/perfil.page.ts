import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { TmbdService } from '../../services/tmbd.service';
import { Usuario } from '../../models/usuario';
import { Estadisticas } from '../../models/estadisticas';
import { forkJoin } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage {
  perfil?: Usuario;
  favoritos: any[] = [];
  stats?: Estadisticas;
  cargando = true;

  esMiPerfil = false;
  editandoDescripcion = false;
  nuevaDescripcion = '';

  loSigue = false;
  cargandoSeguimiento = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioSvc: UsuarioService,
    private auth: AuthService,
    private tmdb: TmbdService,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    const nombre = this.route.snapshot.paramMap.get('nombre');

    if (!nombre) {
      this.router.navigate(['/']);
      return;
    }

    this.usuarioSvc.getPerfilPorNombre(nombre).subscribe({
      next: perfil => {
        this.perfil = perfil;
        this.nuevaDescripcion = perfil.descripcion || '';

        const rutActual = this.auth.getUsuarioRut();
        this.esMiPerfil = rutActual === perfil.rut;

        this.cargarFavoritos(perfil.rut);

        this.usuarioSvc.getEstadisticas(perfil.rut).subscribe({
          next: est => {
            this.stats = est;
            this.cargando = false;
          },
          error: err => {
            console.error('Error al cargar estadísticas:', err);
            this.cargando = false;
          }
        });

        if (!this.esMiPerfil) {
          this.cargandoSeguimiento = true;

          if (!rutActual) {
            this.loSigue = false;
            this.cargandoSeguimiento = false;
            return;
          }

          this.usuarioSvc.verificaSiLoSigue(rutActual, perfil.rut!).subscribe({
            next: res => {
              this.loSigue = res.sigue;
              this.cargandoSeguimiento = false;
            },
            error: err => {
              console.error('Error al verificar seguimiento:', err);
              this.cargandoSeguimiento = false;
            }
          });
        } else {
          this.cargandoSeguimiento = false;
        }
      },
      error: err => {
        console.error('Error al obtener perfil por nombre:', err);
        this.router.navigate(['/']);
      }
    });
  }

  cargarFavoritos(rut: string) {
    this.usuarioSvc.getFavoritosIds(rut).subscribe({
      next: records => {
        const ids = records.map(r => r.peliculaId);

        if (!ids.length) {
          this.favoritos = [];
          return;
        }

        const peticiones = ids.map(id => this.tmdb.getMovieDetail(id));
        forkJoin(peticiones).subscribe({
          next: pelis => this.favoritos = pelis,
          error: err => console.error('Error detalles TMDb:', err)
        });
      },
      error: err => console.error('Error al obtener favoritos:', err)
    });
  }

  editarDescripcion() {
    this.nuevaDescripcion = this.perfil?.descripcion || '';
    this.editandoDescripcion = true;
  }

  guardarDescripcion() {
    if (!this.perfil) return;

    this.usuarioSvc.actualizarDescripcion(this.perfil.rut!, this.nuevaDescripcion).subscribe({
      next: () => {
        this.perfil!.descripcion = this.nuevaDescripcion;
        this.editandoDescripcion = false;
      },
      error: err => {
        console.error('Error al actualizar descripción:', err);
      }
    });
  }

  irAPelicula(peliculaId: number) {
    this.router.navigate(['/pelicula', peliculaId]);
  }

  async mostrarToastSesion() {
    const toast = await this.toastController.create({
      message: 'Debes iniciar sesión para seguir usuarios.',
      duration: 2500,
      color: 'warning',
      position: 'bottom',
    });
    await toast.present();
  }

  toggleSeguir() {
    if (!this.perfil) return;

    if (!this.auth.isLoggedIn()) {
      this.mostrarToastSesion();
      return;
    }

    const rutActual = this.auth.getUsuarioRut();
    if (!rutActual) {
      this.mostrarToastSesion();
      return;
    }

    this.cargandoSeguimiento = true;

    if (this.loSigue) {
      this.usuarioSvc.dejarDeSeguir(rutActual, this.perfil.rut!).subscribe({
        next: () => {
          this.loSigue = false;
          this.cargandoSeguimiento = false;
        },
        error: err => {
          console.error('Error al dejar de seguir:', err);
          this.cargandoSeguimiento = false;
        }
      });
    } else {
      this.usuarioSvc.seguirUsuario(rutActual, this.perfil.rut!).subscribe({
        next: () => {
          this.loSigue = true;
          this.cargandoSeguimiento = false;
        },
        error: err => {
          console.error('Error al seguir:', err);
          this.cargandoSeguimiento = false;
        }
      });
    }
  }
}
