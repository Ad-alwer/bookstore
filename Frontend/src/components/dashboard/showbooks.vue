<template>
  <div  id="parent" class="container mt-3">
   <div  :class="editshow ? 'blur' : ''">
    <h2 class="text-center">کتاب ها</h2>
    <hr />
    <div v-if="books.length > 0" class="d-flex gap-3 justify-content-end flex-wrap">
      <div class="card" v-for="x in books" :key="x.name">
        <div class="d-flex justify-content-center">
          <img
            :src="require(`../../assets/${ x.imgs[0]['adress'] }`)"
            alt=""
            class="img-fluid rounded-3 mt-2 card-img-top"
          />
        </div>
        <div class="card-body">
          <p class="text-center">{{}}</p>
        </div>
        <div class="card-footer d-flex gap-5">
          <div class="card-texts">
            <div v-if="x.discount">
              <span class="d-block discount text-center" v-if="x.discount">
                {{ x.price }}
              </span>
              <span ref=""> {{ discountchecker(x.discount, x.price) }}</span>
              <span class="toman pe-1">تومان </span>
            </div>
            <div v-else>
              <span ref=""> 255000</span>
              <span class="toman pe-1">تومان </span>
            </div>
          </div>
          <div :class="x.discount ? 'd-flex icons gap-3' : 'd-flex  gap-2'">
            <Icon
              icon="material-symbols:edit-outline"
              color="gray"
              width="23"
              height="23"
              class="pointer"
              @click="id = x._id;editshow=true"
            />
            <Icon
              icon="mdi:bin-outline"
              color="#fc345c"
              width="23"
              height="23"
              class="pointer"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center mt-3">
      <img src="../../assets/imgs/notfound.png" alt="" />
    </div>
   </div>
    <popup :id="id" v-if="editshow"/>
    
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import popup from "./showbookpopup.vue"

import axios from "axios";
import { info } from "../../../config/default";

//   import Swal from "sweetalert2";

let apiaddress = info.fetch["address"];

//   const Toast = Swal.mixin({
//     toast: true,
//     position: "top-end",
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//       toast.addEventListener("mouseenter", Swal.stopTimer);
//       toast.addEventListener("mouseleave", Swal.resumeTimer);
//     },
//   });

export default {
  name: "ShowBooks",
  beforeMount() {
    axios.get(`${apiaddress}books`).then((res) => {
      this.books = res.data;
    });
  },
  components: {
    Icon,
    popup
  },
  data() {
    return {
      discountmodel: "",
      spanshow: false,
      books: [],
      editshow:false,
      id:null
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
  },
};
</script>

<style scoped>
.card {
  width: 200px;
  height: 260px;
}
img {
  width: 150px;
  height: 150px;
}
.card-body {
  height: 30px;
}
.card-footer {
  border: none;
}
.icons {
  position: relative;
  top: 40%;
  left: 5%;
}

.discount {
  text-decoration: var(--red) line-through 2px;
  font-size: 12px;
}
.toman {
  font-size: 10px;
}
.blur {
  filter: blur(4px);
}
</style>
