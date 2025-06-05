import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
  standalone: false
})
export class InicioSesionPage implements OnInit {

  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  mensaje: string = ''; 
  mensajeColor: 'success' | 'danger' = 'danger'; 

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.mensaje = ''; // Limpiar mensaje 

    if (!this.username || !this.password) {
      this.mensajeColor = 'danger';
      this.mensaje = 'Por favor ingresa usuario y contraseña';
      return;
    }

    this.authService.login({ nombre: this.username, contrasena: this.password }).subscribe({
      next: (res) => {
        this.mensajeColor = 'success';
        this.mensaje = 'Inicio sesion exitoso';
        setTimeout(() => {this.router.navigate(['/home']);}, 5000);
      },
      error: (err) => {
        this.mensajeColor = 'danger';
        this.mensaje = (err.error.error);
      }
    });
  }

  ngOnInit() {}
}
