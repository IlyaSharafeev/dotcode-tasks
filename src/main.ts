import { createApp } from "vue";
import App from "./App.vue";
import "./assets/scss/style.scss";
import { Quasar } from "quasar";
import "quasar/src/css/index.sass";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { PiniaSharedState } from "pinia-shared-state";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
pinia.use(PiniaSharedState({ enable: true, initialize: true, type: "native" }));

const app = createApp(App);
app
  .use(pinia)
  .use(router)
  .use(Quasar, {
    plugins: {},
  })
  .mount("#app");
