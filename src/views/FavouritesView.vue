<script setup>
import {
  ref
} from "vue";
import CityItem
  from "@/components/CityItem.vue";

const saved = localStorage.getItem("favourites");
const favourites = ref(saved ? Array.from(JSON.parse(saved)) : []);
</script>

<template>
      <div v-if="favourites && favourites.length" class="favourites-wrapper">
          <city-item v-for="city in favourites" :city="city" :key="city.name"></city-item>
      </div>
      <h1 v-else>Please add city to favourites</h1>
</template>

<style scoped>
  .favourites-wrapper {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    width: 100%;
  }
</style>
