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
        this.mensaje = 'Inicio de sesión exitoso';
        // Redirigir 
        setTimeout(() => { this.router.navigate(['/home']); }, 1500);
      },
      error: (err) => {
        this.mensajeColor = 'danger';
        // Mostrar el mensaje de error enviado desde backend 
        if (err.error && err.error.error) {
          this.mensaje = err.error.error;
        } else {
          this.mensaje = 'Error desconocido al iniciar sesión';
        }
      }
    });
  }

  ngOnInit() {}
}
