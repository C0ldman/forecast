import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCitiesStore = defineStore('selectedCities', () => {
  const cities = ref([])

  const selectedCities = computed(() => cities.value)

  function addCity(city) {
    const present = cities.value.some((c) => c.lat === city.lat && c.lon === city.lon);
    if (!present) cities.value.push(city);
  }

  function removeCity(city) {
      const cityIndex = cities.value.indexOf(city);
      if (cityIndex >=0) cities.value.splice(cityIndex, 1);
  }

  return { selectedCities, addCity, removeCity, cities }
})
