
import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { Usuario } from './models/usuario';
import { UsuariosService } from './services/usuarios.service';
import { UsuarioTarjeta } from './components/usuario-tarjeta/usuario-tarjeta';
import { filtrarUsuarios } from './utils/filtrar-usuarios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UsuarioTarjeta],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private usuariosService = inject(UsuariosService);

  usuarios = signal<Usuario[]>([]);
  busqueda = signal('');
  cargando = signal(true);
  error = signal('');

  favoritos = signal<number[]>(this.leerFavoritos());

  usuariosFiltrados = computed(() =>
    filtrarUsuarios(this.usuarios(), this.busqueda())
  );

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando.set(true);
    this.error.set('');

    this.usuariosService.obtenerUsuarios().subscribe({
      next: (datos) => {
        const validos = Array.isArray(datos) && datos.every(u =>
          typeof u.id === 'number' &&
          typeof u.name === 'string' &&
          typeof u.email === 'string' &&
          typeof u.address?.city === 'string'
        );

        if (!validos) {
          this.error.set('Los datos recibidos no son válidos.');
          this.usuarios.set([]);
          return;
        }

        console.log('Usuarios recibidos:', datos);
        this.usuarios.set(datos);
      },

      error: () => {
        this.error.set('Error al cargar usuarios. Revisa tu conexión.');
        this.cargando.set(false);
      },

      complete: () => {
        this.cargando.set(false);
      }
    });
  }

  esFavorito(id: number): boolean {
    return this.favoritos().includes(id);
  }

  cambiarFavorito(id: number) {
    const actuales = this.favoritos();

    const nuevos = actuales.includes(id)
      ? actuales.filter(favorito => favorito !== id)
      : [...actuales, id];

    this.favoritos.set(nuevos);

    localStorage.setItem(
      'favoritos-angular',
      JSON.stringify(nuevos)
    );
  }

  limpiarFavoritos() {
    this.favoritos.set([]);
    localStorage.removeItem('favoritos-angular');
  }

  private leerFavoritos(): number[] {
    try {
      const datos = localStorage.getItem('favoritos-angular');
      const guardados = datos ? JSON.parse(datos) : [];

      return Array.isArray(guardados)
        ? guardados.filter(id => typeof id === 'number')
        : [];
    } catch {
      return [];
    }
  }
}
