<script setup>
import { useBattleStore } from "@/stores/battleStore";

const battleStoreInstance = useBattleStore();

const props = defineProps({
  hero: Object,
});

function selectHero() {
  // Defensive: ensure hero exists
  if (!props.hero) return;
  battleStoreInstance.addHero(props.hero);
}
</script>

<template>
  <div class="hero-card">
    <h3>{{ props.hero.name }}</h3>

    <img
      v-if="props.hero.image"
      :src="(props.hero.image && props.hero.image.url) || props.hero.image"
      :alt="props.hero.name"
    />

    <button @click="selectHero" :disabled="battleStoreInstance.isFull">
      Sélectionner
    </button>

    <div class="computed-stats">
      <p><strong>HP Max :</strong> {{ props.hero.hpMax }}</p>
      <p><strong>Attaque :</strong> {{ props.hero.attaque }}</p>
      <p><strong>Défense :</strong> {{ props.hero.defense }}</p>
      <p><strong>Vitesse :</strong> {{ props.hero.vitesse }}</p>
    </div>
  </div>
</template>