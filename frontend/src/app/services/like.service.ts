import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  // baseUrl apunta a /peliculas para coincidir con backend
  baseUrl = 'http://localhost:3000/peliculas/likes';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders | undefined {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
  }

  darLike(resenaId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/${resenaId}`, {}, { headers }); // aquí sin /dar-like
  }

  quitarLike(resenaId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/${resenaId}`, { headers });
  }

  getLikesInfo(resenaId: number): Observable<{ liked: boolean; likesCount: number }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ liked: boolean; likesCount: number }>(`${this.baseUrl}/${resenaId}`, { headers });
  }

}
