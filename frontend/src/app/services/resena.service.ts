import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private apiUrl = 'http://localhost:3000/peliculas';

  constructor(private http: HttpClient) {}

  getResenasByPelicula(id: number) {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

    return this.http.get<any[]>(`${this.apiUrl}/${id}/resenas`, { headers });
  }

  crearResena(peliculaId: number, resenaData: any) {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

    return this.http.post(`${this.apiUrl}/${peliculaId}/resenas`, resenaData, { headers });
  }
}
