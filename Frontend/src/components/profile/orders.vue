<template>
  <div class="container">
    <div class="p-4 rounded-4 mt-2 position-relative">
      <Icon
        icon="formkit:arrowleft"
        width="30"
        height="30"
        class="float-start mx-5 pointer"
        color="#6c757d"
        @click="back"
      />
      <h1 class="text-center fs-3 text-secondary mt-5">سفارش ها</h1>

      <div class="mx-2">
        <table class="table table-bordered mt-3">
          <thead>
            <tr>
              <th class="text-center w-75">کد سفارش</th>
              <th class="text-center w-50">وضعیت</th>
              <th class="text-center w-50">جزییات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(x, i) in orders" :key="x.orderid">
              <th class="text-center">{{ x.orderid }}</th>
              <th class="text-center">
                {{
                  x.status == "pending"
                    ? "در انتظار تایید"
                    : x.status == "posting"
                    ? "در حال ارسال"
                    : x.status == "returned"
                    ? "مرجوع شده"
                    : x.status == "finished"
                    ? "تکیل شده"
                    : null
                }}
              </th>
              <th class="text-center">
                <Icon
                  icon="icon-park-outline:doc-detail"
                  width="30"
                  height="30"
                  class="pointer"
                  @click="showdetail(i)"
                />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <popuporders v-if="popshow" @closepopup="popshow = false" :data="data" />
  </div>
</template>

<script>
import axios from "axios";
import { info } from "../../../config/default";
import { Icon } from "@iconify/vue";
import funcs from "../login.vue";
import popuporders from "./popuporders.vue";

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
  name: "orders",
  components: {
    Icon,
    popuporders,
  },
  beforeMount() {
    if (jwt) {
      axios.get(`${apiaddress}profile/${jwt}`).then((res) => {
        this.orders = res.data.orders;
        this.orders.forEach((e) => {
          axios
            .get(`${apiaddress}ordersstaus/${e.orderid}`)
            .then((data) => (e.status = data.data.status));
        });
      });
    } else {
      Toast.fire({
        icon: "error",
        title: `لطفا ثبت نام کنید`,
      });
    }
  },
  data() {
    return {
      orders: [],
      popshow: false,
      data: [],
    };
  },
  methods: {
    showdetail: function (i) {
      this.data = this.orders[i].productdata;
      this.popshow = true;
    },
    back: function () {
      location.href = "/profile";
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
.blur {
  filter: blur(4px);
}
</style>
