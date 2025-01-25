import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  apiUrl = 'http://localhost:3000'; // Base URL de la API

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Función para registrar un usuario
  registrarUsuario(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, user, this.httpOptions);
  }

  // Función para iniciar sesión
  loginUsuario(user: any): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/usuarios?email=${user.email}&password=${user.password}`,
      this.httpOptions
    );
  }

  // Función para verificar si un correo ya está registrado
  verificarCorreo(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios?email=${email}`, this.httpOptions);
  }

  // Función para obtener los presupuestos de un usuario
  obtenerPresupuestos(email: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/presupuestos?usuarioEmail=${email}`,
      this.httpOptions
    );
  }

  // Función para obtener los presupuestos compartidos con un usuario
  obtenerPresupuestosCompartidos(email: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/presupuestos?compartidoCon_like=${email}`,
      this.httpOptions
    );
  }

  // Función para guardar un presupuesto
  guardarPresupuesto(presupuesto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/presupuestos`, presupuesto, this.httpOptions);
  }

  // Función para actualizar un presupuesto
  actualizarPresupuesto(presupuesto: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/presupuestos/${presupuesto.id}`,
      presupuesto,
      this.httpOptions
    );
  }

  // Función para crear un presupuesto inicial al registrar un usuario
  crearPresupuestoInicial(email: string): Observable<any> {
    const presupuestoInicial = {
      id: Date.now().toString(),
      nombre: 'Presupuesto Inicial',
      usuarioEmail: email,
      gastos: [],
      compartidoCon: [],
    };
    return this.guardarPresupuesto(presupuestoInicial);
  }

  // Función para eliminar un presupuesto por ID
  eliminarPresupuesto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/presupuestos/${id}`, this.httpOptions);
  }

  // Nueva función: Compartir un presupuesto con otro usuario
  compartirPresupuesto(presupuesto: any, email: string): Observable<any> {
    if (!presupuesto.compartidoCon) {
      presupuesto.compartidoCon = [];
    }
    if (!presupuesto.compartidoCon.includes(email)) {
      presupuesto.compartidoCon.push(email);
    }
    return this.actualizarPresupuesto(presupuesto);
  }

  // Nueva función: Obtener categorías desde el servidor
  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias`, this.httpOptions);
  }

  // Nueva función: Crear una nueva categoría
  crearCategoria(categoria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categorias`, categoria, this.httpOptions);
  }
}
