<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <div class="popup-inner rounded-3">
        <Icon icon="ph:x-bold" color="#fc345c" id="btn" width="25" height="25" @click="close" />
      <h5 class="text-center">{{ txt }}</h5>
      <button @click="login" class="btn btn-red mx-3 mt-4">ورود</button>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';
export default {
  name: "loginpopup",
  components: {
		Icon,
	},

  props: ["txt"],

  mounted() {
    document.addEventListener("keydown", this.esc);
  },

  methods: {
    login: function () {
      Location.href = "/login";
    },
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
    position: relative;
    padding: 20px;

    width: 550px;
  }
}
.btn-red {
  cursor: pointer;
  background-color: var(--red);
  width: 90%;
  color: white;
}
#btn{
    position: relative;
    cursor: pointer;
    
}
</style>
