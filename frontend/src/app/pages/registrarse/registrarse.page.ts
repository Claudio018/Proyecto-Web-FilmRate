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

  displayedErrorMessage: string = '';
  successMessage: string = '';

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
    this.displayedErrorMessage = '';
    this.successMessage = '';

    if (this.registrarseForm.invalid) {
      const controls = this.registrarseForm.controls;

      if (controls['nombre'].invalid) {
        this.displayedErrorMessage = 'El nombre es obligatorio.';
      } else if (controls['rut'].invalid) {
        this.displayedErrorMessage = 'El RUT es obligatorio.';
      } else if (controls['correo'].invalid) {
        if (controls['correo'].errors?.['required']) {
          this.displayedErrorMessage = 'El correo es obligatorio.';
        } else if (controls['correo'].errors?.['email']) {
          this.displayedErrorMessage = 'El correo no es válido.';
        }
      } else if (controls['region'].invalid) {
        this.displayedErrorMessage = 'Debes seleccionar una región.';
      } else if (controls['comuna'].invalid) {
        this.displayedErrorMessage = 'Debes seleccionar una comuna.';
      } else if (controls['password'].invalid) {
        this.displayedErrorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      } else if (controls['confirmPassword'].invalid || this.registrarseForm.hasError('mismatch')) {
        this.displayedErrorMessage = 'Las contraseñas no coinciden.';
      } else if (controls['terms'].invalid) {
        this.displayedErrorMessage = 'Debes aceptar los términos y condiciones.';
      }

      this.registrarseForm.markAllAsTouched();
      return;
    }

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
      next: () => {
        this.successMessage = `Usuario registrado: ${formData.nombre}`;
        this.displayedErrorMessage = '';
        setTimeout(() => {this.router.navigate(['../inicio-sesion']);}, 5000);
      },
      error: (err) => {
        this.displayedErrorMessage = err.error?.error || 'Error en el registro, intenta nuevamente.';
        this.successMessage = '';
      }
    });
  }
}
