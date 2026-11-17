
import { Usuario } from '../models/usuario';

export function filtrarUsuarios(
  usuarios: Usuario[],
  busqueda: string
): Usuario[] {
  const texto = busqueda.trim().toLowerCase();

  return usuarios.filter(usuario =>
    usuario.name.toLowerCase().includes(texto)
  );
}
