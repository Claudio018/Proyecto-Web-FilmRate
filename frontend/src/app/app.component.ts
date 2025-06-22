import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {}
  ngOnInit() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Aplicar el modo actual al cargar
    this.updateDarkMode(darkModeMediaQuery.matches);

    // Escuchar cambios en tiempo real
    darkModeMediaQuery.addEventListener('change', (event) => {
      this.updateDarkMode(event.matches);
    });
  }

  updateDarkMode(isDarkMode: boolean) {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }


}
