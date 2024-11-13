<script setup>
import {
  ref
} from "vue";

const apikey = import.meta.env.VITE_WEATHER_API_KEY;

const data = ref();
const latitude = ref();
const longitude = ref();

const getCoords = async () => {
  if ('geolocation' in navigator) {
    console.log('Geolocation is Available');
    navigator.geolocation.getCurrentPosition(pos => {
      console.log('pos: ', pos);
      latitude.value = pos.coords.latitude
      longitude.value = pos.coords.longitude;
    });
  } else {
    console.log('Geolocation is NOT Available');
  }
}

getCoords();

const getForecast = async function () {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude.value}&lon=${longitude.value}&appid=${apikey}`)
    .then((res) => res.json())
    .then((res) => {
      console.log('res: ', res);
      data.value = res;
    });
}



</script>

<template>
  <div class="wrapper">
      main
      <button @click="getForecast">Get Forecast</button>/
      {{latitude}}
      {{longitude}}
      {{data}}
  </div>
</template>

<style>

    .wrapper {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
</style>
