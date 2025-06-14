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
      next: perfil => this.perfil = perfil,
      error: err => console.error('Error al cargar perfil:', err)
    });

    // 2) Favoritos (ahora obtenemos un array de objetos con peliculaId)
    this.usuarioSvc.getFavoritosIds(rut).subscribe({
      next: records => {
        // Extraemos los IDs numéricos
        const ids = records.map(r => r.peliculaId);

        if (!ids.length) {
          this.favoritos = [];
          return;
        }

        // Pedimos detalles de cada película
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
}
