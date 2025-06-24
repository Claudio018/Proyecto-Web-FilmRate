import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  baseUrl = 'http://localhost:3000/peliculas/likes';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders | undefined {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
  }

  darLike(resenaId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/${resenaId}`, {}, { headers }); 
  }

  quitarLike(resenaId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/${resenaId}`, { headers });
  }

  getLikesInfo(resenaId: number): Observable<{ liked?: boolean; likesCount: number }> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<{ liked: boolean; likesCount: number }>(`${this.baseUrl}/${resenaId}`, { headers });
    } else {
      // Llamada pública sin headers
      return this.http.get<{ likesCount: number }>(`${this.baseUrl}/public/${resenaId}`);
    }
  }

}
