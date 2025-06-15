import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { TmbdService } from '../../services/tmbd.service';
import { Usuario } from '../../models/usuario';
import { Estadisticas } from '../../models/estadisticas';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  perfil?: Usuario;
  favoritos: any[] = [];
  stats?: Estadisticas;
  cargando = true;

  // Nuevas propiedades
  esMiPerfil = false;
  editandoDescripcion = false;
  nuevaDescripcion = '';

  constructor(
    private usuarioSvc: UsuarioService,
    private auth: AuthService,
    private tmdb: TmbdService
  ) {}

  ngOnInit() {
    const rut = this.auth.getUsuarioRut();
    if (!rut) return;

    // 1) Perfil
    this.usuarioSvc.getPerfil(rut).subscribe({
      next: perfil => {
        this.perfil = perfil;
        this.nuevaDescripcion = perfil.descripcion || '';

        const rutActual = this.auth.getUsuarioRut();
        console.log('rut actual:', rutActual);
        console.log('rut perfil:', perfil.rut);
        this.esMiPerfil = rutActual === perfil.rut;
        console.log('esMiPerfil:', this.esMiPerfil);
      },
      error: err => console.error('Error al cargar perfil:', err)
    });

    // 2) Favoritos
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

    // 3) Estadísticas
    this.usuarioSvc.getEstadisticas(rut).subscribe({
      next: est => {
        this.stats = est;
        this.cargando = false;
      },
      error: err => {
        console.error('Error al cargar estadísticas:', err);
        this.cargando = false;
      }
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
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    });
  }

}
