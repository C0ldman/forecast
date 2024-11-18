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
  <div class="wrapper">
      <div v-if="favourites && favourites.length">
          <city-item v-for="city in favourites" :city="city" :key="city.name"></city-item>
      </div>
      <h1 v-else>Please add city to favourites</h1>
  </div>
</template>

<style>
  .wrapper {
    display: flex;
    align-items: center;
  }
</style>
