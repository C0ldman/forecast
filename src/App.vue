<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Main</RouterLink>
        <RouterLink to="/favourites">Favourites</RouterLink>
      </nav>
  </header>

  <main>
     <RouterView />
  </main>


</template>

<style scoped>

</style>
