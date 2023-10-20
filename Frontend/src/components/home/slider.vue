<template>
 <div id="parent" class="d-flex justify-content-center mx-4 mt-5 ">
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="10"
    navigation
    
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
      v-for="x in arr"
      :key="x"
    >
    <a :href="x.link">
      <img :src="require(`../../assets/${x.adress}`)" alt="" class="img-fluid rounded-4 w-100 mb-5  " />
      
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

import axios from "axios";
import { info } from "../../../config/default";
let apiaddress = info.fetch["address"];


// Import Swiper styles
export default {
  beforeMount(){
    axios.get(`${apiaddress}getbase`,).then(res=>{
      this.arr =res.data.banner
    })
  },
  data() {
    return {
     
      pagination: true,
      draggable: true,
      grid: { fill: "row", rows: "1" },
      autoplay: {
        delay: 2000,
      },
      arr:[]
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
