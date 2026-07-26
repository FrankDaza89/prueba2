import { Component, signal } from '@angular/core';
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
  protected readonly registrado = signal(false);
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
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }


    // codigo para registro 
    this.registrado.set(true);
    console.log('Registro:', this.formulario.getRawValue());
  }
}
