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

const selectedCities = ref([]);

const selectCity = async (city) =>{
  selectedCities.value.push(city);
}

const deleteCity = (city) => {
  const cityIndex = selectedCities.value.indexOf(city);
  selectedCities.value.splice(cityIndex, 1);
}

const setUsersCity = async () =>{
  const userLocation = await useUserPosition();

  if (userLocation) {
    selectedCities.value.push({
      "name": userLocation.city.name,
      "local_names": userLocation.city.names,
      "lat": userLocation.location.latitude,
      "lon": userLocation.location.longitude,
      "country": userLocation.country.name,
      "state": userLocation.state.name
    })
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
