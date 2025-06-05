<!-- src/components/FiltroRegion.vue -->
<template>
  <select
    id="filtroRegionSelect"
    v-model="valor"
    class="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-gray-100"
    aria-label="Seleccionar región"
  >
    <option value="">Todas las regiones</option>
    <option value="Africa">África</option>
    <option value="Americas">América</option>
    <option value="Asia">Asia</option>
    <option value="Europe">Europa</option>
    <option value="Oceania">Oceanía</option>
  </select>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FiltroRegion',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  computed: {
    valor: {
      get() {
        return this.modelValue
      },
      set(nuevoValor) {
        this.$emit('update:modelValue', nuevoValor)
      }
    }
  }
})
</script>

<style scoped>
/* Estilos extra si los necesitas */
</style>
