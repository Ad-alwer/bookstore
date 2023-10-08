import { createApp } from "vue";
import App from "./App.vue";






import { createRouter, createWebHistory } from "vue-router";

import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";



import home from "./components/home.vue";
import login from "./components/login.vue"
import dashboard from "./components/dashboard.vue"
import book from "./components/product.vue"
import recordorder from "./components/recordorder.vue"


import slider from "./components/dashboard/orders.vue"


const routes = [
    { path: "/", component: home },
    { path: "/login", component: login },
    { path: "/dashboard", component:dashboard },
    { path: "/book/:id", component:book },


    { path: "/recordorder", component:recordorder },





    { path: "/slider", component: slider },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

createApp(App).use(router).use(bootstrap).mount("#app");
