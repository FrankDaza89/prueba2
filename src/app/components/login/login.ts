import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

interface LoginResponse {
  id: string;
  nombre: string;
  correo: string;
  mensaje: string;
}

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    MessageModule,
    PasswordModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly http = inject(HttpClient);

  protected readonly enviado = signal(false);
  protected readonly enviando = signal(false);
  protected readonly errorLogin = signal('');
  protected readonly nombreUsuario = signal('');
  protected readonly formulario = new FormGroup({
    correo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    clave: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    recordarme: new FormControl(false, { nonNullable: true }),
  });

  protected iniciarSesion(): void {
    this.enviado.set(false);
    this.errorLogin.set('');
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { correo, clave } = this.formulario.getRawValue();
    this.enviando.set(true);

    this.http.post<LoginResponse>('/api/auth/login', { correo, clave }).subscribe({
      next: (respuesta) => {
        this.nombreUsuario.set(respuesta.nombre);
        this.enviado.set(true);
        this.enviando.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.enviando.set(false);
        this.errorLogin.set(
          error.error?.mensaje ?? 'No fue posible iniciar sesión. Inténtalo nuevamente.',
        );
      },
    });
  }
}
