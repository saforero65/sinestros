<template>
  <div>
    <span class="atras">
      <a @click="setData">
        <font-awesome-icon class="icon" icon="fa-solid fa-map-location" />Mapa
        de Calor</a
      ></span
    >

    <span class="delante">
      <a @click="tableDate = !tableDate">
        <span v-if="tableDate"
          ><font-awesome-icon
            class="icon"
            icon="fa-solid fa-table"
          />Visualizacion por Hora</span
        >
        <span v-else
          ><font-awesome-icon
            class="icon"
            icon="fa-solid fa-bars"
          />Visualizacion por Casos
        </span>
      </a></span
    >
    <div class="fechas">
      <div class="rowFechas">
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

      <!-- <div class="rowTime">
        <input
          v-model="horaIncial"
          type="number"
          class="form-control"
          placeholder="Hora Inicial"
          name="primerFecha"
          min="1"
          max="24"
        />

        <input
          v-model="horaFinal"
          type="number"
          class="form-control"
          placeholder="Hora Final"
          name="segundaFecha"
          min="1"
          max="24"
        />

        <button
          @click="actualizarQueryTime()"
          type="submit"
          class="btn btn-primary"
        >
          SubFiltro
        </button>
      </div> -->
    </div>
    <!-- {{ statesData }} -->
    <table v-show="tableDate" class="container table-sort table-arrows">
      <thead>
        <tr>
          <th>Localidad</th>
          <th>Casos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in statesData" :key="item.Zona">
          <td>{{ item.Zona }}</td>
          <td>{{ item.totalCasos }}</td>
        </tr>
      </tbody>
    </table>
    <table v-show="!tableDate" class="container table-sort table-arrows">
      <thead>
        <tr>
          <th>Hora</th>
          <th>#1</th>
          <th>Localidad 1</th>
          <th>#2</th>
          <th>Localidad 2</th>
          <th>#3</th>
          <th>Localidad 3</th>
          <th>#4</th>
          <th>Localidad 4</th>
          <th>#5</th>
          <th>Localidad 5</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in statesDataHours" :key="item.Zona">
          <td v-if="item.horas === 0">{{ item.horas }}-{{ 2 }}</td>

          <td v-else>{{ item.horas }}-{{ item.horas + 2 }}</td>
          <td>{{ item.top5[0] }}</td>
          <td>{{ item.top5[1] }}</td>
          <td>{{ item.top5[2] }}</td>
          <td>{{ item.top5[3] }}</td>
          <td>{{ item.top5[4] }}</td>
          <td>{{ item.top5[5] }}</td>
          <td>{{ item.top5[6] }}</td>
          <td>{{ item.top5[7] }}</td>
          <td>{{ item.top5[8] }}</td>
          <td>{{ item.top5[9] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: { dataLocalidades: Array, fechaaInicial: String, fechaaFinal: String },
  watch: {
    fechaaInicial(nuevoValor, valorAnterior) {
      console.log(
        "La fecha Incial pasó de ser %s a %s",
        valorAnterior,
        nuevoValor
      );
      this.fechaIncial = this.fechaaInicial;
    },
    fechaaFinal(nuevoValor, valorAnterior) {
      console.log(
        "La fecha Final pasó de ser %s a %s",
        valorAnterior,
        nuevoValor
      );
      this.fechaFinal = this.fechaaFinal;
    },
    dataLocalidades(nuevoValor, valorAnterior) {
      console.log(
        "ENVIANDO DATA pasó de ser %s a %s",
        valorAnterior,
        nuevoValor
      );
      this.statesData = this.dataLocalidades;
      console.log("fechas", this.fechaFinal, this.fechaaInicial);
      this.peticionGetHours();
    },
  },
  data() {
    return {
      tableDate: false,
      statesData: [],
      statesDataHours: [],
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
      STATES_DATA_PATH2: "",
    };
  },
  methods: {
    setData() {
      this.$emit("getData", true);
    },
    peticionGet() {
      fetch(this.STATES_DATA_PATH)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.statesData = data;
          this.$emit("updateData", this.statesData);
        });
    },
    peticionGetHours() {
      if (this.fechaIncial && this.fechaFinal) {
        this.STATES_DATA_PATH2 = `https://rest-server-siniestros.herokuapp.com/casosHoras/${this.fechaIncial}/${this.fechaFinal}`;
        fetch(this.STATES_DATA_PATH2)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.statesDataHours = data;
            this.statesDataHours.forEach((element) => {
              element.top5 = element.top5.split(",");
            });
            console.log(this.statesDataHours);
            this.$emit("updateHour", this.fechaFinal);
          });
      }
    },
    actualizarQuery() {
      if (this.fechaIncial && this.fechaFinal) {
        console.log(document.getElementById("titulo"));
        document.getElementById("titulo").textContent =
          "Casos de " + this.fechaIncial + " a " + this.fechaFinal;

        console.log(this.fechaIncial);
        console.log(this.fechaFinal);
        this.STATES_DATA_PATH = `https://rest-server-siniestros.herokuapp.com/casosTotales/${this.fechaIncial}/${this.fechaFinal}`;
        // this.STATES_DATA_PATH2 = `https://rest-server-siniestros.herokuapp.com/casosHoras/${this.fechaIncial}/${this.fechaFinal}`;
        // this.STATES_DATA_PATH = `http://localhost:8081/casosTotales/${this.fechaIncial}/${this.fechaFinal}`;

        this.peticionGet();
        this.peticionGetHours();
      }
    },
    actualizarQueryTime() {
      if (
        this.fechaIncial &&
        this.fechaFinal &&
        this.horaIncial > 0 &&
        this.horaFinal <= 24
      ) {
        console.log(this.fechaIncial);
        console.log(this.fechaFinal);
        console.log(this.horaIncial);
        console.log(this.horaFinal);
        this.STATES_DATA_PATH = `https://rest-server-siniestros.herokuapp.com/casosTotales/${this.fechaIncial}/${this.fechaFinal}/${this.horaIncial}/${this.horaFinal}`;
        this.peticionGet();
      } else {
      }
    },
  },
};
</script>
<style>
th {
  font-weight: bold;
  font-size: 1.1rem;
  color: white;
}
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
.delante a span:hover {
  color: #ff6b3d;
  cursor: pointer;
}
.atras a,
.delante a span {
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
.container th h1 {
  font-weight: bold;
  font-size: 1em;
  text-align: left;
  color: white;
}

.container {
  text-align: left;
  overflow: hidden;
  width: 80%;
  margin: 0 auto;
  display: table;
  /* padding: 0 0 8em 0; */
  border-radius: 2rem;
  margin-bottom: 6rem;
}

.container td,
.container th {
  padding-bottom: 1.2%;
  padding-top: 1.2%;
  padding-left: 2%;
}

/* Background-color of the odd rows */
.container tr:nth-child(odd) {
  background-color: #323c50;
}

/* Background-color of the even rows */
.container tr:nth-child(even) {
  background-color: #2c3446;
}

.container th {
  background-color: #1f2739;
}

.container td {
  color: #ffffff;
}

.container tr:hover {
  background-color: #464a52;
  -webkit-box-shadow: 0 6px 6px -6px #0e1119;
  -moz-box-shadow: 0 6px 6px -6px #0e1119;
  box-shadow: 0 6px 6px -6px #0e1119;
}

.container td:hover {
  background-color: #ff6b3d;
  color: white;
  /* font-weight: bold; */

  /* box-shadow: #7f7c21 -1px 1px, #7f7c21 -2px 2px, #7f7c21 -3px 3px,
    #7f7c21 -4px 4px, #7f7c21 -5px 5px, #7f7c21 -6px 6px; */
  /* transform: translate3d(6px, -6px, 0); */
}

@media (max-width: 800px) {
  .container td:nth-child(4),
  .container th:nth-child(4) {
    display: none;
  }
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
.fechas {
  position: static;
  z-index: 99999;
  margin: auto;
  left: 0;
  right: 0;
  width: fit-content;
  margin-bottom: 2rem;
}
</style>
