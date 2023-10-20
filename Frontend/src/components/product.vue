<template>
  <div id="parent" class="container-fluid mt-2">
    <homeheader id="header" />
    <div id="slider" class="d-flex justify-content-center mt-4">
      <swiper
        id="swiper"
        :modules="modules"
        :slides-per-view="1"
        :space-between="10"
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
        <swiper-slide v-for="x in book.imgs" :key="x.name" data-swiper-autoplay="2000" class="w-100 slider" style="">
          <img
            :src="require(`../assets/${x.adress}`)"
            alt=""
            class="img-fluid rounded-4 w-100"
          />
        </swiper-slide>
       
      </swiper>
    </div>
    <div class="mt-5 px-4" id="detail">
      <h1 class="text-center mt-3">{{ book.name }}</h1>
      <h5 class="text-center pt-3 text-secondary">{{ book.author }}</h5>
      <h5 class="text-center pt-1 text-secondary">{{ book.genre }}</h5>
      <div class="justify-content-center d-flex mx-5">
        <textarea
          class="border-2 rounded-4 px-4 py-3 form-control text-secondary"
          name=""
          disabled
          id=""
          :value="book.description"
          cols="20"
          rows="5"
        ></textarea>
      </div>

      <div class="div-btn mt-4 d-flex">
        <button @click="addtocard" class="px-3 py-2 text-center btn-red btn text-white">
          افزودن به سبد خرید
        </button>
        <Icon
          class="mt-1 mx-3 pointer"
          icon="mdi:heart"
          :color="like ? '#fc345c' : '#adadad'"
          width="30"
          height="30"
          @click="favourite"
        />

        <!-- <div >
                <span class="d-block discount text-center" >
                  25000
                </span>
                <span ref="" class="price">
                 25000</span
                >
                <span class="toman pe-1">تومان </span>
              </div> -->
        <div :class="book.discount ? 'mt-2 price' : 'mt-2 pricediscount'">
          <div v-if="book.discount">
            <span class="d-block discount text-center">
              {{ book.price }}
            </span>
            <span ref="" class="">
              {{ discountchecker(book.discount, book.price) }}</span
            >
            <span class="toman pe-1">تومان </span>
          </div>
          <div v-else>
            <span ref="">{{ book.price }}</span>
            <span class="toman pe-1">تومان </span>
          </div>
        </div>
      </div>
    </div>

    <!-- <div id="related book" class="py-1 px-2 mt-5 mx-3 rounded-4 mb-2"></div> -->
    <miniSlider sort="related" :bookid="this.id" :genre="book.genre" id="relatedbook" class="mt-5"/>
    <footerpage id="footer"/>
  </div>
  <popup
    v-if="loginpopup"
    @closepopup="loginpopup = false"
    txt="برای افزودن این کنابه به علاقه مندی ها باید اول وارد شوید"
  />
</template>

<script>
import homeheader from "./header.vue";
import { Icon } from "@iconify/vue";
import popup from "./loginpopup.vue";
import miniSlider from "./miniSlider.vue"
import footerpage from "./Footer.vue";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Grid,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";

import axios from "axios";
import { info } from "../../config/default";

import funcs from "./login.vue";



let jwt = funcs.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];


export default {
  name: "Product",
  beforeMount() {
    this.id = location.pathname.split("/book/")[1];
    axios.get(`${apiaddress}book/${this.id}`).then((res) => {
      if (res.data[0]) {
        this.book = res.data[0];
      } else {
        location.href = "/404";
      }
    });
    this.favouritechecker();
  },
  data() {
    return {
      id: null,
      book: [],
      user: null,
      like: false,
      loginpopup: false,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    homeheader,
    Icon,
    popup,
    miniSlider,
    footerpage
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
    discountchecker: function (discount, value) {
      const percentregex = /%/;
      const numberregex = /^\d+$/;
      if (percentregex.test(discount)) {
        const number = parseFloat(discount);
        return value - (number / 100) * value;
      } else if (numberregex.test(discount)) {
        return value - discount;
      }
    },
    favourite: function () {
      if (jwt) {
        axios.post(`${apiaddress}favourite`, {
          book: {
            id: this.book._id,
            name: this.book.name,
          },
          user: this.user._id,
        }).then(res=>{
            if(res.data.status){
                this.favouritechecker()
            }
        })
       
      } else {
        this.loginpopup = true;
      }
    },
    favouritechecker: function () {
     if(jwt){
      axios.get(`${apiaddress}find/${jwt}`).then((res) => {
        this.user = res.data.data;
        let check = this.user.favourite.find(
          (item) => item.id === this.book._id
        );
        if (check) {
          this.like = true;
        } else {
          this.like = false;
        }
      });
     }
    },
    addtocard:function(){
      if(jwt){
        axios.post(`${apiaddress}addtocard`,{
        userid:this.user._id,
        book:{
          img:this.book.imgs[0].adress,
          name:this.book.name,
          id:this.book._id,
          number:1

        }
      })
      }else{
        this.loginpopup = true;
      }
      
    }
  },
};
</script>

<style scoped>
#parent {
  display: grid;
  grid: auto auto auto auto auto / 45% 55%;
  /* grid-row: auto auto auto;
  grid-column: 80% 20%; */
}
#header {
  grid-row: 1;
  grid-column: 1 / span 2;
}
#slider {
  grid-row: 2;
  grid-column: 1;
  border-left: 3px solid rgba(151, 151, 151, 0.3);
}
#detail {
  grid-row: 2;
  grid-column: 2;
}
#addcomment {
  grid-row: 3;
  grid-column: 1 / span 2;
}
#relatedbook {
  height: 270px;
 
  background-color: var(--red);
  grid-row: 4;
  grid-column: 1 / span 2;
}
#footer{
  grid-row: 5;
  grid-column: 1 / span 2;
  
}

#swiper {
  width: 400px;
  height: 400px;
}

img {
  height: 90%;
}
.other-img-show {
  width: 200px;
  height: 200px;
}
.btn-red {
  cursor: pointer;
  background-color: var(--red);
  width: 60%;
}
.div-btn {
  /* margin-top: 120px; */
  position: relative;
}
.price {
  position: absolute;
  left: 10px;
  top: -17px;

  font-size: 20px;
}
.pricediscount {
  position: absolute;
  left: 10px;
  font-size: 20px;
}
textarea {
  resize: none;
}
.form-control:focus {
  outline: none;
  box-shadow: none;
}
.card-comments {
  width: 300px;
  height: 220px;
}
.card-img {
  width: 100px;
  height: 100px;
}
.card-body {
  height: 100%;
}
input {
  width: 300px;
}
textarea.addcommenttxt {
  width: 450px;
  height: 50px;
}
.discount {
  text-decoration: var(--red) line-through 2px;
  font-size: 13px;
}
.blur {
  filter: blur(1px);
}
.text-secondary{
  color: #6C8BC0 !important
}
</style>

//TODO ADD footer to this //TODO ADD related book to this
