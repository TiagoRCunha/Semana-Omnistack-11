import Vue from "vue";
import VueRouter from "vue-router";

import Logon from "../views/Logon.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Logon",
    component: Logon
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profile.vue")
  },
  {
    path: "/incidents/new",
    name: "NewIncident",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NewIncident.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
