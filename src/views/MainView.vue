<script setup>
import {
  onMounted,
  ref
} from "vue";
import CityItem
  from "@/components/CityItem.vue";
import InputAutocomplete
  from "@/components/InputAutocomplete.vue";
import {
  useUserPosition
} from "@/composables/userPosition.js";
import useData
  from "@/composables/useData.js";

const selectedCities = ref([]);
const { cityByCoords } = useData();

const selectCity = async (city) =>{
  selectedCities.value.push(city);
}

const deleteCity = (city) => {
  const result = confirm( `Are you sure you wanna delete ${city.name}?`);
  if ( result) {
    const cityIndex = selectedCities.value.indexOf(city);
    selectedCities.value.splice(cityIndex, 1);
  }
}

const setUsersCity = async () =>{
  const userLocation = await useUserPosition();
  if (userLocation) {
    const city = await cityByCoords(userLocation.location.latitude, userLocation.location.longitude);
    selectedCities.value.push(city[0]);
  }
}

onMounted(setUsersCity)
</script>

<template>
  <div class="wrapper">
      <div v-if="selectedCities.length >= 5">Only 5 cities allowed. Please remove some to add new.</div>
      <div v-else>Add city: <input-autocomplete @select="selectCity"></input-autocomplete></div>
      <city-item v-for="city in selectedCities" @delete="deleteCity" :city="city" :key="city.lat"></city-item>
  </div>
</template>

<style>
    .wrapper {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }


</style>
