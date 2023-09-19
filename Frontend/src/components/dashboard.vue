vue
<template>
  <div id="parent" class="d-flex">
    <hmenu />
    <div>
     
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { info } from "../../config/default";
import funcs from "./login.vue";
let jwt = funcs.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];

import hmenu from "./dashboard/menu.vue";

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
    };
  },
  components: { hmenu },
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: all 0.3s;
  border-radius: 20px;
}
.switch::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background: #fff;
  top: 1px;
  left: 1px;
  transition: all 0.3s;
}
input[type="checkbox"]:checked + .switch::after {
  transform: translateX(20px);
}

input[type="checkbox"]:checked + .switch {
  background: var(--mint);
}
.offscreen {
  display: none;
}
</style>

//TODO DETAILSHOPS
