import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrarService } from 'src/app/services/registrar.service';
import { Registrar } from 'src/app/models/registrar';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
  standalone: false
})
export class RegistrarsePage implements OnInit {
  registrarseForm!: FormGroup;

  comunasPorRegion: { [key: string]: string[] } = {
    'Región Metropolitana': ['Santiago', 'Puente Alto', 'Maipú'],
    'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué'],
    'Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles']
  };

  regions: string[] = [];
  filteredComunas: string[] = [];

  constructor(
    private fb: FormBuilder,
    private registrarService: RegistrarService
  ) {}

  ngOnInit() {
    this.registrarseForm = this.fb.group({
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      comuna: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });

    this.regions = Object.keys(this.comunasPorRegion);
  }

  onRegionChange(region: string) {
    this.filteredComunas = this.comunasPorRegion[region] || [];
    this.registrarseForm.get('comuna')?.setValue('');
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.registrarseForm.valid) {
      const datos: Registrar = {
        nombre: this.registrarseForm.value.nombre,
        rut: this.registrarseForm.value.rut,
        correo: this.registrarseForm.value.correo,
        region: this.registrarseForm.value.region,
        comuna: this.registrarseForm.value.comuna,
        password: this.registrarseForm.value.password,
        confirmPassword: this.registrarseForm.value.confirmPassword,
        terms: this.registrarseForm.value.terms
      };

      this.registrarService.register(datos).subscribe({
        next: (res) => {
          console.log('Registro exitoso:', res);
          // Aquí puedes redirigir, mostrar un mensaje o limpiar el formulario
        },
        error: (err) => {
          console.error('Error en registro:', err.error?.message || err.message);
        }
      });

    } else {
      this.registrarseForm.markAllAsTouched();
    }
  }
}
