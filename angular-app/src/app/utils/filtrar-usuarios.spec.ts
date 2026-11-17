
import { describe, it, expect } from 'vitest';
import { filtrarUsuarios } from './filtrar-usuarios';
import { Usuario } from '../models/usuario';

describe('Prueba de busqueda de usuarios', () => {

  it('debe encontrar un usuario por nombre', () => {

    const usuarios: Usuario[] = [
      {
        id: 1,
        name: 'Ana Torres',
        email: 'ana@correo.com',
        address: { city: 'Cuenca' }
      },
      {
        id: 2,
        name: 'Luis Perez',
        email: 'luis@correo.com',
        address: { city: 'Quito' }
      }
    ];

    const resultado = filtrarUsuarios(usuarios, 'ANA');

    expect(resultado.length).toBe(1);
    expect(resultado[0].name).toBe('Ana Torres');

  });

});
