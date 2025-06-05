<!-- src/App.vue -->
<template>
  <div :class="{ dark: modoOscuro }">
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-4">
      <!-- Cabecera: Título centrado + Botones a la derecha -->
      <div class="flex items-center mb-6">
        <div class="flex-1 text-center">
          <h1 class="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Explorador de Países
          </h1>
        </div>
        <div class="flex items-center space-x-2">
          <!-- Botón modo oscuro/claro -->
          <button
            @click="modoOscuro = !modoOscuro"
            class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded"
          >
            {{ modoOscuro ? '☀️' : '🌙' }}
          </button>

          <!-- Botón Exportar CSV -->
          <button
            @click="exportarDesdeLista"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            📥 CSV
          </button>
        </div>
      </div>

      <!-- Componente ListaPaises (grilla + estadísticas + detalles) -->
      <ListaPaises ref="listaComponent" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ListaPaises from './components/ListaPaises.vue'

export default defineComponent({
  name: 'App',
  components: {
    ListaPaises
  },
  data() {
    return {
      modoOscuro: false
    }
  },
  methods: {
    exportarDesdeLista() {
      // Llama al método exportarCSV() que está definido dentro de ListaPaises.vue
      if (
        this.$refs.listaComponent &&
        typeof this.$refs.listaComponent.exportarCSV === 'function'
      ) {
        this.$refs.listaComponent.exportarCSV()
      }
    }
  }
})
</script>
