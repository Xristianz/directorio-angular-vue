
<script setup>
const props = defineProps({
  usuario: {
    type: Object,
    required: true
  },
  favorito: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['alternar-favorito']);

function marcarFavorito() {
  emit('alternar-favorito', props.usuario.id);
}
</script>

<template>
  <div class="tarjeta">

    <h3>{{ usuario.name }}</h3>

    <p>
      <strong>Correo:</strong> {{ usuario.email }}
    </p>

    <p>
      <strong>Ciudad:</strong> {{ usuario.address.city }}
    </p>

    <button
      type="button"
      :class="{ seleccionado: favorito }"
      @click="marcarFavorito">

      {{ favorito ? '★ Quitar favorito' : '☆ Favorito' }}

    </button>

  </div>
</template>

<style scoped>
.tarjeta {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 18px;
  height: 100%;
}

.tarjeta h3 {
  margin-top: 0;
  color: #253858;
}

.tarjeta p {
  font-size: 14px;
  overflow-wrap: anywhere;
}

button {
  background: #e7efff;
  border: 1px solid #9fb8e5;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

button.seleccionado {
  background: #ffe6a3;
}

button:hover {
  opacity: 0.85;
}
</style>
