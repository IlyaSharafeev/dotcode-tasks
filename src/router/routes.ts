import { RouteRecordRaw } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "landing" */ "../views/HomeView.vue"),
    meta: {
      layout: MainLayout,
      isUnauthorized: true,
    },
  },
  {
    path: "/tasks/1",
    name: "DesktopCards",
    component: () =>
      import(/* webpackChunkName: "landing" */ "../views/DesktopCards.vue"),
    meta: {
      layout: MainLayout,
      isUnauthorized: true,
    },
  },
  {
    path: "/tasks/2",
    name: "Transactions",
    component: () =>
      import(
        /* webpackChunkName: "landing" */ "../views/TransaсtionsBitcoin.vue"
      ),
    meta: {
      layout: MainLayout,
      isUnauthorized: true,
    },
  },
];

export default routes;
