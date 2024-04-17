import { RouteRecordRaw } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "CreateRoom",
    component: () =>
      import(/* webpackChunkName: "landing" */ "../views/CreateRoomView.vue"),
    meta: {
      layout: MainLayout,
      isUnauthorized: true,
    },
  },
];

export default routes;
