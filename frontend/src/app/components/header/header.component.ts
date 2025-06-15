import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({ 
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  usuarioNombre?: string| null;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
            this.usuarioNombre = this.authService.getUsuarioNombre();

    }
  }
}
