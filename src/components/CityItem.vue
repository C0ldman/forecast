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
import TemperatureForecast
  from "@/components/TemperatureForecast.vue";

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
    <div class="city-card">
        <loader v-if="isForecastLoading"></loader>
        <div v-else-if="forecast" class="wrapper">
            <div class="row title">
                <div>
                    <h1>
                        <Icon icon="mdi:location" />
                        {{ city.name }}
                    </h1>
                    <h4 v-if="city.state">
                        {{ city.state }}
                    </h4>
                    </div>
                <div>
                    <div class="description">
                        {{ forecast.weather[0].description}}
                    </div>
                </div>
                <div>
                    <span @click="$emit('delete', city)">
                        <Icon icon="mdi:trash" class="icon delete"/>
                    </span>
                    <span @click="toggleFavourite(city)">
                        <Icon icon="mdi:heart" :class="{'favourite': isFavourite}" class="icon"/>
                    </span></div>
            </div>
            <div class="row details">
                <div>
                    <Icon icon="mdi:temperature" />
                    {{ Math.ceil(forecast.main.temp)}}°
                </div>
                <div>
                    <Icon icon="mdi:humidity" />
                    {{ Math.ceil(forecast.main.humidity)}}°
                </div>
                <div>
                    <Icon icon="mdi:clouds" />
                    {{ forecast.clouds.all}}
                </div>
                <div>
                    <span :style="`transform:rotate(${forecast.wind.deg}deg);    display: inline-block;`">
                        <Icon icon="mdi:arrow-up" />
                    </span>
                    {{ forecast.wind.speed}}
                </div>
            </div>
            <temperature-forecast :city="city"></temperature-forecast>
        </div>
    </div>

</template>

<style scoped>
.city-card {
    width: 100%;
    border: 0.1rem solid #6badcd;
    border-radius: 0.3rem;
    margin: 1rem;
    backdrop-filter: saturate(0.8);
}
.wrapper {
    display: flex;
    flex-flow: column;
}
.row {
    display: flex;
    flex-flow: row;
    width: 100%;
    margin: 1rem 0;
    padding: 0 1rem;
}
.favourite {
    color: red;
}
.icon {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    margin-left: 1rem;
}
.title {
    justify-content: space-between;
}
.details {
    justify-content: space-around;
    font-size: 1.2rem;
}
.description {
    font-size: 1.5rem;
}
.favourites-wrapper .delete {
    display: none;
}
</style>