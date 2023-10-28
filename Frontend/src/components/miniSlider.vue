<template>
  <div id="parent" class="d-flex">
    <div class="w-25 d-flex justify-content-center align-items-center">
      <div class="">
        <p class="fs-1 text-center text-white mb-0 p" >{{ p }} </p>
        <p class="fs-2 text-center text-white mb-0 p-responsive" > {{ p }}</p>

        <p class="fs-1 text-center text-white mt-0">کتاب ها</p>
      </div>
    </div>
    <div class="w-75 d-flex align-items-center">
      <swiper
        :modules="modules"
        :slides-per-view="5"
        :space-between="20"
        loop="true"
        :grid="grid"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :autoplay="autoplay"
        class="w-100 px-2 slider"
      >
        <swiper-slide
          @click="gotobook(x._id)"
          v-for="x in arr"
          :key="x._id"
          data-swiper-autoplay="2000"
          class="slide rounded-4 pointer"
          style=""
        >
          <div class="d-flex justify-content-center">
            <img
              :src="require(`../assets/${x.imgs[0].adress}`)"
              class="img-fluid rounded-3 pt-2"
              alt=""
            />
          </div>
          <p class="text-center mt-3 mb-0">{{ x.name }}</p>

          <div v-if="x.discount" class="mt-2">
            <p class="text-center p-0 m-0 discount text-secondary">
              {{ x.price }}
            </p>
            <p class="text-center">{{ x.value }} تومان</p>
          </div>
          <div v-else class="mt-2">
            <p class="text-center">{{ x.value }} تومان</p>
          </div>
        </swiper-slide>
      </swiper>
      <swiper
        :modules="modules"
        :slides-per-view="2"
        :space-between="20"
        loop="true"
        :grid="grid"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :autoplay="autoplay"
        class="w-100 px-2 slider-responsive"
      >
        <swiper-slide
          @click="gotobook(x._id)"
          v-for="x in arr"
          :key="x._id"
          data-swiper-autoplay="2000"
          class="slide rounded-4 pointer"
          style=""
        >
          <div class="d-flex justify-content-center">
            <img
              :src="require(`../assets/${x.imgs[0].adress}`)"
              class="img-fluid rounded-3 pt-2"
              alt=""
            />
          </div>
          <p class="text-center mt-3 mb-0 px-2">{{ x.name }}</p>

          <div v-if="x.discount" class="mt-2">
            <p class="text-center p-0 m-0 discount text-secondary">
              {{ x.price }}
            </p>
            <p class="text-center">{{ x.value }} تومان</p>
          </div>
          <div v-else class="mt-2">
            <p class="text-center">{{ x.value }} تومان</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Grid,
  Autoplay,
} from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";

import axios from "axios";
import { info } from "../../config/default";
let apiaddress = info.fetch["address"];

export default {
  name: "miniSlider",
  beforeMount() {
    axios.get(`${apiaddress}books`).then((res) => {
      res.data.forEach((e) => {
        let discount = e.discount;
        let price = e.price;
        if (discount) {
          const percentregex = /%/;
          const numberregex = /^\d+$/;
          if (percentregex.test(discount)) {
            const number = parseFloat(discount);

            e.value = price - (number / 100) * price;
            e.discountcval = e.price - e.value;
          } else if (numberregex.test(discount)) {
            e.value = price - discount;
            e.discountcval = e.price - e.value;
          }
        } else {
          return (e.value = price);
        }
      });

      if (this.sort == "mostbuy") {
        this.arr = [];
        this.p = "پرفروش ترین";
        this.arr = res.data.sort((a, b) => b.orders - a.orders).slice(0, 10);
      } else if (this.sort == "discount") {
        this.arr = [];
        this.p = "بیشترین تخفیف";

        res.data.forEach((e) => {
          if (e.discount) {
            this.arr.push(e);
          }
        });

        this.arr.sort((a, b) => b.discountval - a.discountval).slice(0, 10);
      } else if (this.sort == "newbooks") {
        this.arr = [];
        this.p = " جدید ترین";
        this.arr = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
      } else {
        this.arr = [];
        this.p = " مرتبط ترین";

        let index = res.data.findIndex((e) => e._id === this.id);
        res.data.splice(index, 1);
        res.data.forEach((e) =>
          e.genre === this.genre ? this.arr.push(e) : null
        );
      }
    });
  },
  data() {
    return {
      pagination: true,
      draggable: true,
      grid: { fill: "row", rows: "1" },
      autoplay: {
        delay: 2000,
      },
      arr: [],
      p:null
    };
  },
  props: ["sort", "bookid", "genre"],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y, Grid, Autoplay],
    };
  },
  methods: {
    gotobook: function (data) {
      location.href = `/book/${data}`;
    },
  },
};
</script>

<style scoped>
#parent {
  height: 260px;
  background-color: var(--red);
}
img {
  height: 120px;
}
.slide {
  height: 220px;
  width: 180px !important;
  background-color: white;
}
.discount {
  text-decoration: line-through var(--red) 2px;
  font-size: 12px;
}
.slider-responsive {
  display: none;
}
.p-responsive{
  display: none;
}
@media screen and (max-width: 767px) {
  .slider {
    display: none !important;
  }
  .slider-responsive{
    display: block;
  }
  .p-responsive{
  display: block;
}
.p{
  display: none;
}
}
</style>
