<script setup>
import {
  ref
} from "vue";
import CityItem
  from "@/components/CityItem.vue";
import InputAutocomplete
  from "@/components/InputAutocomplete.vue";

const apikey = import.meta.env.VITE_WEATHER_API_KEY;

const language = ref(navigator.language);
const suggestions = ref();
const selectedCities = ref([]);
const isSuggestionLoading = ref(false);

const getForecastByPosition = async function (latitude, longitude) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${language.value}&units=metric&appid=${apikey}`)
    .then((res) => res.json());
}

const updateSuggestions = async function (value) {
  if (!value.length) return;
  const city = value[0].toUpperCase() + value.slice(1);
  isSuggestionLoading.value=true;
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=40&appid=${apikey}`)
  .then((res) => res.json())
  .then((res) => {
    suggestions.value = res;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => isSuggestionLoading.value=false);
}

const addCity = async (city) =>{
  const { lat, lon } = city;
  const forecast = await getForecastByPosition(lat, lon);
  selectedCities.value.push(forecast);
  suggestions.value = '';
}

</script>

<template>
  <div class="wrapper">
      <input-autocomplete @input="updateSuggestions" @select="addCity" :suggestions="suggestions" :isSuggestionLoading="isSuggestionLoading"></input-autocomplete>
      <city-item v-for="city in selectedCities" :city="city"></city-item>
  </div>
</template>

<style>
    .wrapper {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }
</style>
