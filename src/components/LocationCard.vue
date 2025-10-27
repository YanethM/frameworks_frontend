<template>
  <div class="location-card">
    <h3>{{ location.name }}</h3>
    <div class="location-info">
      <p><strong>Tipo:</strong> {{ location.type }}</p>
      <p><strong>Dimensión:</strong> {{ location.dimension }}</p>
      <p><strong>Residentes:</strong> {{ location.residents.length }}</p>
    </div>
  </div>
</template>
