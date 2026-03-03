<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <h1 class="logo">HeroWar</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/battleArena">Battle Arena</RouterLink>
        <RouterLink to="/ranking">Classement</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
