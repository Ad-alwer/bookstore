<template>
  <div class="container-fluid mt-4 px-4 ">
    <div :class="popupshow ? 'blur' : ''">
      <div class="d-flex justify-content-center">
        <select
          class="form-control w-25 border-secondary"
          @change="sort"
          name=""
          id=""
        >
          <option value="all" class="text-center">همه</option>
          <option value="pending" class="text-center">در انتظار تایید</option>
          <option value="posting" class="text-center">درحال ارسال</option>
          <option value="finished" class="text-center">موفق</option>
          <option value="returned" class="text-center">مرجوع شده</option>
        </select>
      </div>
      <table class="table mt-5 table-bordered ">
        <thead>
          <tr>
            <th class="text-center" >کد رهگیری</th>
            <th class="text-center">نام</th>
            <th class="text-center">آدرس</th>
            <th class="text-center">شماره موبایل</th>
            <th class="text-center">وضعیت</th>
            <th class="text-center">تغییر وضعیت</th>
          </tr>
        </thead>
        <thead>
          <tr v-for="x in orders" :key="x">
            <th class="text-center w-25">
              {{ x._id }}
            </th>
            <th class="text-center">
              {{ x.personaldata[0].firstname }}
              {{ x.personaldata[0].lastname }}
            </th>
            <th class="text-center">{{ x.personaldata[0].adress }}</th>
            <th class="text-center">{{ x.personaldata[0].phonenum }}</th>
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
              <div
                v-if="x.status == 'pending'"
                class="d-flex justify-content-center"
              >
                <button
                  class="btn teal px-3 w-50"
                  @click="changestatus(x.status, x._id)"
                >
                  ارسال سفارش
                </button>
              </div>
              <div
                v-if="x.status == 'posting'"
                class="d-flex justify-content-center"
              >
                <button
                  class="btn teal px-3 w-50"
                  @click="changestatus(x.status, x._id)"
                >
                  تایید دریافت
                </button>
              </div>
              <div
                v-if="x.status == 'returned'"
                class="d-flex justify-content-center"
              >
                <Icon icon="ph:x-bold" color="#fc345c" width="30" height="30" />
              </div>
              <div
                v-if="x.status == 'finished'"
                class="d-flex justify-content-center bg"
              >
                <Icon
                  icon="material-symbols:check"
                  color="teal"
                  width="30"
                  height="30"
                />
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <popup v-if="popupshow" @closepopup="closepopup" :id="id" />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { Icon } from "@iconify/vue";
import axios from "axios";
import { info } from "../../../config/default";
import popup from "./orderpopup.vue";

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
  name: "dashboardorders",
  beforeMount() {
    this.getdata();
  },
  data() {
    return {
      orders: [],
      orderscopy:[],
      popupshow: false,
      id: null,
    };
  },
  components: {
    Icon,
    popup,
  },
  methods: {
    changestatus: function (x, id) {
      if (x === "pending") {
        this.id = id;
        this.popupshow = true;
      } else if (x === "posting") {
        axios
          .post(`${apiaddress}orders/changestatus`, {
            id: id,
            value: "finished",
          })
          .then((data) => {
            if (data.data.status) {
              Toast.fire({
                icon: "success",
                title: `عملیات با موفقیت انجام شد`,
              });
              this.getdata();
            }
          });
      }
    },
    getdata: function () {
      axios.get(`${apiaddress}orders`).then((res) => {
        this.orders = res.data;
        this.orderscopy=this.orders
      });
    },
    closepopup: function () {
      this.popupshow = false;
      this.getdata();
    },
    sort: function (e) {
      let neworderlist = [];

      if (e.target.value == "pending") {
        this.orders =this.orderscopy
        this.orders.forEach((e) => {
          if (e.status == "pending") {
            neworderlist.push(e);
          }
        });
        this.orders = neworderlist;
      } else if (e.target.value == "posting") {
        this.orders =this.orderscopy
        this.orders.forEach((e) => {
          if (e.status == "posting") {
            neworderlist.push(e);
          }
        });
        this.orders = neworderlist;
      } else if (e.target.value == "finished") {
        this.orders =this.orderscopy
        this.orders.forEach((e) => {
          if (e.status == "finished") {
            neworderlist.push(e);
          }
        });
        this.orders = neworderlist;
      } else if (e.target.value == "returned") {
        this.orders =this.orderscopy
        this.orders.forEach((e) => {
          if (e.status == "returned") {
            neworderlist.push(e);
          }
        });
        this.orders = neworderlist;
      }else if(e.target.value == "all"){
        this.orders = this.orderscopy
      }
    },
  },
};
</script>

<style scoped>
.teal {
  background-color: var(--teal);
  color: white;
}
.teal:hover {
  background-color: var(--teal);
  color: white;
}
.blur {
  .blur {
    filter: blur(4px);
  }
}
th{
  vertical-align: middle;
  text-align: center;}
</style>
