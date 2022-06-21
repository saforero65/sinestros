<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link to="/">
            <img src="../assets/logo_sercoas.png" alt="" srcset="" />
          </router-link>
        </li>
        <li>
          <div class="tooltip">
            <a class="info" href="#">Información</a>
            <span class="tooltiptext"
              ><b>SERCOAS LTDA</b> <br />
              Consulte los <b>Siniestros</b> en un mapa de Calor Aqui podra
              consultar los siniestros por fecha y hora
            </span>
          </div>

          <a
            href="https://documenter.getpostman.com/view/16858046/UyxjG6Ci"
            target="_blanck"
          >
            <font-awesome-icon class="icon" icon="fa-solid fa-hat-wizard" />
          </a>

          <font-awesome-icon class="icon" icon="fa-solid fa-gear" />
          <font-awesome-icon
            v-if="expandir"
            @click="launchFullScreen()"
            class="icon"
            icon="fa-solid fa-expand"
          />
          <font-awesome-icon
            v-else
            @click="cancelFullScreen()"
            class="icon"
            icon="fa-solid fa-minimize"
          />
          <font-awesome-icon
            v-if="play"
            class="icon"
            icon="fa-solid fa-volume-off"
            @click="launchAudio()"
          />
          <font-awesome-icon
            v-else
            class="icon"
            icon="fa-solid fa-volume-high"
            @click="muteAudio()"
          />
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: "BarraHerammientas",
  data() {
    return {
      expandir: true,
      play: false,
    };
  },
  methods: {
    launchFullScreen() {
      let element = document.documentElement;
      if (element.requestFullScreen) {
        element.requestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      }
      this.expandir = false;
    },
    // Lanza en pantalla completa en navegadores que lo soporten
    cancelFullScreen() {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      this.expandir = true;
    },
    launchAudio() {},
    muteAudio() {},
  },
};
</script>
<style scoped>
img {
  height: 3rem;
  margin-bottom: 1rem;
}
nav {
  position: fixed;
  width: 100vw;
  bottom: 0;
  z-index: 999;
}
ul {
  position: absolute;
  bottom: 0;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  font-size: 1.4rem;
  width: 98%;
  font-family: "Exo 2", sans-serif;
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: black;
}
li:nth-child(1) {
  margin-left: 1rem;
  font-weight: 600;
  list-style: none;
}
li:nth-child(2) {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.4rem;
  /* width: 98%; */
}
.info {
  font-size: 1rem;
  font-weight: bold;

  margin-right: 1rem;
  transition-duration: 0.2s;
}
.icon {
  position: static;
  margin: 1rem 0.5rem;
  cursor: pointer;
  transition-duration: 0.2s;
}
.icon:hover,
.info:hover {
  transform: scale(1.1);
}
.tooltip {
  position: relative;
  display: inline-block;
  /* border-bottom: 1px dotted black; */
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 20rem;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  position: absolute;
  z-index: 1;
  bottom: 120%;
  left: -50%;
  margin-left: -60px;
  font-size: 1rem;
  line-height: 1.5rem;
}

.tooltip .tooltiptext::after {
  /* content: ""; */
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
