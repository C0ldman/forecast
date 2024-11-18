<script setup>
import {
  ref
} from "vue";
import CityItem
  from "@/components/CityItem.vue";
import InputAutocomplete
  from "@/components/InputAutocomplete.vue";

const selectedCities = ref([]);

const selectCity = async (city) =>{
  selectedCities.value.push(city);
}

const deleteCity = (city) => {
  const cityIndex = selectedCities.value.indexOf(city);
  selectedCities.value.splice(cityIndex, 1);
}
</script>

<template>
  <div class="wrapper">
      <div v-if="selectedCities.length >= 5">Only 5 cities allowed. Please remove some to add new.</div>
      <div v-else>Add city: <input-autocomplete @select="selectCity"></input-autocomplete></div>
      <city-item v-for="city in selectedCities" @delete="deleteCity" :city="city" :key="city.name"></city-item>
  </div>
</template>

<style>
    .wrapper {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }
</style>
