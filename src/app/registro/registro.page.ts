import { Component } from '@angular/core';
import { UsuarioService } from '../api/usuario.service';
import { Router } from '@angular/router';

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
    genero: '',
  };

  errores: any = {};

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  registrar() {
    this.errores = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!this.user.nombre.trim()) this.errores.nombre = 'El nombre es obligatorio.';
    if (!this.user.email.trim() || !emailRegex.test(this.user.email))
      this.errores.email = 'El correo no es válido.';
    if (!this.user.password.trim()) this.errores.password = 'La contraseña es obligatoria.';
    if (!this.user.f_nacimiento.trim())
      this.errores.f_nacimiento = 'La fecha de nacimiento es obligatoria.';
    if (!this.user.genero || !['Masculino', 'Femenino'].includes(this.user.genero.trim()))
      this.errores.genero = 'El género debe ser Masculino o Femenino.';

    if (Object.keys(this.errores).length > 0) return;

    this.usuarioService.verificarCorreo(this.user.email).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.errores.emailDuplicado = 'El correo ya está registrado.';
        return;
      }

      this.usuarioService.registrarUsuario(this.user).subscribe((resUsuario: any) => {
        this.usuarioService.crearPresupuestoInicial(this.user.email).subscribe(
          (resPresupuesto: any) => {
            console.log('Presupuesto inicial creado:', resPresupuesto);
          },
          (err: any) => console.error('Error al crear el presupuesto inicial:', err)
        );

        this.user = { nombre: '', email: '', password: '', f_nacimiento: '', genero: '' };
        this.errores = {};
        this.router.navigate(['/login']); // Navegar al login después del registro
      });
    });
  }

  volver() {
    this.router.navigate(['/login']);
  }
}
