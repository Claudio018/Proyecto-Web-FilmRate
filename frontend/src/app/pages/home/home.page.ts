import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {
  usuarioNombre: string | null = null;
  esModerador = false;

  usuarios: Usuario[] = [];
  usuarioSeleccionadoNombre = '';

  constructor(
    public authService: AuthService,
    private usuarioSvc: UsuarioService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    if (this.authService.isLoggedIn()) {
      this.usuarioNombre = this.authService.getUsuarioNombre();
      this.esModerador = this.authService.isModerador();

      if (this.esModerador) {
        this.usuarioSvc.getTodosLosUsuarios().subscribe({
          next: usuarios => {
            this.usuarios = usuarios;
          },
          error: err => {
            console.error('Error al cargar usuarios:', err);
          }
        });
      }
    } else {
      this.usuarioNombre = null;
      this.esModerador = false;
    }
  }

  irAlPerfil() {
    if (this.usuarioSeleccionadoNombre) {
      this.router.navigate(['/perfil', this.usuarioSeleccionadoNombre]);
    }
  }

  logout() {
    this.authService.logout();
    this.usuarioNombre = null;
    this.esModerador = false;
  }
}
