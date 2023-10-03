<template>
 <div id="parent" class="d-flex justify-content-center mx-4 mt-4 ">
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="10"
    navigation
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
    loop="true"
    :grid="grid"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :autoplay="autoplay"
    centerInsufficientSlides="true"
    center-insufficient-slides="true"
    centered-slides-bounds="true"
    centered-slides="true"
  >
    <swiper-slide
      data-swiper-autoplay="2000"
      class="w-100 slider"
      style=""
      v-for="x in photo"
      :key="x"
    >
    <a href="">
      <img :src="x" alt="" class="img-fluid rounded-4 w-100 mb-5  " />
    </a>
    </swiper-slide>
  </swiper>
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


// Import Swiper styles
export default {
  data() {
    return {
      photo: [
        `${require("../../assets/imgs/1.webp")}`,
        `${require("../../assets/imgs/2.webp")}`,
        `${require("../../assets/imgs/3.webp")}`,
      ],
      pagination: true,
      draggable: true,
      grid: { fill: "row", rows: "1" },
      autoplay: {
        delay: 2000,
      },
    };
  },
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
};
</script>

<style scoped>
img{
width: 100vw;
height: 450px;
}

</style>
