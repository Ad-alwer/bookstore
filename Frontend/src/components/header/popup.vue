<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <div class="popup-inner rounded-4 align-items-center pb-2">
      <Icon
        icon="ph:x-bold"
        color="red"
        width="20"
        height="20"
        class=" iconx"
        @click="close"
      />
      
      <div class="">
        <ul class="">
          <li class="d-flex gap-4 py-3" @click="goto('profile')">
            <Icon icon="ph:user" width="20" height="20" class=" " />
            <span>حساب کاربری</span>
          </li>
          <li class="d-flex gap-4 py-3" @click="goto('profile/orders')">
            <Icon icon="icon-park-outline:buy" width="20" height="20" />
            <span>سفارش ها</span>
          </li>
          <li class="d-flex gap-4 py-3" @click="goto('profile/favourite')">
            <Icon icon="mdi:heart-outline" width="20" height="20" />
            <span>علاقه مندی ها</span>
          </li>

          <li
            v-if="admin"
            class="d-flex gap-4 py-3"
            @click="goto('dashboard')"
          >
            <Icon icon="solar:key-linear" width="20" height="20" />
            <span>مدیریت</span>
          </li>
          <li
            
            class="d-flex gap-4 py-3"
            @click="goto('login')"
          >
            <Icon icon="bx:door-open" width="20" height="20" />
            <span>خروج</span>
            
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { info } from "../../../config/default";
import funcs from "../../components/login.vue";
let jwt = funcs.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];



import { Icon } from "@iconify/vue";

export default {
  name: "popup",
  data() {
    return {
      img: null,
      admin: false,
      user: [],
    };
  },
  beforeMount() {
    axios.get(`${apiaddress}find/${jwt}`).then((res) => {
      this.user =res.data.data
      this.admin =res.data.data.isadmin
      

      

    });
  },
  mounted() {
    document.addEventListener("keydown", this.esc);
  },

  methods: {
    close: function () {
      this.$emit("closepopup", "closed");
    },
    esc(event) {
      if (event.key === "Escape") {
        this.close();
      }
    },
    goto: function (e) {
      location.href = `/${e}`;
    },
  },
  components: {
    Icon,
  },
};
</script>

<style scoped>
#popup {
  position: fixed;
  top: 10%;
  left: 5%;
  z-index: 99;

  /* background-color: rgba(0, 0, 0, 0.2); */
  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    background-color: white;
    color: black;
    position: relative;
    padding: 20px;
    padding-bottom: 0;
    max-height: 720px;
    border: 1px black solid;
  }
}
.form-control:focus {
  outline: none;
  box-shadow: none;
}

.pname {
  position: relative;
  top: 20px;
  font-size: 19px;
}
li {
  list-style: none;
  cursor: pointer;
  border-bottom: 1px rgba(0, 0, 0, 0.164) solid;
}
.iconx {
  cursor: pointer;
}
li:hover {
  border-color: var(--teal);
}
li:last-child:hover{
  border-color: var(--red);
}
</style>
