import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resena } from '../models/Resena';  


@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private apiUrl = 'http://localhost:3000/peliculas';

  constructor(private http: HttpClient) {}

  getResenasByPelicula(id: number) {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

    return this.http.get<Resena[]>(`${this.apiUrl}/${id}/resenas`, { headers });
  }

  crearResena(peliculaId: number, resenaData: any) {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

    return this.http.post<Resena>(`${this.apiUrl}/${peliculaId}/resenas`, resenaData, { headers });
  }

  getTodasResenas() {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

    return this.http.get<Resena[]>(`${this.apiUrl}/todas`, { headers });

  }
}
