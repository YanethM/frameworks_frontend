const API_BASE = 'https://rickandmortyapi.com/api'

export default {
  namespaced: true,

  state: {
    locations: [],
    selectedLocation: null,
    filters: {
      name: '',
      type: '', // Planet, Cluster, Space station, etc.
      dimension: ''
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
    SET_LOCATIONS(state, data) {
      state.locations = data.results
      state.pagination = {
        currentPage: data.info.pages > 0 ? state.pagination.currentPage : 1,
        totalPages: data.info.pages,
        totalCount: data.info.count
      }
    },

    SET_SELECTED_LOCATION(state, location) {
      state.selectedLocation = location
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
        type: '',
        dimension: ''
      }
      state.pagination.currentPage = 1
    }
  },

  actions: {
    async fetchLocations({ commit, state }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const params = new URLSearchParams({
          page: state.pagination.currentPage
        })

        if (state.filters.name) {
          params.append('name', state.filters.name)
        }

        if (state.filters.type) {
          params.append('type', state.filters.type)
        }

        if (state.filters.dimension) {
          params.append('dimension', state.filters.dimension)
        }

        const response = await fetch(`${API_BASE}/location?${params}`)

        if (!response.ok) {
          if (response.status === 404) {
            commit('SET_LOCATIONS', { results: [], info: { pages: 0, count: 0 } })
            throw new Error('No se encontraron locaciones con esos filtros')
          }
          throw new Error('Error al cargar locaciones')
        }

        const data = await response.json()
        commit('SET_LOCATIONS', data)
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.error('Error fetching locations:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchLocationById({ commit }, id) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const response = await fetch(`${API_BASE}/location/${id}`)

        if (!response.ok) throw new Error('Locación no encontrada')

        const location = await response.json()
        commit('SET_SELECTED_LOCATION', location)
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.error('Error fetching location:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    setFilter({ commit, dispatch }, payload) {
      commit('SET_FILTER', payload)
      commit('SET_PAGE', 1)
      dispatch('fetchLocations')
    },

    changePage({ commit, dispatch }, page) {
      commit('SET_PAGE', page)
      dispatch('fetchLocations')
    },

    resetFilters({ commit, dispatch }) {
      commit('RESET_FILTERS')
      dispatch('fetchLocations')
    }
  },

  getters: {
    locationsCount(state) {
      return state.locations.length
    },

    hasActiveFilters(state) {
      return Object.values(state.filters).some(value => value !== '')
    },

    // Agrupa locaciones por tipo
    locationsByType(state) {
      const grouped = {}

      state.locations.forEach(location => {
        const type = location.type || 'Unknown'

        if (!grouped[type]) {
          grouped[type] = []
        }

        grouped[type].push(location)
      })

      return grouped
    },

    // Agrupa locaciones por dimensión
    locationsByDimension(state) {
      const grouped = {}

      state.locations.forEach(location => {
        const dimension = location.dimension || 'Unknown'

        if (!grouped[dimension]) {
          grouped[dimension] = []
        }

        grouped[dimension].push(location)
      })

      return grouped
    },

    // Locaciones de tipo Planet
    planetLocations(state) {
      return state.locations.filter(loc =>
        loc.type && loc.type.toLowerCase().includes('planet')
      )
    }
  }
}
