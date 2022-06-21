<template>
  <div id="app">
    <!-- <img src="./assets/logo_sercoas.png" alt="" srcset="" /> -->
    <h1 id="titulo">Consulta de Siniestros</h1>
    <!-- <h2>{{ $route.name }}</h2> -->
    <!-- <top-nav /> -->

    <router-view></router-view>
    <!-- <barra-herramientas /> -->
  </div>
</template>

<script>
// import BarraHerramientas from "./components/BarraHerramientas.vue";
// import topNav from "./components/demos-navigation";

export default {
  name: "app",
  components: {},
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 30px;
}
a {
  color: black;
  text-decoration: none;
}
</style>
