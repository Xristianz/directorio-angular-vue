
import { Component, input, output } from '@angular/core';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuario-tarjeta',
  standalone: true,
  templateUrl: './usuario-tarjeta.html',
  styleUrl: './usuario-tarjeta.css'
})
export class UsuarioTarjeta {
  usuario = input.required<Usuario>();
  favorito = input<boolean>(false);

  alternarFavorito = output<number>();

  marcarFavorito() {
    this.alternarFavorito.emit(this.usuario().id);
  }
}
