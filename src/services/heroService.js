import api from "./api";
import { computeHeroStats } from "../utils/heroStats";

const MAX_ID = 731;
const PAGE_SIZE = 20;

/**
 * Récupère un héros par son ID
 * @param {number} id - ID du héros
 * @returns {Promise<Object|null>} Les données du héros ou null en cas d'erreur
 */
export async function fetchHero(id) {
  try {
    const { data } = await api.get(`/${id}`);
    return data.response === 'success' ? data : null;
  } catch (error) {
    console.error(`Erreur lors du chargement du héros ${id}:`, error);
    return null;
  }
}

/**
 * Récupère un batch de héros par leurs IDs
 * @param {number} startId - ID du premier héros
 * @param {number} endId - ID du dernier héros (inclus)
 * @returns {Promise<Array>} Tableau des héros trouvés
 */
export async function fetchHeroesBatch(startId, endId) {
  const promises = [];

  for (let id = startId; id <= endId; id++) {
    promises.push(fetchHero(id));
  }

  const results = await Promise.all(promises);
  // Filtrer les null (héros qui n'existent pas ou erreur)
  return results.filter(hero => hero !== null);
}

/**
 * Récupère les héros pour une page donnée
 * @param {number} page - Numéro de page (commence à 1)
 * @returns {Promise<Object>} { heroes, hasNext, page, totalPages }
 */
export async function fetchHeroesPage(page = 1) {
  const startId = (page - 1) * PAGE_SIZE + 1;
  const endId = Math.min(page * PAGE_SIZE, MAX_ID);

  const heroes = await fetchHeroesBatch(startId, endId);

  const computedHeroes = heroes.map(h => computeHeroStats(h));

  

  const totalPages = Math.ceil(MAX_ID / PAGE_SIZE);
  const hasNext = page < totalPages;

  return {
    heroes : computedHeroes,
    computedHeroes,
    page,
    hasNext,
    totalPages,
    pageSize: PAGE_SIZE,
  };
}

/**
 * Recherche un héros par nom
 * @param {string} name - Nom du héros
 * @returns {Promise<Array>} Tableau des héros trouvés
 */
export async function searchHeroes(name) {
  if (!name || name.trim() === '') {
    return [];
  }

  try {
    const { data } = await api.get(`/search/${name}`);
    return data.results || [];
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    return [];
  }
}
