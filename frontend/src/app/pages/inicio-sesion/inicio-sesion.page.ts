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

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);

    if (!this.username || !this.password) {
      alert('Por favor ingresa usuario y contraseña');
      return;
    }

    this.authService.login({ nombre: this.username, contrasena: this.password }).subscribe({
      next: (res) => {
        alert('Login exitoso');
        //this.router.navigate(['/home']);  //redirigir a ventana
      },
      error: (err) => {
        alert('Error de login: ' + (err.error.error || 'Credenciales incorrectas'));
      }
    });

  }

  ngOnInit() {}
}
