import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // URL backend

  constructor(private http: HttpClient) { }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);  // Guardar token
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsuarioRut(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rut || null;
    } catch {
      return null;
    }
  }

  getUsuarioNombre(): string | null {
  const token = this.getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.nombre || null;  // Ajusta 'nombre' según tu token
  } catch {
    return null;
  }
}

}