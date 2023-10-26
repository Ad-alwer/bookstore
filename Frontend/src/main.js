import { createApp } from "vue";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";

import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})



import home from "./components/home.vue";
import login from "./components/login.vue";
import dashboard from "./components/dashboard.vue";
import book from "./components/product.vue";
import recordorder from "./components/recordorder.vue";
import books from "./components/products.vue";
import req from "./components/requestbook.vue"
import about from "./components/about.vue"
import questions from "./components/questions.vue";
import favourite from "./components/profile/favourite.vue"
import profile from "./components/profile.vue"
import personaldata from './components/profile/Personaldata.vue'


// import slider from "./components/profile/menu.vue";


const routes = [
  { path: "/", component: home },
  { path: "/login", component: login },
  { path: "/dashboard", component: dashboard },
  { path: "/book/:id", component: book },
  { path: "/books/:id?", component: books },
  { path: "/recordorder", component: recordorder },
  { path: "/request", component: req },
  { path: "/questions", component: questions },
  { path: "/about", component: about },
  { path: "/profile/favourite", component: favourite },
  { path: "/profile", component: profile },
  { path: "/profile/personaldata", component: personaldata },







  // { path: "/slider", component: slider },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).use(vuetify).use(bootstrap).mount("#app");
