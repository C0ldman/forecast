<script setup>
import { Icon } from '@iconify/vue';
import useData
  from "@/composables/useData.js";
import {
  computed,
  onMounted,
  ref
} from "vue";
import Loader
  from "@/components/Loader.vue";

const props = defineProps(['city']);
const emit = defineEmits(['delete']);
const { getForecastByPosition, isForecastLoading } = useData();

const forecast = ref(null);

const favourites = ref(JSON.parse(localStorage.getItem("favourites")) || []);

const updateForecast = async () => {
  forecast.value = await getForecastByPosition(props.city.lat, props.city.lon);
}

const isFavourite = computed(() => {
  return favourites.value.some(city => city.lat === props.city.lat && city.lon === props.city.lon);
})

const toggleFavourite = function(city) {
  const index = favourites.value.findIndex(c => c.lat=== city.lat && c.lon === city.lon);

  if (favourites.value.length >= 5 && index < 0) {
    alert('Favourite full');
    return;
  }

  if (index >= 0) {
    favourites.value.splice(index, 1);
  } else {
    favourites.value.push(city);
  }
  localStorage.setItem("favourites", JSON.stringify(favourites.value));
}

onMounted(updateForecast)
</script>

<template>
    <loader v-if="isForecastLoading"></loader>
    <div v-else-if="forecast" class="wrapper">
        <div> {{ forecast.weather[0].description}}</div>
        <div><Icon icon="mdi:temperature" /> {{ Math.ceil(forecast.main.temp)}}°</div>
        <div><Icon icon="mdi:humidity" /> {{ Math.ceil(forecast.main.humidity)}}°</div>
        <div><Icon icon="mdi:clouds" /> {{ forecast.clouds.all}}</div>
        <div> <span :style="`transform:rotate(${forecast.wind.deg}deg);    display: inline-block;`"><Icon icon="mdi:arrow-up" /></span>{{ forecast.wind.speed}}</div>
        <h2><Icon icon="mdi:location" />{{ city.name }}</h2>
        <h4 v-if="city.state">{{ city.state }}</h4>
        <span @click="$emit('delete', city)"><Icon icon="mdi:trash" /></span>
        <span @click="toggleFavourite(city)"><Icon icon="mdi:heart" :class="{'favourite': isFavourite}" /></span>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-flow: row;
}
.favourite {
    color: red;
}
</style>