<template>
  <div id="app">
    <!-- Navbar con navegación -->
    <nav class="navbar">
      <div class="nav-brand">
        <router-link to="/">Rick & Morty Explorer</router-link>
      </div>

      <div class="nav-links">
        <router-link to="/">Inicio</router-link>
        <router-link to="/characters">Personajes</router-link>
        <router-link to="/episodes">Episodios</router-link>
        <router-link to="/locations">Locaciones</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f5f5;
}

#app {
  min-height: 100vh;
}

/* Navbar */
.navbar {
  background: white;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand a {
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: #4a5568;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s;
}

.nav-links a:hover {
  background: #f0f0f0;
  color: #667eea;
}

.nav-links a.router-link-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }

  .nav-links a {
    width: 100%;
  }
}
</style>
