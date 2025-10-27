const API_BASE = 'https://rickandmortyapi.com/api'

export default {
  namespaced: true,

  state: {
    episodes: [],
    selectedEpisode: null,
    searchTerm: '',
    filters: {
      name: '',
      episode: '' 
    },
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalCount: 0
    },
    loading: false,
    error: null
  },

  mutations: {
    SET_EPISODES(state, data) {
      state.episodes = data.results
      state.pagination = {
        currentPage: data.info.pages > 0 ? state.pagination.currentPage : 1,
        totalPages: data.info.pages,
        totalCount: data.info.count
      }
    },

    SET_SELECTED_EPISODE(state, episode) {
      state.selectedEpisode = episode
    },

    SET_SEARCH_TERM(state, term) {
      state.searchTerm = term
    },

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
        episode: ''
      }
      state.searchTerm = ''
      state.pagination.currentPage = 1
    }
  },

  actions: {
    async fetchEpisodes({ commit, state }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const params = new URLSearchParams({
          page: state.pagination.currentPage
        })

        if (state.filters.name) {
          params.append('name', state.filters.name)
        }

        if (state.filters.episode) {
          params.append('episode', state.filters.episode)
        }

        const response = await fetch(`${API_BASE}/episode?${params}`)

        if (!response.ok) {
          if (response.status === 404) {
            commit('SET_EPISODES', { results: [], info: { pages: 0, count: 0 } })
            throw new Error('No se encontraron episodios con esos filtros')
          }
          throw new Error('Error al cargar episodios')
        }

        const data = await response.json()
        commit('SET_EPISODES', data)
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.error('Error fetching episodes:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchEpisodeById({ commit }, id) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const response = await fetch(`${API_BASE}/episode/${id}`)

        if (!response.ok) throw new Error('Episodio no encontrado')

        const episode = await response.json()
        commit('SET_SELECTED_EPISODE', episode)
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.error('Error fetching episode:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    setFilter({ commit, dispatch }, payload) {
      commit('SET_FILTER', payload)
      commit('SET_PAGE', 1)
      dispatch('fetchEpisodes')
    },

    searchEpisodes({ commit, dispatch }, term) {
      commit('SET_SEARCH_TERM', term)
      commit('SET_FILTER', { key: 'name', value: term })
      commit('SET_PAGE', 1)
      dispatch('fetchEpisodes')
    },

    changePage({ commit, dispatch }, page) {
      commit('SET_PAGE', page)
      dispatch('fetchEpisodes')
    },

    resetFilters({ commit, dispatch }) {
      commit('RESET_FILTERS')
      dispatch('fetchEpisodes')
    }
  },

  getters: {
    episodesBySeason: (state) => (season) => {
      // Filtra episodios por temporada (S01, S02, etc.)
      const seasonStr = `S${String(season).padStart(2, '0')}`
      return state.episodes.filter(ep => ep.episode.startsWith(seasonStr))
    },

    episodesCount(state) {
      return state.episodes.length
    },

    hasActiveFilters(state) {
      return Object.values(state.filters).some(value => value !== '')
    },

    // Agrupa episodios por temporada
    episodesBySeasonGrouped(state) {
      const grouped = {}

      state.episodes.forEach(episode => {
        const season = episode.episode.substring(0, 3) // S01, S02, etc.

        if (!grouped[season]) {
          grouped[season] = []
        }

        grouped[season].push(episode)
      })

      return grouped
    }
  }
}
