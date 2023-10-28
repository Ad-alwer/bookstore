<template>
  <div id="parent" class="container-fluid">
    <homeheader navshow="true" />
    <slider class="mt-4" />
    <div class="my-5 d-flex justify-content-evenly card-parent gap-3">
      <div class="card">
        <div class="p-2 m-0">
          <div class="d-flex justify-content-center">
            <Icon icon="mdi:cash-return" width="65" height="65" />
          </div>
        </div>
        <hr class="border-secondary mx-5" />
        <div class="card-body">
          <p class="text-center align-middle">
            تا هفت روز پس از خرید میتوانید کالای خریداری شده را مرجوع کنید و
            تمام مبلغ ان به شما باز میگردد
          </p>
        </div>
      </div>
      <div class="card">
        <div class="p-2 m-0">
          <div class="d-flex justify-content-center">
            <Icon icon="carbon:delivery" width="65" height="65" />
          </div>
        </div>
        <hr class="border-secondary mx-5" />
        <div class="card-body">
          <p class="text-center align-middle">
            مرسوله های شما در مدت زمانی 3 الی 5 روز کاری به دستتان می رسد
          </p>
        </div>
      </div>
      <div class="card">
        <div class="p-2 m-0">
          <div class="d-flex justify-content-center">
            <Icon icon="raphael:dollar" width="65" height="65" />
          </div>
        </div>
        <hr class="border-secondary mx-5" />
        <div class="card-body">
          <p class="text-center align-middle">
            شما میتوانید هزینه خود را درب منزل پس از بررسی سلامت کالا پرداخت
            کنید
          </p>
        </div>
      </div>
    </div>
    <miniSlider v-if="base.mostbuy" class="mt-4 rounded-end-4 rounded-start-1" sort="mostbuy" />
    <miniSlider v-if="base.discounted" class="mt-4 rounded-end-4 rounded-start-1" sort="discount" />
    <miniSlider v-if="base.newbooks" class="mt-4 rounded-end-4 rounded-start-1" sort="newbooks" />
    <footerpage />
  </div>
</template>

<script>
import homeheader from "./header.vue";
import miniSlider from "./miniSlider.vue";
import slider from "./home/slider.vue";
import footerpage from "./Footer.vue";
import { Icon } from "@iconify/vue";


import axios from "axios";
import { info } from "../../config/default";
let apiaddress = info.fetch["address"];

export default {
  name: "home",
  beforeMount() {
    axios.get(`${apiaddress}getbase`).then((res) => {
      this.base = res.data;
    });
  },
  components: { homeheader, slider, Icon, miniSlider, footerpage },
  data(){
    return{
      base:[]
    }
  }
};
</script>

<style scoped>
.card {
  width: 250px;
  height: 260px;
  background-color: inherit;
  .card-body {
    background-color: inherit;
  }
  .card-header {
    background-color: inherit;
    border: none;
  }
}


@media screen and (max-width: 767px) {
  .card-parent{
    flex-direction: column;
    align-items: center;
    
  
  }

}
</style>
