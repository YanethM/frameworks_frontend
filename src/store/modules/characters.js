const API_BASE = 'https://rickandmortyapi.com/api'
export default {
  namespaced: true,
  state: {
    characters: [],
    selectedCharacter: null,
    filters: {
      name: '',
      status: '',
      species: '',
    },
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalCount: 0,
    },
    loading: false,
    error: null,
  },
  mutations: {
    SET_CHARACTERS(state, data) {
      state.characters = data.results
      state.pagination = {
        currentPage: data.info.pages > 0 ? state.pagination.currentPage : 1,
        totalPages: data.info.pages,
        totalCount: data.info.count,
      }
    },
    SET_SELECTED_CHARACTER(state, character) {
      state.selectedCharacter = character
    },
    // Una sola mutación maneja todos los filtros, siendo reutilizable
    SET_FILTER(state, { key, value }) {
      state.filters[key] = value
    },
    SET_PAGE(state, page) {
      state.pagination.currentPage = page
    },
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    RESET_FILTERS(state) {
      state.filters = {
        name: '',
        status: '',
        species: '',
      }
      state.pagination.currentPage = 1
    },
  },
  actions: {
    async fetchCharacters({ commit, state }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const params = new URLSearchParams({
          // ?page=2
          page: state.pagination.currentPage,
        })
        if (state.filters.name) params.append('name', state.filters.name)
        if (state.filters.status) params.append('status', state.filters.status)
        if (state.filters.species) params.append('species', state.filters.species)
        // https://rickandmortyapi.com/api/character?page=2&name=rick
        const response = await fetch(`${API_BASE}/character?${params}`)
        if (!response.ok) {
          // https://rickandmortyapi.com/api/character?page=2&name=ricky
          if (response.status === 404) {
            commit('SET_CHARACTERS', { results: [], info: { pages: 0, count: 0 } })
            throw new Error('No se encontraron personajes con los filtros aplicados.')
          }
          throw new Error('Error al obtener los personajes.')
        }
        const data = await response.json()
        commit('SET_CHARACTERS', data)
      } catch (error) {
        commit('`SET_ERROR`', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchCharacterById({ commit }, id) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await fetch(`${API_BASE}/character/${id}`)
        if (!response.ok) {
          throw new Error('Error al obtener el personaje.')
        }
        const character = await response.json()
        commit('SET_SELECTED_CHARACTER', character)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    setFilter({ commit, dispatch }, payload) {
      commit('SET_FILTER', payload)
      commit('SET_PAGE', 1)
      dispatch('fetchCharacters')
    },

    changePage({ commit, dispatch }, page) {
      commit('SET_PAGE', page)
      dispatch('fetchCharacters')
    },

    resetFilters({ commit, dispatch }) {
      commit('RESET_FILTERS')
      dispatch('fetchCharacters')
    },
  },
  getters: {
    aliveCharacters(state) {
      return state.characters.filter((char) => char.status === 'Alive')
    },
    deadCharacters(state) {
      return state.characters.filter((char) => char.status === 'Dead')
    },
    charactersCount(state) {
      return state.characters.length
    },
    hasActiveFilters(state) {
      return Object.values(state.filters).some((value) => value !== '')
    },
  },
}
