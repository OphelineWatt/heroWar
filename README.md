# herowar

## Configuration de l'API Superhero

Ce projet utilise [Axios](https://axios-http.com/) pour communiquer avec l'API https://superheroapi.com/.

1. Installez la dépendance :
   ```bash
   npm install axios
   ```

2. Copiez le fichier d'exemple d'environnement et ajoutez votre token :
   ```bash
   cp .env.example .env
   # puis éditez .env et remplacez your_token_here
   ```

3. Un client Axios est configuré dans `src/services/api.js` avec `VITE_SUPERHERO_TOKEN`.

4. Utilisez ce client dans vos composants ou stores :
   ```js
   import api from '@/services/api';
   const response = await api.get(`/search/${name}`);
   ```


This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Règles du Combat

### Déroulement du combat

1. **Sélection des héros** : Choisissez 2 héros depuis la page d'accueil pour les ajouter à votre équipe de combat
2. **Initiativé** : Le héros avec la vitesse la plus élevée attaque en premier chaque tour
3. **Attaque** : L'attaquant inflige `attaque - défense_adversaire` dégâts à l'adversaire
4. **Dégâts minimum** : 1 point de dégâts minimum est toujours infligé
5. **Fin du combat** : Le combat s'arrête quand un héros est réduit à 0 HP
6. **Victoire** : L'héros avec encore des HP remporte la victoire et gagne un point au classement
7. **Stats sauvegardées** : Les victoires et défaites sont enregistrées localement et affichées au classement

## Calcul des Stats

Les stats des héros sont calculées à partir des power stats de l'API Superhero :

**HP Max (Points de Vie)**  
```
hpMax = 50 + durability × 2
```

**Attaque**  
```
attaque = strength + floor(power ÷ 2)
```

**Défense**  
```
defense = floor((durability + combat) ÷ 2)
```

**Vitesse**  
```
vitesse = speed
```

### Exemple de calcul

Pour Batman (durability: 56, strength: 88, power: 61, combat: 78, speed: 55) :
- **HP Max** : 50 + 56 × 2 = 162 HP
- **Attaque** : 88 + floor(61 ÷ 2) = 88 + 30 = 118
- **Défense** : floor((56 + 78) ÷ 2) = floor(134 ÷ 2) = 67
- **Vitesse** : 55




