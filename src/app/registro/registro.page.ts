import { Component } from '@angular/core';
import { UsuarioService } from '../api/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  user: any = {
    nombre: '',
    email: '',
    password: '',
    f_nacimiento: '',
    genero: ''
  };

  errores: any = {}; // Declarar la propiedad errores

  constructor(private usuarioService: UsuarioService) {}

  registrar() {
    // Resetear los errores al inicio de la validación
    this.errores = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Validaciones de los campos
    if (!this.user.nombre.trim()) {
      this.errores.nombre = 'El nombre es obligatorio.';
    }

    if (!this.user.email.trim() || !emailRegex.test(this.user.email)) {
      this.errores.email = 'El correo no es válido.';
    }

    if (!this.user.password.trim()) {
      this.errores.password = 'La contraseña es obligatoria.';
    }

    if (!this.user.f_nacimiento.trim()) {
      this.errores.f_nacimiento = 'La fecha de nacimiento es obligatoria.';
    }

    if (
      !this.user.genero ||
      !['Masculino', 'Femenino'].includes(this.user.genero.trim())
    ) {
      this.errores.genero = 'El género debe ser Masculino o Femenino.';
    }

    // Si hay errores, detener el proceso
    if (Object.keys(this.errores).length > 0) {
      console.log('Errores de validación:', this.errores);
      return;
    }

    // Llamada al servicio de registro
    this.usuarioService.registrarUsuario(this.user).subscribe(
      (res) => {
        console.log('Registro Exitoso', res);

        // Limpiar los campos después de un registro exitoso
        this.user = {
          nombre: '',
          email: '',
          password: '',
          f_nacimiento: '',
          genero: ''
        };
        this.errores = {}; // Limpiar errores
      },
      (err) => {
        console.log('Error en el registro', err);
      }
    );
  }
}
