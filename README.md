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
