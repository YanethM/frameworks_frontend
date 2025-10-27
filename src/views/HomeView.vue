<template>
  <div class="home-view">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Rick & Morty Explorer</h1>
        <p class="hero-subtitle">
          Plataforma de exploración completa del universo Rick and Morty
        </p>
      </div>

      <div class="hero-image">
        <img
          src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          alt="Rick Sanchez"
          class="avatar-img"
        >
        <img
          src="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
          alt="Morty Smith"
          class="avatar-img"
        >
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Cargando estadísticas del sistema...</p>
    </div>

    <!-- Stats Grid -->
    <div v-if="!loading" class="stats-section">
      <h2 class="section-title">Estadísticas Generales</h2>

      <div class="stats-grid">
        <div class="stat-card characters">
          <div class="stat-header">
            <div class="stat-icon-wrapper">
              <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span class="stat-label">Personajes</span>
          </div>
          <h2 class="stat-number">{{ totalCharacters }}</h2>
          <router-link to="/characters" class="stat-link">
            Ver catálogo completo
          </router-link>
        </div>

        <div class="stat-card episodes">
          <div class="stat-header">
            <div class="stat-icon-wrapper">
              <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                <polyline points="17 2 12 7 7 2"></polyline>
              </svg>
            </div>
            <span class="stat-label">Episodios</span>
          </div>
          <h2 class="stat-number">{{ totalEpisodes }}</h2>
          <router-link to="/episodes" class="stat-link">
            Ver lista de episodios
          </router-link>
        </div>

        <div class="stat-card locations">
          <div class="stat-header">
            <div class="stat-icon-wrapper">
              <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <span class="stat-label">Locaciones</span>
          </div>
          <h2 class="stat-number">{{ totalLocations }}</h2>
          <router-link to="/locations" class="stat-link">
            Explorar universos
          </router-link>
        </div>


      </div>
    </div>

    <!-- Quick Links -->
    <div class="quick-links-section">
      <h2 class="section-title">Navegación Rápida</h2>

      <div class="quick-links">
        <router-link to="/characters" class="quick-link-card">
          <div class="link-icon-wrapper">
            <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h3>Personajes</h3>
        </router-link>

        <router-link to="/episodes" class="quick-link-card">
          <div class="link-icon-wrapper">
            <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
              <polyline points="17 2 12 7 7 2"></polyline>
            </svg>
          </div>
          <h3>Episodios</h3>
        </router-link>

        <router-link to="/locations" class="quick-link-card">
          <div class="link-icon-wrapper">
            <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h3>Locaciones</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',

  data() {
    return {
      loading: false
    }
  },

  computed: {
    totalCharacters() {
      return this.$store.state.characters.pagination.totalCount || 0
    },

    totalEpisodes() {
      return this.$store.state.episodes.pagination.totalCount || 0
    },

    totalLocations() {
      return this.$store.state.locations.pagination.totalCount || 0
    },

    favoriteCount() {
      return this.$store.getters.favoriteCount || 0
    },

    hasData() {
      return this.totalCharacters > 0 || this.totalEpisodes > 0 || this.totalLocations > 0
    }
  },

  methods: {
    async loadInitialData() {
      this.loading = true

      try {
        const promises = []

        if (this.totalCharacters === 0) {
          promises.push(this.$store.dispatch('characters/fetchCharacters'))
        }

        if (this.totalEpisodes === 0) {
          promises.push(this.$store.dispatch('episodes/fetchEpisodes'))
        }

        if (this.totalLocations === 0) {
          promises.push(this.$store.dispatch('locations/fetchLocations'))
        }

        await Promise.all(promises)
      } catch (error) {
        console.error('Error al cargar datos iniciales:', error)
      } finally {
        this.loading = false
      }
    }
  },

  mounted() {
    if (!this.hasData) {
      this.loadInitialData()
    }
  }
}
</script>

<style scoped>
/* Container Principal */
.home-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 40px;
  border-radius: 20px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.hero-content {
  flex: 1;
}

.hero-title {
  font-size: 3em;
  margin: 0 0 15px 0;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 1.3em;
  opacity: 0.95;
  margin: 0 0 15px 0;
  line-height: 1.5;
  font-weight: 500;
}

.hero-description {
  font-size: 1em;
  opacity: 0.85;
  margin: 0;
  line-height: 1.6;
}

.hero-image {
  display: flex;
  gap: 15px;
}

.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 5px solid white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.avatar-img:hover {
  transform: scale(1.05);
}

/* Loading */
.loading {
  text-align: center;
  padding: 60px 20px;
}

.loading p {
  color: #666;
  font-size: 1.1em;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Sections */
.stats-section,
.quick-links-section,
.features-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 2em;
  text-align: center;
  margin-bottom: 40px;
  color: #2d3748;
  font-weight: 700;
  letter-spacing: -0.5px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid currentColor;
}

.stat-card.characters {
  color: #667eea;
}

.stat-card.episodes {
  color: #f093fb;
}

.stat-card.locations {
  color: #4facfe;
}

.stat-card.favorites {
  color: #ff6b6b;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.stat-icon-wrapper {
  width: 48px;
  height: 48px;
  background: currentColor;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.1;
}

.stat-icon {
  width: 24px;
  height: 24px;
  stroke-width: 2.5;
  color: currentColor;
  opacity: 10;
}

.stat-label {
  font-size: 1em;
  color: #4a5568;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-number {
  font-size: 3em;
  margin: 0 0 15px 0;
  font-weight: 700;
  color: currentColor;
}

.stat-link {
  display: inline-block;
  padding: 10px 20px;
  background: currentColor;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9em;
  transition: all 0.3s;
  opacity: 0.9;
}

.stat-link:hover {
  opacity: 1;
  transform: translateX(5px);
}

/* Quick Links */
.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.quick-link-card {
  background: white;
  border-radius: 15px;
  padding: 35px;
  text-decoration: none;
  color: #2d3748;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.quick-link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.link-icon-wrapper {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.link-icon {
  width: 32px;
  height: 32px;
  stroke-width: 2;
  color: white;
}

.quick-link-card h3 {
  margin: 0;
  font-size: 1.4em;
  color: #2d3748;
  font-weight: 700;
}

.quick-link-card p {
  margin: 0;
  color: #718096;
  line-height: 1.6;
  font-size: 0.95em;
}

/* Features Section */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
}

.feature-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.feature-icon-wrapper {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.feature-icon {
  width: 36px;
  height: 36px;
  stroke-width: 2;
  color: #667eea;
}

.feature-card h3 {
  margin: 0 0 12px 0;
  font-size: 1.2em;
  color: #2d3748;
  font-weight: 700;
}

.feature-card p {
  margin: 0;
  color: #718096;
  line-height: 1.6;
  font-size: 0.95em;
}

/* Footer Info */
.footer-info {
  text-align: center;
  padding: 35px;
  background: #f7fafc;
  border-radius: 12px;
  margin-top: 60px;
  border: 1px solid #e2e8f0;
}

.footer-info p {
  margin: 0 0 8px 0;
  color: #718096;
  font-size: 0.95em;
}

.footer-note {
  font-size: 0.85em;
  color: #a0aec0;
}

.footer-info a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.footer-info a:hover {
  color: #5568d3;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    padding: 40px 25px;
    text-align: center;
  }

  .hero-title {
    font-size: 2em;
  }

  .hero-subtitle {
    font-size: 1.1em;
  }

  .hero-description {
    font-size: 0.95em;
  }

  .hero-image {
    justify-content: center;
  }

  .avatar-img {
    width: 90px;
    height: 90px;
  }

  .section-title {
    font-size: 1.6em;
  }

  .stat-number {
    font-size: 2.5em;
  }

  .stats-grid,
  .quick-links,
  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .home-view {
    padding: 15px;
  }

  .hero-section {
    padding: 30px 20px;
  }

  .hero-title {
    font-size: 1.6em;
  }

  .stat-card,
  .quick-link-card,
  .feature-card {
    padding: 25px;
  }

  .link-icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .link-icon {
    width: 28px;
    height: 28px;
  }
}
</style>
