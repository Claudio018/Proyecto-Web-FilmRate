import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmbdService } from '../../services/tmbd.service';
import { ResenaService } from '../../services/resena.service';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { FavoritoService } from '../../services/favorito.service';




@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.page.html',
  styleUrls: ['./pelicula.page.scss'],
  standalone: false
})
export class PeliculaPage implements OnInit {

  ionViewWillEnter() {
    this.peliculaId = +this.route.snapshot.paramMap.get('id')!;
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadMovie();

    if (this.isLoggedIn) {
      this.checkFavorito();
    }
    this.resenaService.getResenasByPelicula(this.peliculaId).subscribe(data => {
      this.resenas = data;
    });
  }

  isLoggedIn: boolean = false;
  esFavorito: boolean = false;

  peliculaId!: number;
  pelicula: any = null;
  trailerUrl: string | null = null;
  resenas: any[] = [];

  bannerExpandido = false;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmbdService,
    private resenaService: ResenaService,
    private router: Router,
    private authService: AuthService,
    private favoritoService: FavoritoService
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

  checkFavorito() {
    this.favoritoService.estaFavorito(this.peliculaId).subscribe((resp: any) => {
      this.esFavorito = resp.esFavorito;
    });
  }

  toggleFavorito() {
  if (!this.isLoggedIn) return;

  const titulo = this.pelicula?.titulo ;

  this.favoritoService.toggleFavorito(this.peliculaId, titulo).subscribe(() => {
    this.esFavorito = !this.esFavorito;  // cambia el estado local al contrario
  });
}




}
