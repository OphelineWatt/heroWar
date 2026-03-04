<script >
import { ref, onMounted } from 'vue';
import { fetchHeroesPage, searchHeroes } from '@/services/heroService';
import HeroCard from '@/components/HeroCard.vue';
import { useBattleStore } from "@/stores/battleStore";
import { useRouter } from 'vue-router';



export default {
  name: 'HomeView',
  components: {
    HeroCard,
  },
  setup() {
    const searchName = ref('');
    const searchResults = ref([]);
    const searchLoading = ref(false);
    const searchError = ref(null);
    const hasSearched = ref(false);
    
    const heroes = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(0);
    const hasNext = ref(false);
    const paginationLoading = ref(false);
    const paginationError = ref(null);
    
    const battleStoreInstance = useBattleStore();
    const router = useRouter();
  
    async function loadPage() {
      paginationLoading.value = true;
      paginationError.value = null;
      try {
        const result = await fetchHeroesPage(currentPage.value);
        heroes.value = result.heroes;
        totalPages.value = result.totalPages;
        hasNext.value = result.hasNext;
      } catch (e) {
        paginationError.value = e.message || 'Erreur lors du chargement des héros';
      } finally {
        paginationLoading.value = false;
      }
    }


    function nextPage() {
      if (hasNext.value && !paginationLoading.value) {
        currentPage.value++;
        loadPage();
      }
    }


    function previousPage() {
      if (currentPage.value > 1 && !paginationLoading.value) {
        currentPage.value--;
        loadPage();
      }
    }


    async function search() {
      if (!searchName.value) {
        hasSearched.value = false;
        searchResults.value = [];
        return;
      }

      searchLoading.value = true;
      searchError.value = null;
      hasSearched.value = true;

      try {
        const results = await searchHeroes(searchName.value);
        searchResults.value = results;
      } catch (e) {
        searchError.value = e.message || 'Erreur lors de la recherche';
        searchResults.value = [];
      } finally {
        searchLoading.value = false;
      }
    }

    function startFight() {
      router.push('/battleArena');
    }

    onMounted(() => {
      loadPage();
    });
    

    return {
      searchName,
      searchResults,
      searchLoading,
      searchError,
      hasSearched,
      search,

   
      heroes,
      currentPage,
      totalPages,
      hasNext,
      paginationLoading,
      paginationError,
      nextPage,
      previousPage,

     
      battleStore: battleStoreInstance,
      startFight,
    };
  },
};


</script>

<template>
  <h1>Bienvenue sur HeroWar</h1>
  <h2>Choisis ton héros et commence à combattre !</h2>
  <div>
  <h2>Héros sélectionnés</h2>

  <div v-if="battleStore.selectedHeroes.length === 0">
    Aucun héros sélectionné
  </div>

  <div v-for="hero in battleStore.selectedHeroes" :key="hero.id">
    <p>{{ hero.name }}</p>
    <button @click="battleStore.removeHero(hero.id)">Retirer</button>
  </div>

  <button 
    v-if="battleStore.canFight"
    @click="startFight"
  >
    Combattre !
  </button>
</div>
  <form @submit.prevent="search" class="search-form">
    <input
      v-model="searchName"
      placeholder="Rechercher un héros par son nom..."
      autocomplete="off"
    />
    <button :disabled="searchLoading">
      {{ searchLoading ? ' Recherche...' : ' Rechercher' }}
    </button>
  </form>

  <!-- Résultats de recherche -->
  <div v-if="hasSearched">
    <div v-if="searchLoading" class="loading">⏳ Recherche en cours...</div>
    <div v-if="searchError" class="error"> {{ searchError }}</div>
    
    
    <div v-if="searchResults.length > 0" class="heroes-grid">
      <HeroCard
      v-for="hero in searchResults"
      :key="hero.id"
      :hero="hero"
      />
    </div>
    <div v-else-if="!searchLoading" class="no-results">
      Aucun héros trouvé pour "{{ searchName }}"
    </div>
  </div>
  
  <div v-else>

    <div v-if="paginationLoading" class="loading">
      Chargement de la page {{ currentPage }}...
    </div>
    <div v-if="paginationError" class="error"> {{ paginationError }}</div>

    <div v-if="heroes.length > 0" class="heroes-grid">
      <HeroCard v-for="hero in heroes" :key="hero.id" :hero="hero" />
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        @click="previousPage"
        :disabled="currentPage === 1 || paginationLoading"
      >
        ⬅️ Précédent
      </button>

      <span class="page-info">
        Page {{ currentPage }} / {{ totalPages }}
      </span>

      <button @click="nextPage" :disabled="!hasNext || paginationLoading">
        Suivant ➡️
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-form {
  display: flex;
  gap: 0.5rem;
  margin: 1.5rem 0;
}

.search-form input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-form button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.search-form button:hover:not(:disabled) {
  background-color: #0056b3;
}

.search-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading,
.error,
.no-results {
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  text-align: center;
}

.loading {
  background-color: #e3f2fd;
  color: #1976d2;
}

.error {
  background-color: #ffebee;
  color: #c62828;
}

.no-results {
  background-color: #f5f5f5;
  color: #666;
}

.heroes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.pagination button:hover:not(:disabled) {
  background-color: #0056b3;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-weight: bold;
  min-width: 120px;
  text-align: center;
}
</style>
