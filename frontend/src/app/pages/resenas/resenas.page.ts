import { Component, OnInit } from '@angular/core';
import { TmbdService } from '../../services/tmbd.service';
import { ResenaService } from '../../services/resena.service';
import { Resena } from 'src/app/models/Resena';

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
    private resenaService: ResenaService
  ) {}

  ngOnInit() {
    this.cargarResenasConDetalles();
  }

  async cargarResenasConDetalles() {
    try {
      const resenasBackend: Resena[] = await this.resenaService.getTodasResenas().toPromise() ?? [];

      // Para cada reseña, obtener el detalle de su película
      const resenasConDetalles = await Promise.all(
        resenasBackend.map(async (resena) => {
          const detallePelicula = await this.tmbdService.getMovieDetail(resena.peliculaId).toPromise();

          return {
            ...resena,
            estrellas: Number(resena.valoracion) || 0,
            comentario: resena.texto,
            usuario: { username: resena.usuario },
            pelicula: detallePelicula,
            created_at: resena.createdAt,
            updated_at: resena.updatedAt
          };
        })
      );

      this.resenas = resenasConDetalles;

    } catch (error) {
      console.error('Error cargando reseñas o detalles:', error);
    }
  }

}
