import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

function clavesIguales(control: AbstractControl): ValidationErrors | null {
  const clave = control.get('clave')?.value;
  const confirmarClave = control.get('confirmarClave')?.value;
  return clave === confirmarClave ? null : { clavesDistintas: true };
}

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  private readonly http = inject(HttpClient);

  protected readonly registrado = signal(false);
  protected readonly registrando = signal(false);
  protected readonly errorRegistro = signal('');
  protected readonly mostrarClave = signal(false);

  protected readonly formulario = new FormGroup(
    {
      nombre: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      correo: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      clave: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
      confirmarClave: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      terminos: new FormControl(false, {
        nonNullable: true,
        validators: [Validators.requiredTrue],
      }),
    },
    { validators: clavesIguales },
  );

  protected crearCuenta(): void {
    this.registrado.set(false);
    this.errorRegistro.set('');
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { nombre, correo, clave } = this.formulario.getRawValue();
    this.registrando.set(true);

    this.http.post('/api/usuarios', { nombre, correo, clave }).subscribe({
      next: () => {
        this.registrado.set(true);
        this.registrando.set(false);
        this.formulario.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.registrando.set(false);
        this.errorRegistro.set(
          error.error?.mensaje ?? 'No fue posible crear la cuenta. Inténtalo nuevamente.',
        );
      },
    });
  }
}
