const config = require("config.json");

export const routes = [
  {
    name: "Mapa Siniestros",
    path: "/mapa-calor",
    folder: true,
    component: require("d3-components/basic-map-tooltip/index"),
  },
  {
    name: "Registros Siniestos",
    path: "/tabla-siniestro",
    folder: true,
    component: require("components/tablaRegistros"),
  },
].map((r) => {
  var res = r;
  res.source =
    config.githubLink +
    config.d3ComponentsPath +
    r.path +
    (r.folder ? "" : ".vue");
  return res;
});
