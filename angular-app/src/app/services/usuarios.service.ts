
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient);

  private url = 'https://jsonplaceholder.typicode.com/users';

  obtenerUsuarios() {
    return this.http.get<Usuario[]>(this.url);
  }
}
