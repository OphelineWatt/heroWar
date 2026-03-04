import api from "./api";
import { computeHeroStats } from "../utils/heroStats";

const MAX_ID = 731;
const PAGE_SIZE = 20;

export async function fetchHero(id) {
  try {
    const { data } = await api.get(`/${id}`);
    return data.response === 'success' ? data : null;
  } catch (error) {
    console.error(`Erreur lors du chargement du héros ${id}:`, error);
    return null;
  }
}

export async function fetchHeroWithBio(id) {
  try {
    const heroData = await fetchHero(id);
    if (!heroData) return null;

    const bioData = await fetchBioById(id);
    if (bioData) {
      const publisher = bioData.publisher || (bioData.biography && bioData.biography.publisher) || '';
      heroData.publisher = publisher;
    }

    return heroData;
  } catch (error) {
    console.error(`Erreur lors du chargement complet du héros ${id}:`, error);
    return null;
  }
}

export async function fetchBioById(id) {
  try {
    const { data } = await api.get(`/${id}/biography`);
    return data.response === 'success' ? data : null;
  } catch (error) {
    console.error(`Erreur lors du chargement de la bio du héros ${id}:`, error);
    return null;
  }
}




 
export async function fetchHeroesBatch(startId, endId) {
  const promises = [];

  for (let id = startId; id <= endId; id++) {
    promises.push(fetchHeroWithBio(id));
  }

  const results = await Promise.all(promises);
  return results.filter(hero => hero !== null);
}


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


export async function searchHeroes(name) {
  if (!name || name.trim() === '') {
    return [];
  }

  try {
    const { data } = await api.get(`/search/${name}`);
    
    if (!data.results) return [];

    const promises = data.results.map(async (h) => {
      const bioData = await fetchBioById(h.id);
      if (bioData) {
        const publisher = bioData.publisher || (bioData.biography && bioData.biography.publisher) || '';
        h.publisher = publisher;
      }
      return computeHeroStats(h);
    });

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    return [];
  }
}
