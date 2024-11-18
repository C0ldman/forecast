<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <div class="logo-wrapper">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      </div>

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
.logo-wrapper {
    display: flex;
    width: 100%;
    margin-bottom: 1rem;
}
.logo {
    margin:auto;
}
</style>
