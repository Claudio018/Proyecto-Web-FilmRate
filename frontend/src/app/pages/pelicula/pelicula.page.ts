import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmbdService } from '../../services/tmbd.service';
import { ResenaService } from '../../services/resena.service';
import { Router } from '@angular/router';


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

  bannerExpandido = false;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmbdService,
    private resenaService: ResenaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.peliculaId = +this.route.snapshot.paramMap.get('id')!;
    this.loadMovie();
  }

  loadMovie() {
    this.tmdbService.getMovieDetail(this.peliculaId).subscribe(data => {
      this.pelicula = data;
    });

    this.tmdbService.getMovieVideos(this.peliculaId).subscribe(data => {
      const videos = data.results;
      let trailer = videos.find((video: any) =>
        video.type === 'Trailer' && video.site === 'YouTube'
      );

      if (trailer) {
        this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
      } else {
        trailer = videos.find((video: any) => video.site === 'YouTube');
        if (trailer) {
          this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
        } else {
          this.trailerUrl = null;
        }
      }
    });

    this.resenaService.getResenasByPelicula(this.peliculaId).subscribe(data => {
      this.resenas = data;
    });
  }

  toggleBanner() {
    this.bannerExpandido = !this.bannerExpandido;
  }

  irCrearResena() {
    this.router.navigate(['/crear-resena', this.peliculaId]);
  }
}
