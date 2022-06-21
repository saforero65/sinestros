<template>
  <div class="hello">
    <p>Aqui podras consultar los siniestros por fecha y hora</p>
    <h2>MENU</h2>
    <nav>
      <ul>
        <li>
          <router-link to="/mapa-calor">Visualizacion en Mapa</router-link>
        </li>
        <li>
          <router-link to="/tabla-siniestro"
            >Visualizacion en Tabla</router-link
          >
        </li>
      </ul>
    </nav>
    <!-- <index /> -->
  </div>
</template>

<script>
import { routes } from "router/demos";
import Index from "../d3-components/basic-map-tooltip/index.vue";
export default {
  components: { Index },
  data() {
    return {
      items: routes,
    };
  },
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
.hello {
  /* position: absolute; */
  display: flex;
  /* height: 100vh;
  width: 100vw;
  z-index: 9999999; */
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.hello nav ul {
  display: flex;
  /* height: 100vh;
  width: 100vw;
  z-index: 9999999; */
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.hello h2 {
  font-weight: bold;
}
ul {
  /*list-style-type: none;*/
  padding: 0;
  margin: auto;
  width: 300px;
}

li {
  /*display: inline-block;*/
  margin: 0 0px;
  list-style: decimal;
}

a {
  color: blue;
  display: block;
  text-decoration: none;
  text-align: left;
}

a:hover {
  text-decoration: underline;
}
</style>
