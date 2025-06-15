import { Component, OnInit } from '@angular/core';
import { TmbdService } from '../../services/tmbd.service';
import { ResenaService } from '../../services/resena.service';
import { Resena } from 'src/app/models/Resena';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.page.html',
  styleUrls: ['./resenas.page.scss'],
  standalone: false
})
export class ResenasPage implements OnInit {
  resenas: any[] = [];

  constructor(
    private tmbdService: TmbdService,
    private resenaService: ResenaService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.cargarResenasConDetalles();
  }

  async cargarResenasConDetalles() {
    try {
      const resenasBackend: Resena[] = await this.resenaService.getTodasResenas().toPromise() ?? [];

      const resenasConDetalles = await Promise.all(
        resenasBackend.map(async (resena) => {
          const detallePelicula = await this.tmbdService.getMovieDetail(resena.peliculaId).toPromise();

          return {
            ...resena,
            estrellas: Number(resena.valoracion) || 0,
            comentario: resena.texto,
            usuario: { username: resena.usuario },
            usuarioRut: resena.usuarioRut,   // <-- agregamos usuarioRut aquí
            pelicula: detallePelicula,
            created_at: resena.createdAt,
            updated_at: resena.updatedAt,
            expandido: false
          };
        })
      );

      this.resenas = resenasConDetalles;

    } catch (error) {
      console.error('Error cargando reseñas o detalles:', error);
    }
  }

  toggleExpandir(index: number) {
    this.resenas[index].expandido = !this.resenas[index].expandido;
  }

  irAlPerfil(nombreUsuario?: string) {
    if (!nombreUsuario) return;
    this.router.navigate(['/perfil', nombreUsuario]);
  }
}
