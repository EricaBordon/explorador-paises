<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold text-blue-700 mb-4 dark:text-blue-300">
      Países del mundo 🌎
    </h2>

    <!-- 1) Buscador + Filtro en la misma fila -->
    <div class="flex space-x-4 mb-4">
      <div class="flex-1">
        <label for="inputBusqueda" class="sr-only">Buscar país</label>
        <Buscador id="inputBusqueda" v-model="busqueda" />
      </div>
      <div class="w-1/3 md:w-1/4 lg:w-1/5">
        <label for="selectRegion" class="sr-only">Filtrar por región</label>
        <FiltroRegion id="selectRegion" v-model="regionSeleccionada" />
      </div>
    </div>

    <!-- 2) Estado: cargando -->
    <div v-if="loading" class="text-gray-600 dark:text-gray-400">
      Cargando países...
    </div>

    <!-- 3) Estado: error -->
    <div v-else-if="error" class="text-red-500 font-semibold">
      Hubo un error al cargar los países: {{ error }}
    </div>

    <!-- 4) Grilla + Detalles y luego Estadísticas debajo -->
    <div v-else>
      <!-- 4.1) GRILLA + PANEL LATERAL DE DETALLES -->
      <div class="flex space-x-4">
        <div
          :class="paisSeleccionado ? 'w-2/3' : 'w-full'"
          class="transition-width duration-300"
        >
          <ag-grid-vue
            class="ag-theme-alpine"
            style="width: 100%; height: 400px"
            :rowData="paisesFiltrados"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            @rowClicked="verDetalles"
            @grid-ready="onGridReady"
            rowSelection="single"
            animateRows
            :pagination="true"
            :paginationPageSize="20"
          />
        </div>

        <div
          v-if="paisSeleccionado"
          class="w-1/3 transition-width duration-300"
        >
          <DetallesPais
            :pais="paisSeleccionado"
            @cerrar="paisSeleccionado = null"
          />
        </div>
      </div>

      <!-- 4.2) PANEL DE ESTADÍSTICAS (más pequeño y centrado) -->
      <div class="mt-6 mb-6">
        <h3 class="text-xl font-bold mb-4 text-gray-700 dark:text-gray-200 text-center">
          Estadísticas de Países por Región
        </h3>
        <!-- Contenedor centrado y con ancho máximo -->
        <div class="mx-auto max-w-xl">
          <!-- Ajustamos la altura a h-48 (12rem) en lugar de h-64 -->
          <div class="chart-container relative h-48">
            <Estadisticas :paises="paises" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import 'ag-grid-community/styles/ag-grid.css';
@import 'ag-grid-community/styles/ag-theme-alpine.css';

/* Transición suave para cambio de ancho */
.transition-width {
  transition-property: width;
}

/* Ajustamos la altura del contenedor del gráfico */
.chart-container {
  height: 12rem; /* h-48 = 12rem */
}
</style>

<script>
import { defineComponent } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { ModuleRegistry, AllCommunityModules } from 'ag-grid-community'
import Buscador from './Buscador.vue'
import FiltroRegion from './FiltroRegion.vue'
import DetallesPais from './DetallesPais.vue'
import Estadisticas from './Estadisticas.vue'

// Registramos todos los módulos community de AG Grid (v30+)
ModuleRegistry.registerModules([AllCommunityModules])

export default defineComponent({
  name: 'ListaPaises',
  components: {
    Buscador,
    FiltroRegion,
    DetallesPais,
    Estadisticas,
    AgGridVue
  },
  data() {
    return {
      paises: [],
      loading: true,
      error: null,
      busqueda: '',
      regionSeleccionada: '',
      paisSeleccionado: null,
      gridApi: null,
      gridColumnApi: null,

      columnDefs: [
        {
          headerName: 'Nombre',
          field: 'name.common',
          sortable: true,
          filter: true,
          flex: 1
        },
        {
          headerName: 'Región',
          field: 'region',
          sortable: true,
          filter: true
        },
        {
          headerName: 'Bandera',
          field: 'flags.png',
          cellRenderer: (params) => {
            return `
              <img
                src="${params.value}"
                alt="Bandera de ${params.data.name.common}"
                style="width: 30px; height: 20px; object-fit: cover"
              />
            `
          }
        }
      ],
      defaultColDef: {
        resizable: true,
        filter: true,
        sortable: true
      }
    }
  },
  computed: {
    paisesFiltrados() {
      return this.paises.filter((pais) => {
        const nombre = (pais.name?.common || '').toLowerCase()
        const region = pais.region || ''
        const coincideBusqueda = nombre.includes(this.busqueda.toLowerCase())
        const coincideRegion =
          !this.regionSeleccionada || region === this.regionSeleccionada

        return coincideBusqueda && coincideRegion
      })
    }
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi
    },
    exportarCSV() {
      if (this.gridApi) {
        this.gridApi.exportDataAsCsv({
          fileName: 'paises_filtrados.csv',
          allColumns: false
        })
      }
    },
    verDetalles(params) {
      this.paisSeleccionado = params.data
    }
  },
  mounted() {
    fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,capital,population,languages'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Código de error: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        this.paises = data
        this.loading = false
      })
      .catch((error) => {
        console.error('Error al cargar países:', error)
        this.error = error.message
        this.loading = false
      })
  }
})
</script>
