
import { describe, it, expect } from 'vitest';
import { filtrarUsuarios } from './filtrarUsuarios';

describe('Prueba de busqueda de usuarios', () => {

  it('debe encontrar un usuario por nombre', () => {

    const usuarios = [
      { id: 1, name: 'Ana Torres' },
      { id: 2, name: 'Luis Perez' }
    ];

    const resultado = filtrarUsuarios(usuarios, 'ANA');

    expect(resultado.length).toBe(1);
    expect(resultado[0].name).toBe('Ana Torres');

  });

});
