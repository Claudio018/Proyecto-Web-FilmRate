import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmbdService } from '../../services/tmbd.service';
import { ResenaService } from '../../services/resena.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.page.html',
  styleUrls: ['./pelicula.page.scss'],
  standalone: false
})
export class PeliculaPage implements OnInit {
  peliculaId!: number;
  pelicula: any = null;
  trailerUrl: string | null = null;
  resenas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmbdService,
    private resenaService: ResenaService
  ) {}

  ngOnInit() {
    this.peliculaId = +this.route.snapshot.paramMap.get('id')!;
    this.loadMovie();
  }

  loadMovie() {
    // Detalle de la película
    this.tmdbService.getMovieDetail(this.peliculaId).subscribe(data => {
      this.pelicula = data;
    });

    // Obtener videos
    this.tmdbService.getMovieVideos(this.peliculaId).subscribe(data => {
      const videos = data.results;

      let trailer = videos.find((video: any) =>
        video.type === 'Trailer' && video.site === 'YouTube'
      );

      if (trailer) {
        this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
        console.log('Se cargó el tráiler desde YouTube (tipo: Trailer):', trailer.name);
      } else {
        trailer = videos.find((video: any) => video.site === 'YouTube');
        if (trailer) {
          this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
          console.log('No se encontró un tráiler, pero se cargó otro video de YouTube:', trailer.name);
        } else {
          this.trailerUrl = null;
          console.warn('No se encontró ningún video disponible para esta película.');
        }
      }
    });

    // Obtener reseñas
    this.resenaService.getResenasByPelicula(this.peliculaId).subscribe(data => {
      this.resenas = data;
    });
  }
}
