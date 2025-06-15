import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Estadisticas } from '../models/estadisticas';

interface FavoritoRecord {
  usuarioRut: string;
  peliculaId: number;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  }

  getPerfil(rut: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.apiUrl}/perfil/${rut}`,
      { headers: this.getHeaders() }
    );
  }

  // Ahora devolvemos el tipo real que devuelve tu backend
  getFavoritosIds(rut: string): Observable<FavoritoRecord[]> {
    return this.http.get<FavoritoRecord[]>(
      `${this.apiUrl}/perfil/${rut}/favoritos`,
      { headers: this.getHeaders() }
    );
  }

  getEstadisticas(rut: string): Observable<Estadisticas> {
    return this.http.get<Estadisticas>(
      `${this.apiUrl}/perfil/${rut}/estadisticas`,
      { headers: this.getHeaders() }
    );
  }

  actualizarDescripcion(rut: string, descripcion: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/perfil/${rut}`,
      { descripcion },
      { headers: this.getHeaders() }
    );
  }

  getPerfilPorNombre(nombre: string) {
    return this.http.get<Usuario>(`${this.apiUrl}/usuario/nombre/${nombre}`);
  }

  seguirUsuario(seguidorRut: string, seguidoRut: string) {
    return this.http.post(
      `${this.apiUrl}/seguimiento/${seguidorRut}/seguir/${seguidoRut}`,
      {},
      { headers: this.getHeaders() }
    );
  }

  dejarDeSeguir(seguidorRut: string, seguidoRut: string) {
    return this.http.delete(
      `${this.apiUrl}/seguimiento/usuarios/${seguidorRut}/dejar/${seguidoRut}`,
      { headers: this.getHeaders() }
    );
  }

  verificaSiLoSigue(seguidorRut: string, seguidoRut: string) {
    return this.http.get<{ sigue: boolean }>(
      `${this.apiUrl}/seguimiento/${seguidorRut}/seguido/${seguidoRut}`,
      { headers: this.getHeaders() }
    );
  }

  suspenderCuenta(rut: string) {
    return this.http.put(
      `${this.apiUrl}/moderador/usuarios/${rut}/suspender`,
      {},
      { headers: this.getHeaders() }
    );
  }

  quitarSuspensionCuenta(rut: string) {
    return this.http.put(
      `${this.apiUrl}/moderador/usuarios/${rut}/quitar-suspension`,
      {},
      { headers: this.getHeaders() }
    );
  }

  eliminarCuenta(rut: string) {
    return this.http.delete(
      `${this.apiUrl}/moderador/usuarios/${rut}`,
      { headers: this.getHeaders() }
    );
  }
  getTodosLosUsuarios() {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuario`, {
      headers: this.getHeaders()
    });
  } 
}
