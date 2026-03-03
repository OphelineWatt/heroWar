<script setup>
import { useBattleStore } from "@/stores/battleStore";

const battle = useBattleStore();

// Initialisation du combat
battle.startBattle();
</script>

<template>
    <div v-if="battle.heroA && battle.heroB">

  <div class="arena">

    <div class="heroes">
      <div class="hero">
        <h2>{{ battle.heroA.name }}</h2>
        <img v-if="battle.heroA.image" :src="battle.heroA.image.url || battle.heroA.image" :alt="battle.heroA.name" />
        <div class="hp-bar">
          <div
            class="hp-bar-inner"
            :style="{ width: ((battle.heroA.hp / battle.heroA.hpMax) * 100) + '%' }"
          ></div>
        </div>
        <p>HP : {{ battle.heroA.hp }} / {{ battle.heroA.hpMax }}</p>
      </div>

      <div class="hero">
        <h2>{{ battle.heroB.name }}</h2>
        <img v-if="battle.heroB.image" :src="battle.heroB.image.url || battle.heroB.image" :alt="battle.heroB.name" />
        <div class="hp-bar">
          <div
            class="hp-bar-inner"
            :style="{ width: ((battle.heroB.hp / battle.heroB.hpMax) * 100) + '%' }"
          ></div>
        </div>
        <p>HP : {{ battle.heroB.hp }} / {{ battle.heroB.hpMax }}</p>
      </div>
    </div>

    <button 
      v-if="!battle.winner"
      @click="battle.nextTurn"
    >
      Tour suivant
    </button>

    <div v-if="battle.winner" class="winner">
      <h2>Victoire de {{ battle.winner }} !</h2>
      <button @click="battle.restartBattle">Rejouer le duel</button>
    </div>

    <div class="log">
      <h3>Journal du combat</h3>
      <p v-for="(entry, i) in battle.log" :key="i">{{ entry }}</p>
    </div>

  </div>
  </div>
</template>