<script setup>
import { computed } from 'vue';
import { useStatsStore } from '@/stores/statsStore';

const stats = useStatsStore();
const leaderboard = computed(() => stats.leaderboard);
</script>

<template>
  <div class="ranking">
    <h1>Classement des héros</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Héros</th>
          <th>Victoires</th>
          <th>Défaites</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in leaderboard" :key="entry.id">
          <td>{{ index + 1 }}</td>
          <td class="champion">
            <img v-if="entry.image" :src="entry.image" :alt="entry.name" />
            {{ entry.name }}
          </td>
          <td>{{ entry.wins }}</td>
          <td>{{ entry.losses }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="leaderboard.length === 0">
      Aucun combat enregistré.
    </div>
  </div>
</template>

<style scoped>
.ranking {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  color: #eee;
}

.ranking table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(0,0,0,0.7);
  color: #fff;
}

.ranking th,
.ranking td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #444;
}

.ranking th {
  background: #222;
}

.ranking img {
  height: 30px;
  width: 30px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 0.5rem;
  vertical-align: middle;
}

.champion {
  display: flex;
  align-items: center;
}
</style>