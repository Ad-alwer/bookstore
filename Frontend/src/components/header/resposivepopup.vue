<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <div class="popup-inner">
      <Icon
        icon="ph:x-bold"
        color="red"
        width="25"
        height="25"
        class="pointer"
        @click="close"
      />
      <ul class="mt-4">
        <li class="p-3 text-center">
          <a class="text-center fs-5" href="/">خانه</a>
        </li>
        <li class="p-3 text-center">
          <a class="text-cente fs-5r" href="/books">محصولات</a>
        </li>
        <li class="p-3 text-center">
          <a class="text-center fs-5" href="/request">درخواست کتاب</a>
        </li>
        <li class="p-3 text-center">
          <a class="text-center fs-5" href="/questions">سوالات متداول</a>
        </li>
        <li class="p-3 text-center">
          <a class="text-center fs-5" href="/about">درباره ما</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  name: "responsivepopup",

  components: {
    Icon,
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
  },
};
</script>

<style scoped>
#popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    background-color: white;
    color: black;
    position: absolute;
    right: 0;
    top: 0;
    padding: 20px;
    height: 100vh;
    width: 400px;
    overflow-y: auto;
  }
}
li {
  list-style: none;
  border-bottom: 1px black solid;
}
a {
  text-decoration: none;
  color: black;
}
</style>

//FIX DISCOUNT AND PRICE SHOWER
