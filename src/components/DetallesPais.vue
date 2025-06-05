<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full overflow-auto"
  >
    <!-- Botón de cerrar en la parte superior derecha -->
    <div class="flex justify-end mb-4">
      <button
        @click="$emit('cerrar')"
        class="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
      >
        ✖
      </button>
    </div>

    <!-- Si no hay país (prop pais === null), mostramos un mensaje de ayuda -->
    <div v-if="!pais" class="text-gray-500 dark:text-gray-400">
      Selecciona un país para ver detalles.
    </div>

    <!-- Si hay un país seleccionado, mostramos su info ampliada -->
    <div v-else>
      <!-- Título: nombre común + nombre oficial -->
      <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        {{ pais.name.common }}
        <span class="text-lg font-medium text-gray-600 dark:text-gray-300">
          ({{ pais.name.official }})
        </span>
      </h3>

      <!-- Bandera en tamaño grande -->
      <div class="flex justify-center mb-6">
        <img
          :src="pais.flags.png"
          :alt="`Bandera de ${pais.name.common}`"
          class="w-40 h-auto rounded shadow-md"
        />
      </div>

      <!-- Lista de detalles -->
      <ul class="space-y-2">
        <li>
          <strong class="text-gray-700 dark:text-gray-300">Capital:</strong>
          <span class="text-gray-600 dark:text-gray-200">
            {{ pais.capital?.[0] || 'No disponible' }}
          </span>
        </li>
        <li>
          <strong class="text-gray-700 dark:text-gray-300">Región:</strong>
          <span class="text-gray-600 dark:text-gray-200">
            {{ pais.region || 'No disponible' }}
          </span>
        </li>
        <li>
          <strong class="text-gray-700 dark:text-gray-300">Población:</strong>
          <span class="text-gray-600 dark:text-gray-200">
            {{ pais.population?.toLocaleString() || 'No disponible' }}
          </span>
        </li>
        <li>
          <strong class="text-gray-700 dark:text-gray-300">Idiomas:</strong>
          <span class="text-gray-600 dark:text-gray-200">
            {{
              pais.languages
                ? Object.values(pais.languages).join(', ')
                : 'No disponible'
            }}
          </span>
        </li>
        <!-- Si quieres, puedes agregar más datos: subregión, monedas, etc. -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetallesPais',
  props: {
    pais: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
/* Ya usamos Tailwind, no hace falta CSS adicional */
</style>
