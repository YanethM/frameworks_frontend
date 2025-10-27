<template>
  <div class="characters-view">
    <h1>Personajes Rick & Morty</h1>

    <!-- Barra de búsqueda (input simple) -->
    <input
      v-model="filters.name"
      @input="handleSearch(filters.name)"
      type="text"
      placeholder="Buscar por nombre..."
      class="search-input"
    />

    <!-- Filtros -->
    <select v-model="filters.status" @change="applyFilter('status', filters.status)">
      <option value="">Todos los estados</option>
      <option value="alive">Vivo</option>
      <option value="dead">Muerto</option>
    </select>

    <!-- Loading -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Cargando personajes...</p>
    </div>

    <!-- Grid de personajes -->
    <div v-if="!loading" class="characters-grid">
      <CharacterCard
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </div>
  </div>
</template>

<script>
import CharacterCard from '../components/CharacterCard.vue'

export default {
  name: 'CharactersView',
  components: {
    CharacterCard
  },
  data() {
    return {
      filters: {
        name: '',
        status: ''
      }
    }
  },
  computed: {
    characters() {
      return this.$store.state.characters.characters
    },
    loading() {
      return this.$store.state.characters.loading
    },
    pagination() {
      return this.$store.state.characters.pagination
    }
  },
  methods: {
    loadCharacters() {
      this.$store.dispatch('characters/fetchCharacters')
    },
    handleSearch(term) {
      this.$store.dispatch('characters/setFilter', {
        key: 'name',
        value: term
      })
    },
    applyFilter(key, value) {
      this.$store.dispatch('characters/setFilter', { key, value })
    }
  },
  mounted() {
    this.loadCharacters()
  }
}
</script>

<style scoped>
.characters-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 15px 20px;
  font-size: 1em;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 20px;
  outline: none;
  transition: all 0.3s;
}

.search-input:focus {
  border-color: #4ecdc4;
  box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1);
}

select {
  padding: 12px;
  font-size: 1em;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  outline: none;
}

select:focus {
  border-color: #4ecdc4;
}

.loading {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4ecdc4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 30px;
}
</style>
