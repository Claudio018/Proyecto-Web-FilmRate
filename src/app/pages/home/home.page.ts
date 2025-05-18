import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})

export class HomePage {
  movies = Array(18).fill({
    title: 'Marvel Avengers',
    image: 'https://via.placeholder.com/200x300.png?text=Poster' 
  });
}
