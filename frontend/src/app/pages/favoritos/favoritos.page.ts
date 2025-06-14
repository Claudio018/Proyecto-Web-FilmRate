import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FavoritoService } from '../../services/favorito.service';
import { TmbdService } from '../../services/tmbd.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false
})
export class FavoritosPage implements OnInit {
  isLoggedIn = false;
  favoritos: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private favoritoService: FavoritoService,
    private tmdbService: TmbdService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ionViewWillEnter() {
    if (this.isLoggedIn) {
      this.cargarFavoritos();
    }
  }

  cargarFavoritos() {
    this.favoritoService.getFavoritosIds().subscribe(resp => {
      const peliculaIds = resp.peliculasFavoritasIds;

      this.favoritos = [];

      peliculaIds.forEach(id => {
        this.tmdbService.getMovieDetail(id).subscribe(pelicula => {
          this.favoritos.push(pelicula);
        });
      });
    });
  }

  irAPelicula(id: number) {
    this.router.navigate(['/pelicula', id]);
  }

  irALogin() {
    this.router.navigate(['/inicio-sesion']);
  }
}
