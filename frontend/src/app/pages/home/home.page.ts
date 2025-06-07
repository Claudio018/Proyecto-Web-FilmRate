import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {
  usuarioNombre: string | null = null;

  constructor(public authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      this.usuarioNombre = this.authService.getUsuarioNombre();
    }
  }

  logout() {
    this.authService.logout();
    this.usuarioNombre = null;
  }
}
