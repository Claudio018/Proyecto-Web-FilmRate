import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private apiUrl = 'http://localhost:3000/peliculas';

  constructor(private http: HttpClient) {}

  getResenasByPelicula(id: number) {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/resenas`);
  }
}
