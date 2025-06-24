import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  
  private loggedInSubject = new BehaviorSubject<boolean>(this.tieneTokenValido());
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  // REGISTRO
  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // LOGIN
  login(credentials: any) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.loggedInSubject.next(true);  // <- Emitir nuevo estado
        })
      );
  }

  // LOGOUT
  logout() {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);  // <- Emitir nuevo estado
  }

  // TOKEN
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // VERIFICAR LOGIN 
  isLoggedIn(): boolean {
    return this.tieneTokenValido();
  }

  private tieneTokenValido(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  // GETTERS 
  getUsuarioRut(): string | null {
    return this.extraerCampoDelToken('rut');
  }

  getUsuarioNombre(): string | null {
    return this.extraerCampoDelToken('nombre');
  }

  isModerador(): boolean {
    return this.extraerCampoDelToken('esModerador') === true;
  }

  private extraerCampoDelToken(campo: string): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload[campo];
    } catch {
      return null;
    }
  }
}
