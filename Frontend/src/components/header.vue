<template>
  <div class="container-fluid">
    <header class="container-fluid d-flex mt-3 gap-2 parent pb-3">
      <div
        class="d-flex gap-4 pt-2 align-middle div-user order-2 justify-content-center"
      >
        <Icon class="btns" icon="mdi:shopping-outline" width="30" height="30" />

        <Icon
          class="btns"
          icon="iconamoon:profile-circle-fill"
          @click="profileshow = !profileshow"
          v-if="logined"
          width="30"
          height="30"
        />
        <Icon
          class="btns"
          v-else
          icon="mdi:login"
          @click="loginpage"
          width="30"
          height="30"
        />
      </div>

      <div class="div-search d-flex order-1 justify-content-center">
        <input
          type="text"
          class="form-control border-black px-2 rounded-3"
          maxlength="30"
        />
        <Icon
          @click="loginpage"
          class="icon-search mt-2"
          icon="material-symbols:search"
          width="22"
          height="22"
        />
      </div>

      <div class="div-menu order-0 d-flex gap-5 pt-2 me-2 fw-bold fs-5">
        <a class="menu-item text-center" href="/">خانه</a>
        <a class="menu-item text-center" href="/products">محصولات</a>
        <a class="menu-item2 text-center" href="/request">درخواست کتاب</a>
        <a class="menu-item2 text-center" href="/questions">سوالات متداول</a>
        <a class="menu-item text-center" href="/about">درباره ما</a>
      </div>
    </header>
    <popupprofile v-if="profileshow" @closepopup="profileshow = false" />
    <nav
      :class="
        profileshow
          ? 'd-flex justify-content-between mx-3 mt-2 blur'
          : 'd-flex justify-content-between mx-3 mt-2'
      "
    >
      <div>
        <span class="ps-2">کمک درسی</span>
        <Icon icon="icon-park:down" width="15" height="15" />
      </div>
      <div>
        <span class="ps-2">روانشناسی</span>
        <Icon icon="icon-park:down" width="15" height="15" />
      </div>
      <div>
        <span class="ps-2">رمان</span>
        <Icon icon="icon-park:down" width="15" height="15" />
      </div>
      <div>
        <span class="ps-2">کودک</span>
        <Icon icon="icon-park:down" width="15" height="15" />
      </div>
      <div>
        <span class="ps-2">جنایی</span>
        <Icon icon="icon-park:down" width="15" height="15" />
      </div>
      <div>
        <span class="ps-2">کمیک </span>
        <Icon icon="icon-park:down" width="15" height="15" />
      </div>
      <div>
        <span class="ps-2">ورزشی</span>
        <Icon icon="icon-park:down" width="15" height="15" />
      </div>
      <div>
        <span class="ps-2">شعر</span>
        <Icon icon="icon-park:down" width="15" height="15" />
      </div>
    </nav>
  </div>
</template>
//TODO BASKET
<script>
import popupprofile from "./header/popup.vue";
import { Icon } from "@iconify/vue";
import funcs from "./login.vue";
let jwt = funcs.methods.getcookies("jwt");

export default {
  name: "Header",
  beforeMount() {
    if (jwt) {
      this.logined = true;
    } else {
      this.logined = false;
    }
  },
  data() {
    return {
      profileshow: false,
      logined: null,
    };
  },
  components: {
    Icon,
    popupprofile,
  },
  methods: {
    loginpage: function () {
      location.href = "/login";
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
.div-search input {
  max-width: 350px;
}

.icon-search {
  position: relative;
  left: 6%;
  z-index: 999;
  cursor: pointer;
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
</style>
