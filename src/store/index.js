import { createStore } from 'vuex'
import characters from './modules/characters'
import episodes from './modules/episodes'
import locations from './modules/locations'

export default createStore({
  modules: {
    characters,
    episodes,
    locations
  },

  state: {
    appName: 'Rick and Morty Explorer'
  }
})
