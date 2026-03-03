import { defineStore } from "pinia";
import { useStatsStore } from "./statsStore";

export const useBattleStore = defineStore("battle", {
  state: () => ({
    selectedHeroes: [],

    heroA: null,
    heroB: null,
    currentAttacker: null,
    currentDefender: null,

    log: [],
    winner: null,
  }),

  getters: {
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

    resetSelection() {
      this.selectedHeroes = [];
    },

    startBattle() {
      if (this.selectedHeroes.length !== 2) return;

      this.heroA = { ...this.selectedHeroes[0], hp: this.selectedHeroes[0].hpMax };
      this.heroB = { ...this.selectedHeroes[1], hp: this.selectedHeroes[1].hpMax };

      if (this.heroA.vitesse >= this.heroB.vitesse) {
        this.currentAttacker = this.heroA;
        this.currentDefender = this.heroB;
      } else {
        this.currentAttacker = this.heroB;
        this.currentDefender = this.heroA;
      }

      this.log = [];
      this.winner = null;
    },

    nextTurn() {
      if (this.winner) return;

      const attacker = this.currentAttacker;
      const defender = this.currentDefender;

      const rawDamage = attacker.attaque - defender.defense;
      const damage = Math.max(1, rawDamage); // minimum 1 dégât

      defender.hp -= damage;

      // Journal
      this.log.push(
        `${attacker.name} attaque ${defender.name} et inflige ${damage} dégâts. ${defender.name} a ${Math.max(defender.hp, 0)} HP restants.`
      );

      // Vérification de la victoire
      if (defender.hp <= 0) {
        this.winner = attacker.name;
        this.log.push(`Victoire de ${attacker.name} !`);
        // update stats store
        const stats = useStatsStore();
        stats.recordWin(attacker);
        stats.recordLoss(defender);
        return;
      }

      // Inversion des rôles
      this.currentAttacker = defender;
      this.currentDefender = attacker;
    },

    restartBattle() {
      this.startBattle();
    }
  }
});