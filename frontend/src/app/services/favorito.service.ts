import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  private apiUrl = 'http://localhost:3000/favoritos';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  estaFavorito(peliculaId: number) {
    return this.http.get<{ esFavorito: boolean }>(
      `${this.apiUrl}/${peliculaId}`,
      { headers: this.getHeaders() }
    );
  }

  // Cambia el estado favorito agrega o quita de la película
  toggleFavorito(peliculaId: number, titulo: string) {
    return this.http.post(
      `${this.apiUrl}/${peliculaId}`,
      { titulo }, 
      { headers: this.getHeaders() }
    );
  }

  getFavoritosIds() {
    return this.http.get<{ peliculasFavoritasIds: number[] }>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }


}
