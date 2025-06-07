import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResenaService } from '../../services/resena.service';
import { TmbdService } from '../../services/tmbd.service';

interface PeliculaSimple {
  id: number;
  titulo: string;
}

@Component({
  selector: 'app-crear-resena',
  templateUrl: './crear-resena.page.html',
  styleUrls: ['./crear-resena.page.scss'],
  standalone: false
})
export class CrearResenaPage implements OnInit {
  isLoggedIn = false;
  peliculaIdSeleccionada: number | null = null;

  // Formulario reactivo
  resenaForm!: FormGroup;
  submitting = false;

  // Búsqueda de películas
  busqueda: string = '';
  peliculasResult: PeliculaSimple[] = [];
  tituloSeleccionado: string = '';

  // Valoración por estrellas
  valoracionSeleccionada = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private resenaService: ResenaService,
    private tmbdService: TmbdService
  ) {}

  ngOnInit() {
    // Estado de autenticación
    this.isLoggedIn = this.authService.isLoggedIn();

    // Leer parámetro de película (si viene por queryParams)
    this.route.queryParams.subscribe(params => {
      const id = params['peliculaId'];
      if (id) {
        this.peliculaIdSeleccionada = +id;
        // Cargar título desde TMDb
        this.tmbdService.getMovieDetail(this.peliculaIdSeleccionada)
          .subscribe(detail => {
            this.tituloSeleccionado = detail.title;
          });
      }
    });

    // Inicializar el formulario
    this.resenaForm = this.fb.group({
      texto: ['', [Validators.required, Validators.minLength(10)]],
      valoracion: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  /** Navegar al login */
  irALogin() {
    this.router.navigate(['/inicio-sesion']);
  }

  /** Enviar reseña al backend */
  enviarResena() {
    if (!this.isLoggedIn) {
      this.irALogin();
      return;
    }
    if (!this.peliculaIdSeleccionada) {
      alert('No se ha seleccionado una película.');
      return;
    }
    if (this.resenaForm.invalid) {
      this.resenaForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const nuevaResena = {
      texto: this.resenaForm.value.texto,
      valoracion: this.resenaForm.value.valoracion,
      usuarioRut: this.authService.getUsuarioRut()
    };

    this.resenaService
      .crearResena(this.peliculaIdSeleccionada, nuevaResena)
      .subscribe({
        next: () => {
          alert('Reseña creada exitosamente');
          this.resenaForm.reset();
          this.valoracionSeleccionada = 0;
          this.submitting = false;
          this.router.navigate(['/detalle-pelicula'], {
            queryParams: { peliculaId: this.peliculaIdSeleccionada }
          });
        },
        error: (err) => {
          console.error(err);
          alert('Error al crear la reseña');
          this.submitting = false;
        }
      });
  }

  /** Manejar input del searchbar */
  onSearchPeliculas(ev: any) {
    const texto = ev.target.value?.trim();
    if (texto && texto.length >= 2) {
      this.tmbdService.searchMovies(texto)
        .subscribe(res => {
          this.peliculasResult = (res.results || []).map((m: any) => ({
            id: m.id,
            titulo: m.title
          }));
        });
    } else {
      this.peliculasResult = [];
    }
  }

  /** Ejecutar búsqueda (botón) */
  onBuscar() {
    if (this.peliculasResult.length === 1) {
      this.seleccionarPelicula(this.peliculasResult[0]);
    } else {
      // Aquí podrías abrir un modal o dropdown para elegir entre varios resultados
      console.log('Mostrar lista de opciones:', this.peliculasResult);
    }
  }

  /** Limpiar searchbar */
  onClearSearch() {
    this.busqueda = '';
    this.peliculasResult = [];
  }

  /** Seleccionar película de la lista */
  seleccionarPelicula(p: PeliculaSimple) {
    this.peliculaIdSeleccionada = p.id;
    this.tituloSeleccionado = p.titulo;
  }

  /** Ajustar rating por estrellas */
  setValoracion(star: number) {
    this.valoracionSeleccionada = star;
    this.resenaForm.get('valoracion')?.setValue(star);
  }
}
