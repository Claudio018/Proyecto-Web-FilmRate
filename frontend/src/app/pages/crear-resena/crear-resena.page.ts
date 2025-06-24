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

  resenaForm!: FormGroup;
  submitting = false;

  busqueda = '';
  peliculasResult: PeliculaSimple[] = [];
  tituloSeleccionado = '';

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

    this.isLoggedIn = this.authService.isLoggedIn();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.peliculaIdSeleccionada = +id;
        // cargar detalle de la película
        this.tmbdService.getMovieDetail(this.peliculaIdSeleccionada)
          .subscribe({
            next: detail => this.tituloSeleccionado = detail.title,
            error: () => {
              console.error('Error al cargar detalle de película');
              alert('No se pudo cargar la información.');
            }
          });
      }
    });

    this.resenaForm = this.fb.group({
      texto: ['', [Validators.required, Validators.minLength(10)]],
      valoracion: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  irALogin() {
    this.router.navigate(['/inicio-sesion']);
  }

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
    usuarioRut: this.authService.getUsuarioRut(),
    titulo: this.tituloSeleccionado 
  };

  this.resenaService.crearResena(this.peliculaIdSeleccionada, nuevaResena)
    .subscribe({
      next: () => {
        alert('Reseña creada exitosamente');
        this.resenaForm.reset();
        this.valoracionSeleccionada = 0;
        this.submitting = false;
        this.router.navigate(['/pelicula', this.peliculaIdSeleccionada]);
      },
      error: err => {
        this.submitting = false;
        console.error('Error al crear reseña:', err);
        if (err.status === 404) {
          alert('No se encontró la película (404).');
        } else if (err.status === 500) {
          alert('Error interno del servidor (500). Intenta más tarde.');
        } else {
          alert('Error desconocido al crear la reseña.');
        }
      }
    });
}


  onSearchPeliculas(ev: any) {
    const texto = ev.target.value?.trim();
    if (texto.length >= 2) {
      this.tmbdService.searchMovies(texto).subscribe({
        next: res => this.peliculasResult = (res.results || []).map((m: any) => ({
          id: m.id, titulo: m.title
        })),
        error: err => console.error('Error al buscar películas:', err)
      });
    } else {
      this.peliculasResult = [];
    }
  }

  onBuscar() {
    if (this.peliculasResult.length === 1) {
      this.seleccionarPelicula(this.peliculasResult[0]);
    } else {
      console.log('Selecciona una película de la lista:', this.peliculasResult);
    }
  }

  onClearSearch() {
    this.busqueda = '';
    this.peliculasResult = [];
  }

  seleccionarPelicula(p: PeliculaSimple) {
    this.peliculaIdSeleccionada = p.id;
    this.tituloSeleccionado = p.titulo;
  }

  setValoracion(star: number) {
    this.valoracionSeleccionada = star;
    this.resenaForm.get('valoracion')!.setValue(star);
  }
}
