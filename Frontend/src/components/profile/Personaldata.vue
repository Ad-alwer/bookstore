divdivdiv
<template>
  <div class="container mt-3">
    <h1 class="text-center fs-2 text-secondary">اطلاعات شخصی</h1>
    <div class="border border-secondary p-4 rounded-4 mt-4 position-relative">
      <div class="d-flex justify-content-center gap-5 m-3">
        <input
          type="text"
          class="form-control text-center border-secondary w-50"
          placeholder="نام"
          ref="firstname"
        />
        <input
          type="text"
          class="form-control text-center border-secondary w-50"
          placeholder="نام خانوادگی"
          ref="lastname"
        />
      </div>
      <div class="d-flex justify-content-center gap-5 m-3">
        <input
          type="number"
          class="form-control text-center border-secondary w-50"
          placeholder="شماره موبایل"
          ref="phonenum"
          min="0"
        />
        <input
          type="number"
          class="form-control text-center border-secondary w-50"
          placeholder=" شماره خانه"
          ref="homenum"
          min="0"
        />
      </div>
      <div class="d-flex justify-content-center gap-5 mt-3 mb-5">
        <input
          type="text"
          class="form-control text-center border-secondary w-75"
          ref="adress"
          placeholder=" آدرس"
        />
      </div>
      <div class="d-flex justify-content-center gap-5">
        <button class="btn btn-teal text-white" @click="save">ذخیره</button>
        <button class="btn btn-danger" @click="back">بازگشت</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { info } from "../../../config/default";

import funcs from "../login.vue";
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

let jwt = funcs.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];
export default {
  beforeMount() {
    if (jwt) {
      this.getdata();
    } else {
      Toast.fire({
        icon: "error",
        title: `لطفا ثبت نام کنید`,
      });
    }
  },
  data() {
    return { personaldata: [] };
  },
  methods: {
    save: function () {
      if (
        this.$refs.firstname.value &&
        this.$refs.lastname.value &&
        this.$refs.phonenum.value &&
        this.$refs.homenum.value &&
        this.$refs.adress.value
      ) {
        const regexphonenum = /^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/;
        const regexhomenum = /^0[0-9]{2,}[0-9]{7,}$/;
        if (
          regexhomenum.test(this.$refs.homenum.value) &&
          regexphonenum.test(this.$refs.phonenum.value)
        ) {
          const newpersonaldata = [
            {
              firstname: this.$refs.firstname.value,
              lastname: this.$refs.lastname.value,
              phonenum: this.$refs.phonenum.value,
              homenum: this.$refs.homenum.value,
              adress: this.$refs.adress.value,
            },
          ];
          axios
            .post(`${apiaddress}personaldata`, {
              jwt,
              personaldata: newpersonaldata,
            })
            .then((res) => {
              if (res.data.status) {
                Toast.fire({
                  icon: "success",
                  title: `با موفقیت ذخیره شد`,
                });
              }
            });
        } else {
          Toast.fire({
            icon: "error",
            title: `شماره خانه یا موبایل معتبر نبیست`,
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: `لطفا همه فیلد هارا پرکنید`,
        });
      }
    },
    back: function () {
      location.href = `/profile`;
    },
    getdata: function () {
      axios.get(`${apiaddress}profile/${jwt}`).then((res) => {
        this.personaldata = res.data.personaldata;
        console.log(this.personaldata);

        this.$refs.firstname.value =
          this.personaldata.length > 0 ? this.personaldata[0].firstname : null;

        this.$refs.lastname.value =
          this.personaldata.length > 0 ? this.personaldata[0].lastname : null;

        this.$refs.phonenum.value =
          this.personaldata.length > 0 ? this.personaldata[0].phonenum : null;

        this.$refs.homenum.value =
          this.personaldata.length > 0 ? this.personaldata[0].homenum : null;

        this.$refs.adress.value =
          this.personaldata.length > 0 ? this.personaldata[0].adress : null;
      });
    },
  },
};
</script>

<style scoped>
.border-secondary {
  border-color: #6c757d !important;
}
.text-secondary {
  color: #6c757d !important;
}
.btn-teal {
  color: white;
  background-color: var(--teal);
}
input[type="text"],
input[type="number"] {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida ";
}
</style>
