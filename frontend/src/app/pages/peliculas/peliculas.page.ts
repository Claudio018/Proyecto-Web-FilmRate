import { Component, OnInit } from '@angular/core';
import { TmbdService } from '../../services/tmbd.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
  standalone:false
})
export class PeliculasPage implements OnInit {
  peliculas: any[] = [];
  searchQuery: string = '';

  constructor(private tmdbService: TmbdService) {}

  ngOnInit() {
    this.loadPopular();
  }

  loadPopular() {
    this.tmdbService.getPopularMovies().subscribe(data => {
      this.peliculas = data.results;
    });
  }

  search() {
    if (!this.searchQuery.trim()) {
      this.loadPopular();
      return;
    }
    this.tmdbService.searchMovies(this.searchQuery).subscribe(data => {
      this.peliculas = data.results;
    });
  }
}
