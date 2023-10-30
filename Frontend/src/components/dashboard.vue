
<template>
  <div id="parent" class="d-flex ">
    <hmenu class="menu position-fixed top-0 " @changedata="changedata" />
    <div class="w-100 h-100 body">
      <users v-if="data == 'users'" class="w-100 h-100" />
      <orders v-if="data == 'orders'" class="w-100 h-100" />
      <addbook v-if="data == 'addbook'" class="w-100 h-100" />
      <showbooks v-if="data == 'showbooks'" class="w-100 h-100" />
      <analyze v-if="data == 'analyze'" class="w-100 h-100" />
      <discount v-if="data == 'discount'" class="w-100 h-100" />
      <setting v-if="data == 'base'" class="w-100 h-100" />
      <request v-if="data == 'request'" class="w-100 h-100" />
    </div>
  </div>
</template>

<script>
import hmenu from "./dashboard/menu.vue";
import users from "./dashboard/users.vue";
import orders from "./dashboard/orders.vue";
import addbook from "./dashboard/addbook.vue";
import showbooks from "./dashboard/showbooks.vue";
import analyze from "./dashboard/analyze.vue";
import discount from "./dashboard/discount.vue";
import setting from "./dashboard/base.vue";
import request from "./dashboard/request.vue";

import axios from "axios";
import { info } from "../../config/default";
import funcs from "./login.vue";
let jwt = funcs.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];

export default {
  name: "dashboard",
  beforeMount() {
    axios.get(`${apiaddress}find/${jwt}`).then((res) => {
      if (!res.data.data.isadmin) {
        location.href = "/404";
      }
      this.master = res.data.data.ismaster;
    });
  },
  data() {
    return {
      master: false,
      data: "users",
    };
  },
  components: {
    hmenu,
    users,
    orders,
    addbook,
    showbooks,
    discount,
    analyze,
    setting,
    request,
  },
  methods: {
    changedata: function (e) {
      this.data = e;
    },
  },
};
</script>

<style scoped>
.menu {
  overflow: hidden;
   width: 10%;
  position: fixed !important;
  top: 50%;
  background-color: aqua;
  top: 0 !important;
   left: 0 !important; 
  width: 100% !important;
  border-left: 1px black solid !important ; 
}
@media screen and (max-width: 767px) {
.body{
  width: 100% !important;
  overflow: auto;
  
  
  
 
}
.menu{
  overflow: hidden !important;
  position: absolute !important;
  top: 800px !important ;
  height: 500px;
}
}
</style>


