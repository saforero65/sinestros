// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faExpand,
  faForward,
  faGear,
  faHatWizard,
  faMapLocation,
  faMinimize,
  faShapes,
  faTable,
  faVolumeHigh,
  faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import tableSort from "table-sort-js/table-sort.js";
import Vue from "vue";
import VueResource from "vue-resource";
import app from "./app";
import router from "./router";

library.add(
  faHatWizard,
  faGear,
  faExpand,
  faVolumeHigh,
  faMinimize,
  faForward,
  faShapes,
  faVolumeOff,
  faMapLocation,
  faBars,
  faTable
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueResource);
Vue.use(tableSort);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,

  render: (h) => h(app),
}).$mount("#app");
