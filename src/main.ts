import { createApp } from "vue";
import Notifications from "@kyvg/vue3-notification";
import App from "./App.vue";
import "./assets/scss/style.scss";
import { Quasar } from "quasar";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";
import router from "./router";

const app = createApp(App);
app
  .use(router)
  .use(Notifications)
  .use(Quasar, {
    plugins: {},
  })
  .mount("#app");
