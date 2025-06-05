<!-- src/components/Buscador.vue -->
<template>
  <input
    id="buscadorInput"
    type="text"
    v-model="valor"
    placeholder="Buscar país..."
    class="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-gray-100"
    aria-label="Buscar país"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Buscador',
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
/* Tus estilos adicionales si los necesitas */
</style>
