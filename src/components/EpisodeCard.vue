<template>
  <div class="episode-card">
    <!-- Header con código y fecha -->
    <div class="episode-header">
      <div class="episode-badges">
        <span class="episode-code">{{ episode.episode }}</span>
        <span class="season-badge">{{ seasonName }}</span>
      </div>
      <span class="air-date">📅 {{ formattedDate }}</span>
    </div>

    <!-- Contenido principal -->
    <div class="episode-content">
      <h3 class="episode-title">{{ episode.name }}</h3>

      <div class="episode-info">
        <span class="info-item">
          👥 {{ episode.characters.length }} personajes
        </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'EpisodeCard',

  props: {
    episode: {
      type: Object,
      required: true,
      validator(value) {
        // Validar que el episodio tenga las propiedades necesarias
        return value.id && value.name && value.episode
      }
    }
  },

  computed: {
    // Verifica si está en favoritos
    isFavorite() {
      return this.$store.getters.isFavorite(this.episode.id, 'episode')
    },

    // Extrae el nombre de la temporada (S01 → Temporada 1)
    seasonName() {
      const seasonNumber = this.episode.episode.substring(1, 3)
      return `T${parseInt(seasonNumber)}`
    },

    // Formatea la fecha (December 2, 2013 → 2 dic 2013)
    formattedDate() {
      if (!this.episode.air_date) return 'Fecha desconocida'

      const date = new Date(this.episode.air_date)

      // Verifica si la fecha es válida
      if (isNaN(date.getTime())) return this.episode.air_date

      const options = { day: 'numeric', month: 'short', year: 'numeric' }
      return date.toLocaleDateString('es-ES', options)
    }
  },

  methods: {
    // Agregar/quitar de favoritos
    toggleFavorite() {
      if (this.isFavorite) {
        this.$store.commit('REMOVE_FAVORITE', {
          id: this.episode.id,
          type: 'episode'
        })
      } else {
        this.$store.commit('ADD_FAVORITE', {
          id: this.episode.id,
          type: 'episode',
          name: this.episode.name,
          episode: this.episode.episode,
          air_date: this.episode.air_date
        })
      }
    },
    viewDetails() {
      this.$store.dispatch('episodes/fetchEpisodeById', this.episode.id)
      this.$emit('view-details', this.episode)
    }
  }
}
</script>

<style scoped>
/* Card Principal */
.episode-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
}

.episode-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Header */
.episode-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
}

.episode-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.episode-code {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.9em;
  letter-spacing: 0.5px;
}

.season-badge {
  background: #e0e0e0;
  color: #333;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85em;
}

.air-date {
  color: #666;
  font-size: 0.9em;
  white-space: nowrap;
}

/* Contenido */
.episode-content {
  flex: 1;
}

.episode-title {
  margin: 0 0 10px 0;
  font-size: 1.2em;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.episode-info {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.info-item {
  color: #666;
  font-size: 0.95em;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Botones de Acción */
.episode-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.btn-favorite,
.btn-details {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95em;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-favorite {
  background: #f0f0f0;
  color: #666;
  flex: 0 0 auto;
  min-width: 50px;
}

.btn-favorite.active {
  background: #ff6b6b;
  color: white;
  transform: scale(1.05);
}

.btn-favorite:hover {
  transform: scale(1.1);
}

.btn-details {
  background: #4ecdc4;
  color: white;
}

.btn-details:hover {
  background: #45b7af;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(78, 205, 196, 0.3);
}

/* Responsive */
@media (max-width: 480px) {
  .episode-card {
    padding: 15px;
  }

  .episode-title {
    font-size: 1.1em;
  }

  .episode-actions {
    flex-direction: column;
  }

  .btn-favorite {
    flex: 1;
    min-width: auto;
  }
}
</style>
