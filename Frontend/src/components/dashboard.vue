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

</style>

//TODO DETAILSHOPS
