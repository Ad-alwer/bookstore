<template>
  <div id="parent" class="container my-3">
    <div
      class="header mx-5 rounded-3 pt-1 border border-1 d-flex border-secondary gap-3 justify-content-center px-4"
    >
      <p
        :class="
          step == 'info' ? 'text-center  red' : 'text-center text-secondary'
        "
      >
        مشخصات
      </p>
      <hr
        class="border border-2 border-start-0 border-end-0 border-bottom-0 border-secondary"
      />
      <p
        :class="
          step == 'pay' ? 'text-center  red' : 'text-center text-secondary'
        "
      >
        پرداخت
      </p>
    </div>
    <div class="body rounded-3 border border-1 border-secondary mx-5 mt-4">
      <form
        v-if="step == 'info'"
        action=""
        class="p-3 d-flex flex-column gap-3"
      >
        <div class="d-flex justify-content-center gap-5">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input border border-1 border-secondary"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option2"
              :disabled="this.personaldata.length < 1 ? true : false"
              @change="radiobtnhandler"
              :checked="which == 'default' ? true : false"
            />
            <label class="form-check-label" for="inlineRadio1"
              >ثبت از اطلاعات ذخیره شده</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input border border-1 border-secondary"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option1"
              @change="radiobtnhandler"
              :checked="which == 'insert' ? true : false"
            />
            <label class="form-check-label" for="inlineRadio1"
              >ثبت اطلاعات دلخواه
            </label>
          </div>
        </div>
        <div class="d-flex gap-3">
          <input
            type="text"
            class="form-control border borde- border-secondary"
            name=""
            id=""
            placeholder="نام"
            ref="firstname"
            :disabled="which == 'default' ? true : false"
          />
          <input
            type="text"
            class="form-control border borde- border-secondary"
            name=""
            id=""
            placeholder="نام خانوادگی"
            ref="lastname"
            :disabled="which == 'default' ? true : false"
          />
        </div>
        <input
          type="text"
          name=""
          id=""
          placeholder="آدرس"
          ref="address"
          class="form-control border borde- border-secondary"
          :disabled="which == 'default' ? true : false"
        />
        <div class="d-flex gap-3">
          <input
            type="number"
            minlength="11"
            maxlength="11"
            class="form-control border borde- border-secondary"
            :disabled="which == 'default' ? true : false"
            name=""
            id=""
            ref="phonenum"
            placeholder="شماره موبایل"
          />
          <input
            type="number"
            min="0"
            minlength="11"
            maxlength="11"
            class="form-control border borde- border-secondary"
            :disabled="which == 'default' ? true : false"
            name=""
            ref="homenum"
            id=""
            placeholder=" شماره خانه  (اختیاری) "
          />
        </div>
        <div class="d-flex justify-content-center mt-3">
          <button class="btn px-3 py-2 bg-red" @click.prevent="gotopay">
            مرحله بعد
          </button>
        </div>
      </form>
      <div v-else-if="step == 'pay'" class="p-3">
        <table class="table-bordered table border-secondary table-rounded">
          <thead>
            <tr>
              <th scope="col" class="text-center">#</th>
              <th scope="col" class="text-center w-75">عنوان</th>
              <th scope="col" class="text-center">تعداد</th>
              <th scope="col" class="text-center">قیمت</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(x, i) in basket" :key="i">
              <th class="text-center" scope="row">{{ i + 1 }}</th>
              <td class="text-center">{{ x.name }}</td>
              <td class="text-center">{{ x.number }}</td>
              <td class="text-center">{{ x.value }}</td>
            </tr>
          </tbody>
        </table>

        <div class="d-flex gap-3">
          <div class="border border-1 border-black rounded-3 p-1 w-75">
            <table class="table mb-0 pb-0 w-100">
              <tbody>
                <tr>
                  <td class="text-center">هزینه محصول</td>
                  <td class="text-center">{{ orderspay }} تومان</td>
                </tr>
                <tr>
                  <th class="text-center" scope="row">هزینه ارسال</th>
                  <td class="text-center">{{ sendpay }} تومان</td>
                </tr>
                <tr>
                  <th class="text-center" scope="row">تخفیف</th>
                  <td class="text-center">{{ discount }} تومان</td>
                </tr>
                <tr class=" ">
                  <th class="text-center border-0" scope="row">قابل پرداخت</th>
                  <td class="text-center border-0">
                    {{ finallprice() }} تومان
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="border border-1 border-black rounded-3 p-2 w-25 d-flex justify-content-center flex-column gap-3"
          >
            <input
              type="text"
              name=""
              id=""
              placeholder="کدتخفیف"
              class="form-control border-secondary"
              ref="codediscount"
            />
            <div class="d-flex justify-content-center">
              <Icon
                icon="solar:refresh-bold-duotone"
                class="pointer"
                width="25"
                height="25"
                @click="discountcodechecker"
              />
            </div>
            <p ref="discountalert" class="red text-center"></p>
          </div>
        </div>
        <div class="mt-3 d-flex justify-content-center">
          <button class="btn bg-red px-3 py-2" @click="finishpay">
            پرداخت
          </button>
        </div>
      </div>
      <div v-else class="p-3">
        <div class="d-flex justify-content-center">
          <Icon
            icon="icon-park-solid:success"
            color="teal"
            width="50"
            height="50"
          />
        </div>
        <p class="text-center mt-1 fs-5">عملیات با موفقیت انجام شد</p>
        <div class="d-flex justify-content-center">
          <table class="table w-50">
            <tr>
              <td class="text-center w-25">کد رهگیری</td>
              <td class="text-center w-25" >{{ code }}</td>
              <td class="text-center w-25">
                <Icon
                  icon="mingcute:copy-line"
                  class="pointer"
                  width="40"
                  height="40"
                  @click="
                   copy
                  "
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { Icon } from "@iconify/vue";
import axios from "axios";
import { info } from "../../config/default";

import funcs from "./login.vue";

let jwt = funcs.methods.getcookies("jwt");
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
  name: "recordorder",
  beforeMount() {
    axios.get(`${apiaddress}find/${jwt}`).then((res) => {
      this.user = res.data.data;
      this.basket = res.data.data.basket;
      this.personaldata = res.data.data.personaldata;
      if (this.personaldata.length < 1) {
        this.which = "insert";
      }
      this.basket.forEach((e) => {
        axios.get(`${apiaddress}book/${e.id}`).then((res) => {
          let discount = res.data[0].discount;
          let value = res.data[0].price;

          if (discount) {
            const percentregex = /%/;
            const numberregex = /^\d+$/;
            if (percentregex.test(discount)) {
              const number = parseFloat(discount);

              return (e.value = value - (number / 100) * value);
            } else if (numberregex.test(discount)) {
              return (e.value = value - discount);
            }
          } else {
            return (e.value = value);
          }
        });
      });

      setTimeout(() => {
        let values = [];

        this.basket.forEach((e) => {
          values.push(e.number * e.value);
        });
        this.orderspay = values.reduce((prevprice, currentprice) => {
          return currentprice + prevprice;
        });
      }, 100);
    });
  },
  components: {
    Icon,
  },
  data() {
    return {
      sendpay: 25000,
      step: "info",
      which: "default",
      userdata: {},
      basket: [],
      personaldata: [],
      orderspay: 0,
      discount: 0,
      pricedata: [],
      user: [],
      code:''
    };
  },
  methods: {
    radiobtnhandler: function (e) {
      if (e.target.value == "option1") {
        this.which = "insert";
      } else {
        this.which = "default";
      }
    },
    gotopay: function () {
      if (this.which == "default") {
        this.step = "pay";
      } else {
        const regexphonenum = /^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/;
        const regexhomenum = /^0[0-9]{2,}[0-9]{7,}$/;

        if (
          this.$refs.firstname.value &&
          this.$refs.lastname.value &&
          this.$refs.address.value &&
          this.$refs.phonenum.value
        ) {
          if (
            regexhomenum.test(this.$refs.homenum.value) &&
            regexphonenum.test(this.$refs.phonenum.value)
          ) {
            this.personaldata.push({
              userid: this.user._id,
              username: this.user.username,
              email: this.user.email,
              firstname: this.$refs.firstname.value,
              lastname: this.$refs.lastname.value,
              adress: this.$refs.address.value,
              phonenum: this.$refs.phonenum.value,
              homenum: this.$refs.homenum.value,
            });

            this.step = "pay";
          } else {
            Toast.fire({
              icon: "error",
              title: `شماره خانه یا موبایل معتبر نبیست`,
            });
          }
        } else {
          Toast.fire({
            icon: "error",
            title: `لطفا تمام فیلد هارا پرکنید`,
          });
        }
      }
    },
    discountcodechecker: function () {
      if (this.$refs.codediscount.value) {
        axios
          .get(`${apiaddress}codechecker/${this.$refs.codediscount.value}`)
          .then((res) => {
            if (res.data.data) {
              if (res.data.data.count < 1) {
                this.$refs.discountalert.innerHTML = "کد تخفیف منقضی شده است";
              } else {
                console.log(res.data.data);
                if (res.data.data.minprice > this.orderspay) {
                  this.$refs.discountalert.innerHTML = `این کد تخفیف فقط برای خرید های بالای${res.data.data.minprice}  تومان قایل استفاده است`;
                } else {
                  const percentregex = /%/;
                  const numberregex = /^\d+$/;
                  this.$refs.discountalert.innerHTML = "";
                  if (percentregex.test(res.data.data.value)) {
                    const number = Number(parseFloat(res.data.data.value));

                    let discountvalue = this.orderspay * (number / 100);
                    this.discount =
                      discountvalue >= Number(res.data.data.maxdiscount)
                        ? Number(res.data.data.maxdiscount)
                        : discountvalue;

                    this.finallprice();
                  } else if (numberregex.test(res.data.data.value)) {
                    this.discount =
                      Number(res.data.data.maxdiscount) >=
                      Number(res.data.data.value)
                        ? Number(res.data.data.value)
                        : Number(res.data.data.maxdiscount);
                    this.finallprice();
                  }
                }
              }
            } else {
              this.$refs.discountalert.innerHTML = "کد تخفیف نادرست است";
            }
          });
      } else {
        this.discount = 0;
      }
    },
    finallprice: function () {
      return this.orderspay + this.sendpay - this.discount;
    },
    finishpay: function () {
      this.pricedata = [];
      this.pricedata.push({
        orderpay: this.orderspay,
        sendpay: this.sendpay,
        discount: this.discount,
        finalpay: this.finallprice(),
      });
      axios.post(`${apiaddress}order/add`, {
        personaldata:this.personaldata,
        paydata:this.pricedata,
        productdata:this.basket,

        
      }).then(res=>{
        this.code=res.data._id
          this.step = 'status'
      })
      
    },
    copy:function(){
        navigator.clipboard.writeText(this.code)
    }
  },
};
</script>

<style scoped>
hr {
  width: 50%;
}
.header {
  height: 40px;
  /* height: 2%; */
  align-items: baseline;
}
/* .body {
  min-height: 90%;
} */
::placeholder,
input {
  font-family: "B Koodak";
  color: rgb(26, 25, 25);
}
.form-control:focus,
.form-check-input {
  outline: none;
  box-shadow: none;
}
.bg-red {
  cursor: pointer;
  color: white;
  background-color: var(--red);
}
.red {
  color: var(--red);
}
.green {
  color: var(--teal);
}
.pdetail {
  font-size: 14px;
}
</style>

//TODO info //TODO FIX UNLIMIT DISCOUNT BUG
