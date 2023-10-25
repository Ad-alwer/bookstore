<template>
  <div class="container">
    <div :class="showpopup ? 'blur' : ''">
      <h1 class="mt-3 text-center">حساب کاربری</h1>
      <div class="border border-secondary p-4 rounded-4 mt-4 position-relative">
        <p class="text-center fs-3 text-secondary">اطلاعات شخصی</p>
        <div class="d-flex justify-content-center gap-5 m-3">
          <input
            type="text"
            class="form-control text-center border-secondary w-50"
            placeholder="نام"
            :value="personaldata.length > 0 ? personaldata[0].firstname : null"
            disabled
          />
          <input
            type="text"
            class="form-control text-center border-secondary w-50"
            placeholder="نام خانوادگی"
            :value="personaldata.length > 0 ? personaldata[0].lastname : null"
            disabled
          />
        </div>
        <div class="d-flex justify-content-center gap-5 m-3">
          <input
            type="text"
            class="form-control text-center border-secondary w-50"
            placeholder="شماره موبایل"
            :value="personaldata.length > 0 ? personaldata[0].phonenum : null"
            disabled
          />
          <input
            type="text"
            class="form-control text-center border-secondary w-50"
            placeholder=" شماره خانه"
            :value="personaldata.length > 0 ? personaldata[0].homenum : null"
            disabled
          />
        </div>
        <div class="d-flex justify-content-center gap-5 mt-3 mb-5">
          <input
            type="text"
            class="form-control text-center border-secondary w-75"
            :value="personaldata.length > 0 ? personaldata[0].adress : null"
            placeholder=" آدرس"
            disabled
          />
        </div>
        <div class="d-flex justify-content-center">
          <button class="btn btn-info" @click="goto('/profile/personaldata')">
            ویرایش
          </button>
        </div>
      </div>
      <div class="border border-secondary p-4 rounded-4 mt-4 position-relative">
        <p class="text-center fs-3 text-secondary">سفارش ها</p>

        <div class="mx-2">
          <table class="table table-bordered mt-3">
            <thead>
              <tr>
                <th class="text-center w-75">کد سفارش</th>
                <th class="text-center w-50">وضعیت</th>
                <th class="text-center">مشاهده جزییات</th>
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
            <tfoot class="table-dark pointer">
              <tr>
                <th
                  class="text-center"
                  colspan="3"
                  @click="goto('/profile/orders')"
                >
                  مشاهده همه
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    <popup :data="data" @closepopup="showpopup = false" v-if="showpopup" />
  </div>
</template>

<script>
import axios from "axios";
import { info } from "../../config/default";
import { Icon } from "@iconify/vue";
import funcs from "./login.vue";
import popup from "./profile/popuporders.vue";

let jwt = funcs.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];
export default {
  beforeMount() {
    if (jwt) {
      axios.get(`${apiaddress}profile/${jwt}`).then((res) => {
        this.orders = res.data.oreders.slice(0, 5);
        this.personaldata = res.data.personaldata;
        console.log(this.orders);
        this.orders.forEach((e) => {
          axios
            .get(`${apiaddress}ordersstaus/${e.orderid}`)
            .then((data) => (e.status = data.data.status));
        });
      });
    }
  },
  data() {
    return {
      personaldata: [],
      orders: [],
      data: [],
      showpopup: false,
    };
  },
  components: {
    Icon,
    popup,
  },
  methods: {
    showdetail: function (i) {
      this.data = this.orders[i].productdata;
      this.showpopup = true;
    },
    goto: function (e) {
      location.href = e;
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
