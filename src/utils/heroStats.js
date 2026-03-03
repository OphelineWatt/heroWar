export function computeHeroStats(apiHero) {
  const durability = Number(apiHero.powerstats.durability) || 0;
  const strength = Number(apiHero.powerstats.strength) || 0;
  const power = Number(apiHero.powerstats.power) || 0;
  const combat = Number(apiHero.powerstats.combat) || 0;
  const speed = Number(apiHero.powerstats.speed) || 0;

  return {
    id: apiHero.id,
    name: apiHero.name,
    image: apiHero.image.url,
    

    hpMax: 50 + durability * 2,
    attaque: strength + Math.floor(power / 2),
    defense: Math.floor((durability + combat) / 2),
    vitesse: speed
  };
}