<template>
  <div id="holder">
    <tabla-registros
      :dataLocalidades="statesData"
      :fechaaInicial="fechaIncial"
      :fechaaFinal="fechaFinal"
      @getData="getData"
      @updateData="updateData"
      @updateHour="updateHour"
      v-show="tabla_registros"
    />
    <div v-show="!tabla_registros">
      <div class="palete_colors">
        <div class="square_color">
          <span>{{ domain[0] }}</span>
        </div>
        <div class="square_color">
          <span>{{ domain[1] }}</span>
        </div>
        <div class="square_color">
          <span>{{ domain[2] }}</span>
        </div>
        <div class="square_color">
          <span>{{ domain[3] }}</span>
        </div>
        <div class="square_color">
          <span>{{ domain[4] }}</span>
        </div>
        <div class="square_color">
          <span>{{ domain[5] }}</span>
        </div>
        <div class="square_color">
          <span>{{ domain[6] }}</span>
        </div>
        <div class="square_color">
          <span>{{ domain[7] }}</span>
        </div>
        <div class="square_color">
          <span>{{ domain[8] }}</span>
        </div>
      </div>
      <span class="atras">
        <a @click="tabla_registros = true">
          <font-awesome-icon
            class="icon"
            icon="fa-solid fa-table"
          />Visualizacion de registros</a
        ></span
      >
      <div class="fechas">
        <div class="rowFechas">
          <label> Fecha</label>
          <input
            v-model="fechaIncial"
            type="date"
            class="form-control"
            placeholder="1ra fecha"
            name="primerFecha"
          />

          <input
            v-model="fechaFinal"
            type="date"
            class="form-control"
            placeholder="2da fecha"
            name="segundaFecha"
          />
          <button
            @click="actualizarQuery()"
            type="submit"
            class="btn btn-primary"
          >
            Filtrar
          </button>
        </div>
      </div>
      <top-five :dataLocalidades="statesData" />
      <div class="mapHolder">
        <us-map
          v-on:stateSelected="onStateSelected"
          v-on:stateDeselected="onStateDeselected"
          :dataLocalidades="statesData"
          @getScale="getScale"
        />
      </div>
      <tooltip
        v-if="currentState"
        :title="title"
        :description="currentStateDescription"
      />
    </div>
  </div>
</template>

<script>
var _ = require("lodash");

const map = require("d3-components/basic-map-tooltip/map");
const tooltip = require("d3-components/basic-map-tooltip/tooltip");

// const STATES_DATA_PATH = "static/data/states-data.csv";
// const STATES_DATA_PATH = "static/data/siniestros.json";

// lets load with vue-resource, but parse with d3
// just because we can
import * as d3 from "d3-dsv";
import TopFive from "../../components/topFive.vue";
import TablaRegistros from "../../components/tablaRegistros.vue";

export default {
  components: {
    usMap: map,
    tooltip: tooltip,
    TopFive,
    TablaRegistros,
  },
  created: function () {
    this.peticionGet();
  },
  data: function () {
    return {
      tabla_registros: false,
      statesData: undefined,
      currentState: 0,
      title: "",
      fechaIncial: "2019-01-08",
      fechaFinal:
        new Date().getFullYear() +
        "-" +
        String(new Date().getMonth() + 1).padStart(2, "0") +
        "-" +
        String(new Date().getDate()).padStart(2, "0"),
      horaIncial: "",
      horaFinal: "",
      STATES_DATA_PATH:
        "https://rest-server-siniestros.herokuapp.com/casosTotales",
      // STATES_DATA_PATH: "http://localhost:8081/casosTotales",
      domain: [],
    };
  },
  computed: {
    currentStateDescription: function () {
      // console.log(this.currentState);
      if (!this.currentState.totalCasos) {
        this.currentState = "0";
        // console.log(this.currentState);
        return "Total de Casos: " + this.currentState;
      } else {
        // console.log(this.currentState);
        return "Total de Casos: " + this.currentState.totalCasos;
      }
    },
  },
  methods: {
    getScale(data) {
      console.log("entro el doimino", data);
      this.domain = data;
    },
    getData() {
      this.tabla_registros = false;
    },
    updateData(data) {
      this.statesData = data;
    },
    updateHour(data) {
      this.fechaFinal = data;
    },
    peticionGet() {
      fetch(this.STATES_DATA_PATH)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.statesData = data;
        });
    },
    actualizarQuery() {
      if (this.fechaIncial && this.fechaFinal) {
        document.getElementById("titulo").textContent =
          "Casos de " + this.fechaIncial + " a " + this.fechaFinal;

        console.log(this.fechaIncial);
        console.log(this.fechaFinal);
        this.STATES_DATA_PATH = `https://rest-server-siniestros.herokuapp.com/casosTotales/${this.fechaIncial}/${this.fechaFinal}`;
        console.log(this.fechaIncial);
        console.log(this.fechaFinal);
        this.peticionGet();
      }
    },
    actualizarQueryTime() {
      console.log(this.fechaIncial);
      console.log(this.fechaFinal);
      console.log(this.horaIncial);
      console.log(this.horaFinal);
      this.STATES_DATA_PATH = `https://rest-server-siniestros.herokuapp.com/casosTotales/${this.fechaIncial}/${this.fechaFinal}/${this.horaIncial}/${this.horaFinal}`;
      this.peticionGet();
    },
    onStateSelected: function (stateCode) {
      this.title = stateCode;

      for (let i = 0; i < this.statesData.length; i++) {
        if (this.statesData[i].Zona == stateCode) {
          this.currentState = this.statesData[i];
        }
      }
      if (this.currentState == undefined) {
        this.currentState = "0";
      }
      // console.log(this.currentState);
    },
    onStateDeselected: function (stateCode) {
      this.currentState = undefined;
    },
  },
};
</script>

<style scoped>
.atras {
  color: #0e1119;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  margin: 1.2rem;
}
.delante {
  color: #0e1119;
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  margin: 1.2rem;
  margin-right: 2rem;
}
.atras a:hover,
.delante a:hover {
  color: #ff6b3d;
}
.atras a,
.delante a {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;
}
.icon {
  position: static;
  margin: 1rem 0.5rem;
  cursor: pointer;
}
.fechas {
  position: absolute;
  z-index: 99999;
  margin: auto;
  left: 40rem;
  right: 0;
  width: fit-content;
}
#holder {
  position: absolute;
  height: auto;
  width: 100%;
  margin: auto;
}
.mapHolder {
  position: absolute;
  margin: auto;
  height: auto;
  width: 100%;
}

.well {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.form-group {
  width: 300px;
}

label,
input {
  display: block;
  font-size: 16px;
  font-family: sans-serif;
}

label {
  margin-bottom: 10px;
  font-weight: bold;
}

input {
  padding: 12px 16px;
  width: 100%;
  border-radius: 3px;
  border: none;
  outline: 2px solid #efefef;
  margin: 0.5rem;
}
button {
  height: 3rem;
  width: 12rem;
  border-radius: 10px;
  background: rgb(20, 98, 255);
  border: none;
  font-weight: bold;
  border: 1px solid black;
}
button:hover {
  background: rgb(0, 52, 156);
  color: white;
}
.rowFechas,
.rowTime {
  display: flex;
  align-items: center;
  justify-content: center;
}
.palete_colors {
  display: flex;

  position: absolute;
  z-index: 99999;
  right: 0;
  top: 0;
  bottom: -155vh;
  left: 30rem;
  height: fit-content;
  margin: auto;
  margin-right: 8rem;
}
.square_color {
  height: 50px;
  width: 50px;
}
.square_color span {
  position: relative;
  top: -1rem;
  right: 1.5rem;
}

.square_color:nth-child(1) {
  background: #fff5f0;
}
.square_color:nth-child(2) {
  background: #fff0a9;
}
.square_color:nth-child(3) {
  background: #fee087;
}
.square_color:nth-child(4) {
  background: #fec965;
}
.square_color:nth-child(5) {
  background: #feab4b;
}
.square_color:nth-child(6) {
  background: #fd893c;
}
.square_color:nth-child(7) {
  background: #fa5c2e;
}
.square_color:nth-child(8) {
  background: #ec3023;
}
.square_color:nth-child(9) {
  background: #d31121;
}
label {
  margin: 1rem;
  width: 2rem;
}
</style>
