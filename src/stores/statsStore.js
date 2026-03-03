import { defineStore } from 'pinia';

export const useStatsStore = defineStore('stats', {
  state: () => {
    // try loading from localStorage for persistence
    let initial = {};
    try {
      const stored = localStorage.getItem('heroStats');
      if (stored) {
        initial = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Unable to parse stored stats', e);
    }
    return {
      heroes: initial,
    };
  },
  getters: {
    leaderboard: (state) => {
      // return array sorted by wins desc
      return Object.values(state.heroes).sort((a, b) => b.wins - a.wins);
    },
    getStatsById: (state) => {
      return (id) => state.heroes[id] || { wins: 0, losses: 0 };
    },
  },
  actions: {
    _persist() {
      try {
        localStorage.setItem('heroStats', JSON.stringify(this.heroes));
      } catch (e) {
        console.error('Failed to persist stats', e);
      }
    },
    recordWin(hero) {
      if (!hero || !hero.id) return;
      const entry = this.heroes[hero.id] || {
        id: hero.id,
        name: hero.name,
        image: hero.image && hero.image.url ? hero.image.url : hero.image || '',
        wins: 0,
        losses: 0,
      };
      entry.wins++;
      // keep name and image up to date
      entry.name = hero.name;
      entry.image = hero.image && hero.image.url ? hero.image.url : hero.image || '';
      this.heroes[hero.id] = entry;
      this._persist();
    },
    recordLoss(hero) {
      if (!hero || !hero.id) return;
      const entry = this.heroes[hero.id] || {
        id: hero.id,
        name: hero.name,
        image: hero.image && hero.image.url ? hero.image.url : hero.image || '',
        wins: 0,
        losses: 0,
      };
      entry.losses++;
      entry.name = hero.name;
      entry.image = hero.image && hero.image.url ? hero.image.url : hero.image || '';
      this.heroes[hero.id] = entry;
      this._persist();
    },
    resetStats() {
      this.heroes = {};
      this._persist();
    },
  }, 
 },
);