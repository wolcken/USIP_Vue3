<template>
  <div id="app">
    <nav class="navbar bg-primary navbar-expand-sm bg-body-tertiary" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"><img class="logo" alt="Vue logo" src="./assets/logo.png"> Vue
          3</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <!-- <router-link to="/categories">Categories</router-link> -->
              <a class="nav-link" href="#/categories">Categories</a>
            </li>
            <li class="nav-item">
              <!-- <router-link to="/products">Products</router-link> -->
              <a class="nav-link" href="#/products">Products</a>
            </li>
            <!-- <li class="nav-item">
              <router-link to="/">Home</router-link>
              <a class="nav-link" href="#/">Home</a>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script >

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  background-color: rgb(226, 238, 243);
}

.logo {
  width: 20px;
}

.nav-item a, .navbar-brand {
  text-decoration: none;
  color: white;
}

.navbar-toggler:hover {
  color: white;
}

.title {
  color: blue;
  font-weight: bold;
}
</style>
