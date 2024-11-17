<script setup>
import Switch
  from "@/components/Switch.vue";
import { Icon } from '@iconify/vue';

const props = defineProps(['city']);
const apikey = import.meta.env.VITE_WEATHER_API_KEY;
const cityName = async function (latitude, longitude) {
  return fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apikey}`)
  .then((res) => res.json())
  .then((res) => {
    console.log('res: ', res);
    return res;
  });
}
</script>

<template>
    <switch></switch>
    <div class="wrapper">
        <div> {{ city.weather[0].description}}</div>
        <div><Icon icon="mdi:temperature" /> {{ Math.ceil(city.main.temp)}}°</div>
        <div><Icon icon="mdi:humidity" /> {{ Math.ceil(city.main.humidity)}}°</div>
        <div><Icon icon="mdi:clouds" /> {{ city.clouds.all}}</div>
        <div> <Icon icon="mdi:arrow-up" :rotate="city.wind.deg" />{{ city.wind.speed}}</div>
        <h2><Icon icon="mdi:location" />{{ cityName(city.coord.lon, city.coord.lat) }}</h2>
    </div>


</template>

<style scoped>

</style>