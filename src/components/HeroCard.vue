<script setup>
import { battleStore } from "@/stores/battleStore";


defineProps({
  hero: Object
});

function selectHero() {
  battleStore.addHero(hero);
}
</script>

<template>
  <div class="hero-card">
    <h3>{{ hero.name }}</h3>

    <img v-if="hero.image" :src="hero.image" :alt="hero.name" />

    <!-- Bouton de sélection -->
    <button 
      @click="selectHero"
      :disabled="battleStore.isFull"
    >
      Sélectionner
    </button>

    <!-- Stats calculées -->
    <div class="computed-stats">
      <p><strong>HP Max :</strong> {{ hero.hpMax }}</p>
      <p><strong>Attaque :</strong> {{ hero.attaque }}</p>
      <p><strong>Défense :</strong> {{ hero.defense }}</p>
      <p><strong>Vitesse :</strong> {{ hero.vitesse }}</p>
    </div>
  </div>
</template>