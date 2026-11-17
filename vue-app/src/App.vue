
<script setup>
import { ref, computed, onMounted } from 'vue';
import UserCard from './components/UserCard.vue';
import { filtrarUsuarios } from './utils/filtrarUsuarios';

const API = 'https://jsonplaceholder.typicode.com/users';

const usuarios = ref([]);
const busqueda = ref('');
const cargando = ref(true);
const error = ref('');

const favoritos = ref(leerFavoritos());

const usuariosFiltrados = computed(() =>
  filtrarUsuarios(usuarios.value, busqueda.value)
);

function leerFavoritos() {
  try {
    const datos = localStorage.getItem('favoritos-vue');
    const guardados = datos ? JSON.parse(datos) : [];

    return Array.isArray(guardados)
      ? guardados.filter(id => typeof id === 'number')
      : [];
  } catch {
    return [];
  }
}

async function cargarUsuarios() {
  cargando.value = true;
  error.value = '';

  try {
    const respuesta = await fetch(API);

    if (!respuesta.ok) {
      throw new Error('Error HTTP: ' + respuesta.status);
    }

    const datos = await respuesta.json();

    const validos = Array.isArray(datos) && datos.every(u =>
      typeof u.id === 'number' &&
      typeof u.name === 'string' &&
      typeof u.email === 'string' &&
      typeof u.address?.city === 'string'
    );

    if (!validos) {
      throw new Error('Los datos recibidos no son validos');
    }

    console.log('Usuarios recibidos:', datos);
    usuarios.value = datos;

  } catch (e) {
    console.error('Error al consultar la API:', e);
    error.value = 'Error al cargar usuarios. Revisa tu conexion.';
    usuarios.value = [];

  } finally {
    cargando.value = false;
  }
}

function cambiarFavorito(id) {
  const actuales = favoritos.value;

  const nuevos = actuales.includes(id)
    ? actuales.filter(favorito => favorito !== id)
    : [...actuales, id];

  favoritos.value = nuevos;

  localStorage.setItem(
    'favoritos-vue',
    JSON.stringify(nuevos)
  );
}

function limpiarFavoritos() {
  favoritos.value = [];
  localStorage.removeItem('favoritos-vue');
}

onMounted(() => {
  cargarUsuarios();
});
</script>

<template>
  <main class="contenedor">

    <h1>Directorio de Usuarios</h1>
    <p>Aplicación realizada con Vue</p>

    <section class="controles">

      <div>
        <label for="busqueda">Buscar usuario:</label>

        <input
          id="busqueda"
          type="text"
          placeholder="Escribe un nombre..."
          v-model="busqueda"
        />
      </div>

      <div class="favoritos">
        <strong>Favoritos: {{ favoritos.length }}</strong>

        <button
          type="button"
          @click="limpiarFavoritos">
          Limpiar favoritos
        </button>
      </div>

    </section>

    <p v-if="cargando" role="status">
      Cargando...
    </p>

    <div v-else-if="error" class="error" role="alert">
      <p>{{ error }}</p>

      <button type="button" @click="cargarUsuarios">
        Reintentar
      </button>
    </div>

    <template v-else>

      <p>
        Mostrando {{ usuariosFiltrados.length }}
        de {{ usuarios.length }} usuarios
      </p>

      <section class="lista">

        <UserCard
          v-for="usuario in usuariosFiltrados"
          :key="usuario.id"
          :usuario="usuario"
          :favorito="favoritos.includes(usuario.id)"
          @alternar-favorito="cambiarFavorito"
        />

        <p v-if="usuariosFiltrados.length === 0">
          No se encontraron usuarios.
        </p>

      </section>

    </template>

  </main>
</template>

<style scoped>
.contenedor {
  max-width: 1000px;
  margin: 35px auto;
  padding: 20px;
}

h1 {
  color: #253858;
  margin-bottom: 5px;
}

.controles {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  width: 250px;
  max-width: 100%;
}

.favoritos {
  display: flex;
  align-items: center;
  gap: 12px;
}

button {
  padding: 9px 12px;
  cursor: pointer;
  border: 1px solid #bbb;
  border-radius: 5px;
  background: #f3f5f8;
}

.lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.error {
  padding: 15px;
  background: #ffe6e6;
  border: 1px solid #d88;
  border-radius: 8px;
}
</style>
