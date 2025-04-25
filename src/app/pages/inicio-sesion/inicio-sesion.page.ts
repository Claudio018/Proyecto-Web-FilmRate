import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    // Lógica para iniciar sesión
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
  }



  ngOnInit() {
  }

}
