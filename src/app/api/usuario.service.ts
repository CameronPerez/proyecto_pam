import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl = 'https://71923649-e30a-4ac4-8def-5ff668b2a6c9-00-pgx9yevv9hdc.picard.replit.dev';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Ortografía corregida
    })
  };

  constructor(private http:HttpClient) { }

  registrarUsuario(user:any): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/usuario`, user, this.httpOptions);
  }
}
