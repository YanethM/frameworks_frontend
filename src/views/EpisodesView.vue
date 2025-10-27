<template>
  <div class="episodes-grid">
    <EpisodeCard
      v-for="episode in episodes"
      :key="episode.id"
      :episode="episode"
      @view-details="showModal"
    />
  </div>
</template>

<script>
import EpisodeCard from '../components/EpisodeCard.vue'

export default {
  components: { EpisodeCard },

  computed: {
    episodes() {
      return this.$store.state.episodes.episodes
    }
  },

  methods: {
    showModal(episode) {
      // Abrir modal con detalles
      console.log('Ver detalles de:', episode.name)
    }
  }
}
</script>
