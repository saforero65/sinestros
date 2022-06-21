<template>
  <div>
    <ul class="topfive">
      <h4>Localidades con mayores casos</h4>
      <li v-for="(item, index) in top" :key="index">
        {{ item.Zona }} - {{ item.totalCasos }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: { dataLocalidades: Array },
  data() {
    return {
      top: [],
    };
  },
  watch: {
    dataLocalidades(nuevoValor, valorAnterior) {
      console.log("El nombrse pasó de ser %s a %s", valorAnterior, nuevoValor);
      this.topFive();
    },
  },
  methods: {
    topFive() {
      this.top = [];
      if (this.dataLocalidades.length > 5) {
        for (let i = 0; i < 5; i++) {
          this.top.push(this.dataLocalidades[i]);
        }
      } else {
        for (let i = 0; i < this.dataLocalidades.length; i++) {
          this.top.push(this.dataLocalidades[i]);
        }
      }
    },
  },
};
</script>
<style scoped>
.topfive {
  position: absolute;
  list-style-type: decimal;
  height: fit-content;
  width: fit-content;
  /* margin: auto; */
  bottom: -82vh;
  /* top: 0; */

  left: 2rem;
  text-align: start;
}
.topfive li {
  margin-left: 2rem;
}
</style>
