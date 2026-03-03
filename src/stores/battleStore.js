import { defineStore } from "pinia";

export const battleStore = defineStore("battle", {
  state: () => ({
    selectedHeroes: [],
  }),

  getters: {
    isFull: (state) => state.selectedHeroes.length >= 2,
    canFight: (state) => state.selectedHeroes.length === 2,
  },

  actions: {
    addHero(hero) {
      if (this.selectedHeroes.length >= 2) return;
      if (this.selectedHeroes.find(h => h.id === hero.id)) return;

      this.selectedHeroes.push(hero);
    },

    removeHero(id) {
      this.selectedHeroes = this.selectedHeroes.filter(h => h.id !== id);
    },

    reset() {
      this.selectedHeroes = [];
    }
  }
});