<template>
  <svg :width="width" :height="height"></svg>
</template>

<script>
const d3 = require("d3");
const topojson = require("topojson");

export default {
  props: { dataLocalidades: Array },
  data() {
    return {
      width: window.innerWidth - 200,
      height: window.innerHeight,
      g: null,
      svg: null,
    };
  },
  watch: {
    dataLocalidades(nuevoValor, valorAnterior) {
      console.log("El nombrse pasó de ser %s a %s", valorAnterior, nuevoValor);
      if (document.getElementById("mapa")) {
        // console.log("entro", document.getElementById("mapa"));

        document.getElementById("mapa").remove();
        document.getElementById("localidades").remove();
      }
      this.map();
    },
  },
  methods: {
    onWindowResize() {
      console.log("resize");
      this.width = window.innerWidth;

      // console.log(this.width);
      // this.map();
    },
    map() {
      let valueArray = this.dataLocalidades;
      let array = [];
      let dominio = [];
      console.log(valueArray);
      valueArray.forEach((e) => {
        return array.push(e.totalCasos);
      });
      let max = Math.max(...array);

      // let min = Math.min(...array);
      // if (min === max) {
      //   min = 0;
      // }
      let min = 0;
      console.log(min, max);
      dominio.push(Math.round(min));
      const intervalo = max / 8;
      for (let i = 0; i < 8; i++) {
        dominio.push(Math.round((min += intervalo)));
      }
      console.log(dominio);
      if (dominio[8] > 0) {
        var color = d3
          .scaleThreshold()
          .domain(dominio)
          .range([
            "#fff5f0",
            "#fff5f0",
            "#fee087",
            "#fec965",
            "#feab4b",
            "#fd893c",
            "#fa5c2e",
            "#ec3023",
            "#d31121",
            "#af0225",
            "#800026",
          ]);
      } else {
        var color = d3
          .scaleThreshold()
          .domain(dominio)
          .range([
            "#fff5f0",
            "#fff5f0",
            "#fff5f0",
            "#fff5f0",
            "#fff5f0",
            "#fff5f0",
            "#fff5f0",
            "#fff5f0",
            "#fff5f0",
          ]);
      }

      var v = this;
      this.svg = d3
        .select(this.$el)
        .attr("viewBox", "0 0 " + this.width + " " + this.height)
        .attr("preserveAspectRatio", "xMinYMin");

      var projection = d3
        .geoMercator()
        .rotate([74.1, -4.5, 90.0])
        .scale(83000 * 1)
        .translate([this.width / 3, this.height / 3]);
      var path = d3.geoPath().projection(projection);

      d3.json("static/data/bta_localidades.json", (error, bta_localidades) => {
        this.g = this.svg.append("g").attr("id", "mapa");
        this.g
          .selectAll(".state")
          .data(
            topojson.feature(
              bta_localidades,
              bta_localidades.objects.bta_localidades
            ).features
          )
          .enter()
          .append("path")
          .attr("class", "state")
          .attr("d", path)
          .style("fill", (localidad) => {
            // console.log(localidad);
            // console.log("s", this.dataLocalidades);
            var paringData = this.dataLocalidades.filter(function (p) {
              return localidad.properties.NOMBRE === p.Zona;
            })[0];
            return paringData ? color(paringData.totalCasos) : color(0);
          })
          .on("mouseover", function (d) {
            // console.log(d.properties.NOMBRE);
            console.log(d);
            d3.select(this).style("stroke-width", 1.7).style("opacity", 0.3);
            v.$emit("stateSelected", d.properties.NOMBRE);
          })
          .on("mouseout", function (d) {
            d3.select(this).style("stroke-width", 0.5).style("opacity", 1);

            v.$emit("stateDeselected", d.properties.NOMBRE);
          });
        this.g.attr("transform", "scale(1)");

        this.svg
          .append("g")
          .attr("id", "localidades")
          .selectAll("path")
          .data(
            topojson.feature(
              bta_localidades,
              bta_localidades.objects.bta_localidades
            ).features
          )
          .enter()
          .append("text")
          .attr(
            "transform",
            (d) => `translate(${path.centroid(d)[0]},${path.centroid(d)[1]})`
          )
          .attr("text-anchor", "bold")
          .attr("font-size", ".8rem")
          .text((d) => d.properties.NOMBRE);
      });
      this.$emit("getScale", dominio);
    },
  },
  created() {
    // console.log("localidades", this.dataLocalidades);
  },
  // TODO: fire events
};
</script>

<style>
svg {
  position: absolute;
  z-index: 1;
  margin: auto;
  /* margin: auto; */
  /* margin-bottom: 16rem; */
  /* height: auto; */
  /* width: fit-content; */
  left: 0;
  right: 0;
  /* bottom: 0; */
  /* top: calc(100vh); */
  top: -1rem;
}
.state {
  fill: #ccc;
  stroke: rgb(0, 0, 0);
  opacity: 1;
}
.state:hover {
  opacity: 0;
}
.state:hover {
  fill: steelblue;
}
</style>
