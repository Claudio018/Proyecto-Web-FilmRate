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
    // Lógica para iniciar sesión
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);

    //bd y validacion
    if (!this.username || !this.password) {
      alert('Por favor ingresa usuario y contraseña');
      return;
    }

    this.authService.login({ correo: this.username, contraseña: this.password }).subscribe({
      next: (res) => {
        alert('Login exitoso');
        // Aquí puedes guardar el token o info que recibas
        this.router.navigate(['/home']);  // o la ruta principal que tengas
      },
      error: (err) => {
        alert('Error de login: ' + (err.error.error || 'Credenciales incorrectas'));
      }
    });

  }



  ngOnInit() {
  }

}
