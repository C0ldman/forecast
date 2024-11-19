<script setup>
import useData
  from "@/composables/useData.js";
import Chart
  from 'chart.js/auto';
import {
  onMounted,
  ref
} from "vue";

const props = defineProps(['city']);
const graph = ref(null);

const {hourlyTemperatureForecast} = useData();

const temperatureData = async () => {
  const a = await hourlyTemperatureForecast(props.city.lat, props.city.lon);
  return a.hourly.map(f => f.temp).slice(0,24);
}


const renderGraph = async () => {
  const data = await temperatureData();
  new Chart(graph.value, {
    type: 'line',
    data: {
      labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '18', '20', '21', '22', '23', '24'],
      datasets: [{
        label: 'Temperature',
        data,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

onMounted(renderGraph);


</script>

<template>
    <div>
        <canvas ref="graph" id="chart-example"></canvas>
    </div>
</template>

<style scoped>

</style>