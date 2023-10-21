<template>
  <div class="container mt-4">
    <h2 class="text-center fs-1">درخواست کتاب</h2>
    <input
      type="text"
      class="border-2 px-4 py-3 mt-5 form-control  w-50 mx-auto"
      placeholder="نام کتاب"
      ref="bookname"
    />

    <textarea
      class="border-2 rounded-4 px-4 py-3 form-control  mx-auto mt-5 w-50"
      name=""
      id=""
      cols="20"
      rows="5"
      placeholder="توضیحات"
      ref="desc"
    ></textarea>
    <div class="mt-5 d-flex justify-content-center">
      <button class="btn px-4 py-2 text-white mt-4 btn-teal--teal " @click="save">
        ذخیره
      </button>
    </div>

    <Icon
      icon="material-symbols:home-outline"
      width="35"
      height="35"
      @click="gotohome"
      class="home"
    />
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import axios from "axios";
import { info } from "../../config/default";
import Swal from "sweetalert2";

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
let apiaddress = info.fetch["address"];

export default {
  name: "bookrequest",
  components: { Icon },
  methods: {
    gotohome: function () {
      location.href = `/`;
    },
    save: function () {
      if(this.$refs.bookname.value){
        axios.post(`${apiaddress}addreq`, {
        name: this.$refs.bookname.value,
        description: this.$refs.desc.value,
      }).then(res=>{
        if(res.data.status){
          this.$refs.bookname.value = null,
          this.$refs.desc.value= null
          Toast.fire({
                icon: "success",
                title: "با موفقیت ذخیره شد",
              });
        }
      })
      }else{
        Toast.fire({
                icon: "error",
                title: "نام کتاب نمی تواند خالی باشد",
              });
      }
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
::placeholder,
textarea,
input {
  font-family: "B Koodak";
  color: rgb(26, 25, 25);
}
textarea {
  resize: none;
  /* width: 600px;
  height: 200px; */
}
.btn-teal--teal {
  background-color: var(--teal);
}
.home {
  position: absolute;
  bottom: 7%;
  right: 7%;
  cursor: pointer;
}
</style>
