<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <form @submit.prevent="save" class="popup-inner gap-2 rounded-4">
      <p class="text-center">لطفا کد رهگیری پست را وارد کنید</p>
      <input
        type="text"
        class="form-control border-secondary"
        placeholder="کد پست"
        ref="inp"
      />
      <div class="justify-content-center d-flex gap-5 mt-3">
        <button class="px-3 py-2 btn btn-secondary" @click="close">
          انصراف
        </button>
        <button class="px-3 py-2 btn bg-teal text-white" @click="save">
          ثبت
        </button>
      </div>
    </form>
  </div>
</template>

<script>


import axios from "axios";
import { info } from "../../../config/default";

  import Swal from "sweetalert2";

let apiaddress = info.fetch["address"];

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

export default {
  name: "popupchange",

  mounted() {
    document.addEventListener("keydown", this.esc);
  },
  props:['id'],

  methods: {
    close: function () {
      this.$emit("closepopup", "closed");
    },
    esc(event) {
      if (event.key === "Escape") {
        this.close();
      }
    },
    save: function () {
      if (this.$refs.inp.value) {
        axios
          .post(`${apiaddress}orders/changestatus`, {
            id:this.id,
            value: "posting",
            postcode: this.$refs.inp.value,
          })
          .then((data) => {
           
            if (data.data.status) {
                Toast.fire({
                icon: "success",
                title: `عملیات با موفقیت انجام شد`,
              });
              this.close()
            }
          });
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
    max-height: 720px;
  }
}
.form-control:focus {
  outline: none;
  box-shadow: none;
}
::placeholder,
input[type="text"],
input[type="number"] {
  font-family: "B Koodak";
  width: 350px;
}
.bg-teal {
  background-color: var(--teal);
}
</style>
