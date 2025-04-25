import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

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
    } else {
      this.registrarseForm.markAllAsTouched();
    }
  }
}