import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmbdService } from '../../services/tmbd.service';
import { ResenaService } from '../../services/resena.service';
import { AuthService } from '../../services/auth.service';
import { FavoritoService } from '../../services/favorito.service';
import { LikeService } from '../../services/like.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.page.html',
  styleUrls: ['./pelicula.page.scss'],
  standalone: false
})
export class PeliculaPage implements ViewWillEnter {
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
    private favoritoService: FavoritoService,
    private likeService: LikeService
  ) {}

  ionViewWillEnter() {
    this.peliculaId = +this.route.snapshot.paramMap.get('id')!;
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadMovie();

    if (this.isLoggedIn) {
      this.checkFavorito();
    }

    this.loadResenasConLikes();
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
        this.trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
      }
    });
  }

  checkFavorito() {
    this.favoritoService.estaFavorito(this.peliculaId).subscribe((resp: any) => {
      this.esFavorito = resp.esFavorito;
    });
  }

  loadResenasConLikes() {
    this.resenaService.getResenasByPelicula(this.peliculaId).subscribe(data => {
      this.resenas = data.map((r: any) => ({
        id: r.resenaId,
        ...r,
        expandido: false,
        likesCount: 0,
        likedByUser: false,
        likesLoaded: false // flag para controlar carga
      }));

      if (this.isLoggedIn) {
        this.resenas.forEach((resena, index) => {
          this.likeService.getLikesInfo(resena.id).subscribe(likeInfo => {
            this.resenas[index].likesCount = likeInfo.likesCount;
            this.resenas[index].likedByUser = likeInfo.liked;
            this.resenas[index].likesLoaded = true;
          }, err => {
            // En caso de error, igual marcamos como cargado para no bloquear render
            this.resenas[index].likesLoaded = true;
          });
        });
      }
    });
  }

  toggleBanner() {
    this.bannerExpandido = !this.bannerExpandido;
  }

  irCrearResena() {
    this.router.navigate(['/crear-resena', this.peliculaId]);
  }

  toggleFavorito() {
    if (!this.isLoggedIn) return;
    const titulo = this.pelicula?.title || this.pelicula?.titulo;
    this.favoritoService.toggleFavorito(this.peliculaId, titulo).subscribe(() => {
      this.esFavorito = !this.esFavorito;
    });
  }

  toggleExpandir(index: number) {
    this.resenas[index].expandido = !this.resenas[index].expandido;
  }

  toggleLikeResena(index: number) {
    if (!this.isLoggedIn) return;

    const resena = this.resenas[index];

    const refrescarLikes = () => {
      this.likeService.getLikesInfo(resena.id).subscribe(likeInfo => {
        this.resenas[index].likesCount = likeInfo.likesCount;
        this.resenas[index].likedByUser = likeInfo.liked;
        this.resenas[index].likesLoaded = true;
      });
    };

    if (resena.likedByUser) {
      this.likeService.quitarLike(resena.id).subscribe(() => {
        refrescarLikes();
      });
    } else {
      this.likeService.darLike(resena.id).subscribe(() => {
        refrescarLikes();
      });
    }
  }
}
