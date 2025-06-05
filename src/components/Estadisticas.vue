<!-- src/components/Estadisticas.vue -->
<template>
    <div class="mb-6">
      <div class="chart-container relative h-64">
        <!-- 🔑 PROP “data” y “options”, tal como lo espera vue-chartjs@5 -->
        <BarChart :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, computed } from 'vue'
  import { Bar } from 'vue-chartjs'
  import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  
  // Registrar los componentes de Chart.js
  Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default defineComponent({
    name: 'Estadisticas',
    components: {
      BarChart: Bar
    },
    props: {
      paises: {
        type: Array,
        required: true
      }
    },
    setup(props) {
      // 1) Contar cuántos países hay en cada región
      const countsPorRegion = computed(() => {
        const mapa = {}
        props.paises.forEach((pais) => {
          const region = pais.region || 'Desconocido'
          mapa[region] = (mapa[region] || 0) + 1
        })
        return mapa
      })
  
      // 2) Construir el objeto “chartData” con labels y datasets
      const chartData = computed(() => ({
        labels: Object.keys(countsPorRegion.value),
        datasets: [
          {
            label: 'Países por Región',
            data: Object.values(countsPorRegion.value),
            backgroundColor: [
              '#3B82F6', // azul
              '#10B981', // verde
              '#F59E0B', // ámbar
              '#EF4444', // rojo
              '#8B5CF6', // morado
              '#F472B6', // rosado
              '#22D3EE', // cian
              '#A3E635', // lima
              '#FCD34D', // amarillo
              '#6B7280'  // gris
            ],
            borderRadius: 4,
            barPercentage: 0.6
          }
        ]
      }))
  
      // 3) Opciones del gráfico
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#374151' // color del texto en modo claro
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#374151'
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#374151'
            },
            grid: {
              color: '#D1D5DB'
            }
          }
        }
      }
  
      return {
        chartData,
        chartOptions
      }
    }
  })
  </script>
  
  <style scoped>
  .chart-container {
    /* h-64 equivale a 16rem en Tailwind */
    height: 16rem;
  }
  </style>
  