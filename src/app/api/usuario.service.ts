import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl = 'http://localhost:3000'; // Cambia a la URL correcta de tu API

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Ortografía corregida
    })
  };

  constructor(private http: HttpClient) { }

  // Método para registrar un usuario
  registrarUsuario(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, user, this.httpOptions);
  }

  // Método para iniciar sesión
  loginUsuario(user: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios?email=${user.email}&password=${user.password}`, this.httpOptions);
  }
}
