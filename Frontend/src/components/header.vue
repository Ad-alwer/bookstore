<template>
  <div class="container-fluid">
    <header class="container-fluid d-flex mt-3 gap-2 parent pb-3">
      <div
        class="d-flex gap-4 pt-2 align-middle div-user order-2 justify-content-center"
      >
        <Icon icon="material-symbols:menu" width="30" height="30" class="icn-menu pointer" @click="menushow =true" />
        <Icon
          class="btns "
          icon="mdi:shopping-outline"
          width="30"
          height="30"
          @click="basketshow = true"
        />

        <Icon
          class="btns "
          icon="iconamoon:profile-circle-fill"
          @click="profileshow = !profileshow"
          v-if="logined"
          width="30"
          height="30"
        />
        <Icon
          class="btns "
          v-else
          icon="mdi:login"
          @click="loginpage"
          width="30"
          height="30"
        />
      </div>

      <div class="div-menu order-0 d-flex gap-5 pt-2 me-2 fw-bold fs-5">
        <a class="menu-item text-center" href="/">خانه</a>
        <a class="menu-item text-center" href="/books">محصولات</a>
        <a class="menu-item2 text-center" href="/request">درخواست کتاب</a>
        <a class="menu-item2 text-center" href="/questions">سوالات متداول</a>
        <a class="menu-item text-center" href="/about">درباره ما</a>
      </div>
      <div class="div-responsive"></div>
    </header>
    <popupprofile v-if="profileshow" @closepopup="profileshow = false" />
    <nav
      v-if="navshow"
      :class="
        profileshow
          ? 'd-flex justify-content-between mx-3 mt-2 blur'
          : 'd-flex justify-content-between mx-3 mt-2'
      "
    >
      <div v-for="x in genres" :key="x">
        <span @click="gotoproducts(x)" class="ps-2 text-center span-genre"
          >{{ x }}
        </span>
      </div>
    </nav>
    <basket v-if="basketshow" @closepopup="basketshow = false" />
    <resposivepopup v-if="menushow" @closepopup="menushow = false" />

  </div>
</template>

<script>
import basket from "./basket.vue";
import popupprofile from "./header/popup.vue";
import resposivepopup from "./header/resposivepopup.vue";

import { Icon } from "@iconify/vue";
import funcs from "./login.vue";
import axios from "axios";
import { info } from "../../config/default";

let apiaddress = info.fetch["address"];
let jwt = funcs.methods.getcookies("jwt");

export default {
  name: "Header",
  beforeMount() {
    if (jwt) {
      this.logined = true;
    } else {
      this.logined = false;
    }
    axios.get(`${apiaddress}getbase`).then((data) => {
      this.genres = data.data.genre;
    });
  },
  data() {
    return {
      profileshow: false,
      logined: null,
      basketshow: false,
      genres: [],
      menushow:false
    };
  },
  components: {
    Icon,
    popupprofile,
    basket,
    resposivepopup
  },
  props: ["navshow"],
  methods: {
    loginpage: function () {
      location.href = "/login";
    },
    gotoproducts: function (e) {
      location.href = `/books/${e}`;
    },
  },
};
</script>

<style scoped>
.parent {
  border-bottom: 2px solid var(--teal);
}
.div-user {
  flex: 2;
}
.div-search {
  flex: 4;
}

.div-menu {
  flex: 5;
}
.menu-item {
  flex: 1;
  text-decoration: none;
  color: black;
}
.menu-item2 {
  flex: 2;
  text-decoration: none;
  color: black;
}
a:hover {
  text-decoration: underline;
}
.btns {
  cursor: pointer;
}
.blur {
  filter: blur(4px);
}
.span-genre:hover {
  color: var(--teal);
  cursor: pointer;
}
.icn-menu {
  display: none !important
}

@media screen and (max-width: 767px) {
  .div-menu {
    display: none !important;
  }
  .icn-menu {
  display: block !important;
  position: absolute;
  right: 10%;
}
.div-user{
  justify-content: left !important
}
nav{
  display: none !important
}

}
</style>
