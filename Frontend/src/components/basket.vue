<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <div class="popup-inner">
      <div class="h-100" v-if="books.length >= 1">
        <div id="body">
          <Icon
            icon="ph:x-bold"
            @click="close"
            color="#fc345c"
            id="btn"
            width="20"
            height="20"
            class="mx-2"
          />
          <div
            v-for="x in books"
            class="rounded-3 mt-2 border border-secondary border-2 products"
          >
            <div class="d-flex gap-5 align-items-center p-2">
              <img
                :src="require(`../assets/${x.img}`)"
                class="img-thumbnail border-secondary"
                alt=""
              />

              <p class="pname text-center">{{ x.name }}</p>
            </div>
            <div
              class="d-flex align-items-baseline gap-5 align-items-center footerparent"
            >
              <div
                class="rounded-3 border border-1 border-secondary d-flex align-items-center gap-2 mx-3 numshower mt-3"
              >
                <div class="d-flex flex-column p-1">
                  <Icon
                    icon="mingcute:up-fill"
                    width="18"
                    height="18"
                    class="pointer"
                    @click="plusnumber(x.id)"
                  />
                  <Icon
                    icon="mingcute:up-fill"
                    width="18"
                    height="18"
                    :verticalFlip="true"
                    class="pointer"
                    @click="minusnumber(x.id, x.number)"
                  />
                </div>
                <div
                  class="border-secondary border-start border-end h-100 d-flex align-items-center p-3"
                >
                  <span class="fs-5">{{ x.number }}</span>
                </div>
                <div class="">
                  <Icon
                    icon="solar:trash-bin-2-outline"
                    class="pointer"
                    color="#fc345c"
                    width="20"
                    height="20"
                    @click="delet(x.id, x.number)"
                  />
                </div>
              </div>
              <div class="d-flex">
                <p class="text-center priceshower me-4 pt-1">
                  {{ x.value }} تومان
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="footer mx-3 ">
          <hr />
          <div class="d-flex justify-content-around">
            <p class="txt-sum pb-0 mb-0">مجموع</p>
            <p class="txt-sum pb-0 mb-0">{{ resualtval }}</p>
          </div>
          <div class="d-flex justify-content-center m-3">
            <button class="btn px-3 mb-3 btn-red py-2" @click="finishorder">
              ثبت سفارش
            </button>
          </div>
        </div>
      </div>
      <div
        v-else
        class="d-flex flex-column h-100 justify-content-center notfound align-items-center"
      >
        <img src="../assets/imgs/notfound.png" alt="" />
        <p>سبد خرید شما خالی می باشد</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import axios from "axios";
import { info } from "../../config/default";

import funcs from "./login.vue";

let jwt = funcs.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];
export default {
  name: "basket",
  beforeMount() {
    this.getdata();
  },
  components: {
    Icon,
  },

  props: ["txt"],

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
    resualt: function () {
      let values = [];
      if (this.books[0].number && this.books[0].value) {
        this.books.forEach((e) => {
          values.push(e.number * e.value);
        });
        this.resualtval = values.reduce((prevprice, currentprice) => {
          return currentprice + prevprice;
        });
      }
    },
    plusnumber: function (bookid) {
      axios
        .post(`${apiaddress}plusnumber`, {
          id: this.user._id,
          bookid,
        })
        .then((res) => {
          if (res.data.status) {
            this.getdata();
          }
        });
    },
    minusnumber: function (bookid, num) {
      if (num > 1) {
        axios
          .post(`${apiaddress}minusnumber`, {
            id: this.user._id,
            bookid,
          })
          .then((res) => {
            if (res.data.status) {
              this.getdata();
            }
          });
      }
    },
    delet: function (bookid) {
      axios
        .post(`${apiaddress}deletbasket`, {
          id: this.user._id,
          bookid,
        })
        .then((res) => {
          if (res.data.status) {
            this.getdata();
          }
        });
    },
    getdata: function () {
      axios.get(`${apiaddress}find/${jwt}`).then((res) => {
        this.user = res.data.data;
        let basket = this.user.basket;
        basket.forEach((e) => {
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

        this.books = basket;
        setTimeout(() => {
          this.resualt();
        }, 40);
      });
    },
    finishorder: function () {
      if (this.books.length > 0) {
        location.href = "/recordorder";
      }
    },
  },
  data() {
    return {
      user: [],
      books: [],
      resualtval: 0,
    };
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
.btn-red {
  cursor: pointer;
  background-color: var(--red);
  width: 90%;
  color: white;
}
#btn {
  position: relative;
  cursor: pointer;
}
#body {
  min-height: 86%;
}
#footer {
  min-height: 14%;
  position: fixed;
  /* top: 0; */
  /* bottom: 20%; */
  /* z-index: 99; */
  /* height: 20%; */
  /* background-color: aqua; */
}
img {
  width: 100px;
  height: 100px;
}
.products {
  height: 200px;
}
.pname {
  width: 150px;
}
.numshower {
  height: 40px;
  width: 120px;
}
.footerparent {
  height: 60px;
}
.priceshower {
  font-size: 16px;
  position: relative;
  top: 3px;
}
.txt-sum {
  font-size: 20px;
}
.border-secondary {
  border-color: #6c757d !important;
}
</style>

//FIX DISCOUNT AND PRICE SHOWER
