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
    <h2 v-show="tableDate">Total de Casos por Localidad</h2>

    <table v-show="tableDate" class="container table-sort table-arrows casos">
      <thead>
        <tr>
          <th>Localidad</th>
          <th>Casos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in statesData" :key="item.Zona">
          <td>{{ item.Zona }}</td>
          <td
            style="background: #fff5f0"
            v-if="
              item.totalCasos <= dominio[1] && item.totalCasos >= dominio[1 - 1]
            "
          >
            {{ item.totalCasos }}
          </td>
          <td
            style="background: #fee087"
            v-if="
              item.totalCasos < dominio[2] && item.totalCasos >= dominio[2 - 1]
            "
          >
            {{ item.totalCasos }}
          </td>
          <td
            style="background: #fec965"
            v-if="
              item.totalCasos < dominio[3] && item.totalCasos >= dominio[3 - 1]
            "
          >
            {{ item.totalCasos }}
          </td>
          <td
            style="background: #feab4b"
            v-if="
              item.totalCasos < dominio[4] && item.totalCasos >= dominio[4 - 1]
            "
          >
            {{ item.totalCasos }}
          </td>
          <td
            style="background: #fd893c"
            v-if="
              item.totalCasos < dominio[5] && item.totalCasos >= dominio[5 - 1]
            "
          >
            {{ item.totalCasos }}
          </td>
          <td
            style="background: #fa5c2e"
            v-if="
              item.totalCasos < dominio[6] && item.totalCasos >= dominio[6 - 1]
            "
          >
            {{ item.totalCasos }}
          </td>
          <td
            style="background: #ec3023"
            v-if="
              item.totalCasos < dominio[7] && item.totalCasos >= dominio[7 - 1]
            "
          >
            {{ item.totalCasos }}
          </td>
          <td
            style="background: #ec3023"
            v-if="
              item.totalCasos < dominio[8] && item.totalCasos >= dominio[8 - 1]
            "
          >
            {{ item.totalCasos }}
          </td>
          <td style="background: #d31121" v-if="item.totalCasos >= dominio[8]">
            {{ item.totalCasos }}
          </td>
        </tr>
      </tbody>
    </table>
    <h2 v-show="!tableDate">Casos por Horas Top 5 - Localidades</h2>
    <table v-show="!tableDate" class="container table-sort table-arrows horas">
      <thead>
        <tr>
          <th>Hora</th>

          <th>Localidad 1</th>

          <th>Localidad 2</th>

          <th>Localidad 3</th>

          <th>Localidad 4</th>

          <th>Localidad 5</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in statesDataHours" :key="item.Zona">
          <td v-if="item.horas === 0">{{ item.horas }}-{{ 2 }}</td>

          <td v-else>{{ item.horas }}-{{ item.horas + 2 }}</td>
          <td
            v-if="item.top5[0] < dominioCasosHora[0]"
            style="background: #fff0a9"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[0] }}</span>
            <div>{{ item.top5[1] }}</div>
            <span class="tooltiptext">{{ item.top5[0] }}</span>
          </td>

          <td
            v-if="
              item.top5[0] < dominioCasosHora[1] &&
              item.top5[0] >= dominioCasosHora[0]
            "
            style="background: #fec965"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[0] }}</span>
            <div>{{ item.top5[1] }}</div>
            <span class="tooltiptext">{{ item.top5[0] }}</span>
          </td>

          <td
            v-if="
              item.top5[0] < dominioCasosHora[2] &&
              item.top5[0] >= dominioCasosHora[1]
            "
            style="background: #fd893c"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[0] }}</span>
            <div>{{ item.top5[1] }}</div>
            <span class="tooltiptext">{{ item.top5[0] }}</span>
          </td>
          <td
            v-if="
              item.top5[0] < dominioCasosHora[3] &&
              item.top5[0] >= dominioCasosHora[2]
            "
            style="background: #fa5c2e"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[0] }}</span>
            <div>{{ item.top5[1] }}</div>
            <span class="tooltiptext">{{ item.top5[0] }}</span>
          </td>
          <td
            v-if="item.top5[0] >= dominioCasosHora[3]"
            style="background: #d31121"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[0] }}</span>
            <div>{{ item.top5[1] }}</div>
            <span class="tooltiptext">{{ item.top5[0] }}</span>
          </td>

          <td
            v-if="item.top5[2] < dominioCasosHora[0]"
            style="background: #fff0a9"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[2] }}</span>
            <div>{{ item.top5[3] }}</div>
            <span class="tooltiptext">{{ item.top5[2] }}</span>
          </td>

          <td
            v-if="
              item.top5[2] < dominioCasosHora[1] &&
              item.top5[2] >= dominioCasosHora[0]
            "
            style="background: #fec965"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[2] }}</span>
            <div>{{ item.top5[3] }}</div>
            <span class="tooltiptext">{{ item.top5[2] }}</span>
          </td>

          <td
            v-if="
              item.top5[2] < dominioCasosHora[2] &&
              item.top5[2] >= dominioCasosHora[1]
            "
            style="background: #fd893c"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[2] }}</span>
            <div>{{ item.top5[3] }}</div>
            <span class="tooltiptext">{{ item.top5[2] }}</span>
          </td>
          <td
            v-if="
              item.top5[2] < dominioCasosHora[3] &&
              item.top5[2] >= dominioCasosHora[2]
            "
            style="background: #fa5c2e"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[2] }}</span>
            <div>{{ item.top5[3] }}</div>
            <span class="tooltiptext">{{ item.top5[3] }}</span>
          </td>
          <td
            v-if="item.top5[2] >= dominioCasosHora[3]"
            style="background: #d31121"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[2] }}</span>
            <div>{{ item.top5[3] }}</div>
            <span class="tooltiptext">{{ item.top5[2] }}</span>
          </td>

          <td
            v-if="item.top5[4] < dominioCasosHora[0]"
            style="background: #fff0a9"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[4] }}</span>
            <div>{{ item.top5[5] }}</div>
            <span class="tooltiptext">{{ item.top5[4] }}</span>
          </td>

          <td
            v-if="
              item.top5[4] < dominioCasosHora[1] &&
              item.top5[4] >= dominioCasosHora[0]
            "
            style="background: #fec965"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[4] }}</span>
            <div>{{ item.top5[5] }}</div>
            <span class="tooltiptext">{{ item.top5[4] }}</span>
          </td>

          <td
            v-if="
              item.top5[4] < dominioCasosHora[2] &&
              item.top5[4] >= dominioCasosHora[1]
            "
            style="background: #fd893c"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[4] }}</span>
            <div>{{ item.top5[5] }}</div>
            <span class="tooltiptext">{{ item.top5[4] }}</span>
          </td>
          <td
            v-if="
              item.top5[4] < dominioCasosHora[3] &&
              item.top5[4] >= dominioCasosHora[2]
            "
            style="background: #fa5c2e"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[4] }}</span>
            <div>{{ item.top5[5] }}</div>
            <span class="tooltiptext">{{ item.top5[4] }}</span>
          </td>
          <td
            v-if="item.top5[4] >= dominioCasosHora[3]"
            style="background: #d31121"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[4] }}</span>
            <div>{{ item.top5[5] }}</div>
            <span class="tooltiptext">{{ item.top5[4] }}</span>
          </td>

          <td
            v-if="item.top5[6] < dominioCasosHora[0]"
            style="background: #fff0a9"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[6] }}</span>
            <div>{{ item.top5[7] }}</div>
            <span class="tooltiptext">{{ item.top5[6] }}</span>
          </td>

          <td
            v-if="
              item.top5[6] < dominioCasosHora[1] &&
              item.top5[6] >= dominioCasosHora[0]
            "
            style="background: #fec965"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[6] }}</span>
            <div>{{ item.top5[7] }}</div>
            <span class="tooltiptext">{{ item.top5[6] }}</span>
          </td>

          <td
            v-if="
              item.top5[6] < dominioCasosHora[2] &&
              item.top5[6] >= dominioCasosHora[1]
            "
            style="background: #fd893c"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[6] }}</span>
            <div>{{ item.top5[7] }}</div>
            <span class="tooltiptext">{{ item.top5[6] }}</span>
          </td>
          <td
            v-if="
              item.top5[6] < dominioCasosHora[3] &&
              item.top5[6] >= dominioCasosHora[2]
            "
            style="background: #fa5c2e"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[6] }}</span>
            <div>{{ item.top5[7] }}</div>
            <span class="tooltiptext">{{ item.top5[6] }}</span>
          </td>
          <td
            v-if="item.top5[6] >= dominioCasosHora[3]"
            style="background: #d31121"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[6] }}</span>
            <div>{{ item.top5[7] }}</div>
            <span class="tooltiptext">{{ item.top5[6] }}</span>
          </td>

          <td
            v-if="item.top5[8] < dominioCasosHora[0]"
            style="background: #fff0a9"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[8] }}</span>
            <div>{{ item.top5[9] }}</div>
            <span class="tooltiptext">{{ item.top5[8] }}</span>
          </td>

          <td
            v-if="
              item.top5[8] < dominioCasosHora[1] &&
              item.top5[8] >= dominioCasosHora[0]
            "
            style="background: #fec965"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[8] }}</span>
            <div>{{ item.top5[9] }}</div>
            <span class="tooltiptext">{{ item.top5[8] }}</span>
          </td>

          <td
            v-if="
              item.top5[8] < dominioCasosHora[2] &&
              item.top5[8] >= dominioCasosHora[1]
            "
            style="background: #fd893c"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[8] }}</span>
            <div>{{ item.top5[9] }}</div>
            <span class="tooltiptext">{{ item.top5[8] }}</span>
          </td>
          <td
            v-if="
              item.top5[8] < dominioCasosHora[3] &&
              item.top5[8] >= dominioCasosHora[2]
            "
            style="background: #fa5c2e"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[8] }}</span>
            <div>{{ item.top5[9] }}</div>
            <span class="tooltiptext">{{ item.top5[8] }}</span>
          </td>
          <td
            v-if="item.top5[8] >= dominioCasosHora[3]"
            style="background: #d31121"
            class="tooltip"
          >
            <span class="invisible"> {{ item.top5[8] }}</span>
            <div>{{ item.top5[9] }}</div>
            <span class="tooltiptext">{{ item.top5[8] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    dataLocalidades: Array,
    fechaaInicial: String,
    fechaaFinal: String,
    dominio: Array,
  },
  watch: {
    fechaaInicial(nuevoValor, valorAnterior) {
      console.log(
        "La fecha Incial pasó de ser %s a %s",
        valorAnterior,
        nuevoValor
      );
      this.fechaIncial = this.fechaaInicial;
    },
    dominio(nuevoValor, valorAnterior) {
      console.log("El dominio pasó de ser %s a %s", valorAnterior, nuevoValor);
      console.log(this.dominio);
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
      min: 0,
      max: 0,
      dominioCasosHora: [],
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
              this.dominioCasosHora.push(element.top5);
            });
            this.dominioCasosHora.forEach((item) => {
              item.forEach((item, index) => {
                if (!isNaN(item)) {
                  console.log(this.max);
                  if (this.max < parseInt(item)) {
                    console.log("es mayor", item, index);

                    this.max = item;
                  }
                }
              });
            });
            console.log(this.max);
            this.dominioCasosHora = [];
            let rango = Math.round(this.max / 5);
            for (let i = 0; i < 5; i++) {
              this.dominioCasosHora.push((this.min += rango));
            }

            console.log(this.dominioCasosHora);
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
  color: black;
}

.container td:nth-child(1) {
  color: white;
}

.container tr:hover {
  background-color: #464a52;
  -webkit-box-shadow: 0 6px 6px -6px #0e1119;
  -moz-box-shadow: 0 6px 6px -6px #0e1119;
  box-shadow: 0 6px 6px -6px #0e1119;
}

.container .tooltip:hover {
  background-color: black !important;
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
.tooltip {
  position: relative;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: white;
  color: #000;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 90%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
.horas tbody tr td:nth-child(2) {
  background: #ec3023;
}
.horas tbody tr td:nth-child(3) {
  background: #fa5c2e;
}
.horas tbody tr td:nth-child(4) {
  background: #fd893c;
}
.horas tbody tr td:nth-child(5) {
  background: #feab4b;
}
.horas tbody tr td:nth-child(6) {
  background: #fec965;
}
.casos tbody tr td:nth-child(2) {
  font-weight: bold;
}
.invisible {
  visibility: hidden;
  position: absolute;
}
</style>
