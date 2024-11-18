<script setup>
import { Icon } from '@iconify/vue';
import useData
  from "@/composables/useData.js";
import {
  ref,
  toRef,
    toValue
} from "vue";
import Loader
  from "@/components/Loader.vue";

const props = defineProps(['city']);
const emit = defineEmits(["delete"]);
const { getForecastByPosition, isForecastLoading, cityByCoords } = useData();

const forecast = ref(null);
const cityName = ref('');

const updateCityName = async function () {
  const info = await cityByCoords(props.city.lat, props.city.lon);
  cityName.value = info[0].name;
};

updateCityName();

const updateForecast = async () => {
  forecast.value = await getForecastByPosition(props.city.lat, props.city.lon);
}
updateForecast();
</script>

<template>
    <loader v-if="isForecastLoading"></loader>
    <div v-else-if="forecast" class="wrapper">
        <div> {{ forecast.weather[0].description}}</div>
        <div><Icon icon="mdi:temperature" /> {{ Math.ceil(forecast.main.temp)}}°</div>
        <div><Icon icon="mdi:humidity" /> {{ Math.ceil(forecast.main.humidity)}}°</div>
        <div><Icon icon="mdi:clouds" /> {{ forecast.clouds.all}}</div>
        <div> <Icon icon="mdi:arrow-up" :rotate="forecast.wind.deg" />{{ forecast.wind.speed}}</div>
        <h2><Icon icon="mdi:location" />{{ cityName }}</h2>
        <span @click="$emit('delete', city)"><Icon icon="mdi:trash" /></span>
    </div>


</template>

<style scoped>
.wrapper {
    display: flex;
    flex-flow: row;
}
</style>