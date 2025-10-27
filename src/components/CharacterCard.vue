<template>
  <div class="character-card">
    <div class="card-image">
      <img :src="character.image" :alt="character.name">
      <span :class="['status-badge', character.status.toLowerCase()]">
        {{ character.status }}
      </span>
    </div>
    <div class="card-content">
      <h3>{{ character.name }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',

  props: {
    character: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
.character-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.character-card:hover {
  transform: translateY(-5px);
}

.status-badge.alive {
  background: #55cc44;
}

.status-badge.dead {
  background: #d63d2e;
}
</style>
