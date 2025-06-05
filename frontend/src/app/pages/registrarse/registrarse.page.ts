import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
  standalone: false
})
export class RegistrarsePage implements OnInit {
  registrarseForm!: FormGroup;
  comunasPorRegion: { [key: string]: string[] } = {
    'Región 1': ['Comuna A', 'Comuna B'],
    'Región 2': ['Comuna C', 'Comuna D'],
    'Región 3': ['Comuna E', 'Comuna F']
  };
  regions: string[] = [];
  filteredComunas: string[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

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
    }, { validator: this.passwordMatchValidator });

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
      console.log(this.registrarseForm.value);
      const formData = this.registrarseForm.value;

      const userPayload = {
        nombre: formData.nombre,
        rut: formData.rut,
        correo: formData.correo,
        region: formData.region,
        comuna: formData.comuna,
        contrasena: formData.password,
      };

      this.authService.register(userPayload).subscribe({
      next: (res) => {
        alert('Registro exitoso');
        this.router.navigate(['/login']);  // redirigir al login tras registrarse
      },
      error: (err) => {
        alert('Error en registro: ' + err.error.error || 'Intenta nuevamente');
      }
    });
    } else {
      this.registrarseForm.markAllAsTouched();
    }
  }
}