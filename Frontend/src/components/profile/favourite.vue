<template>
  <div id="parent" class="container">
    <h1 class="text-center mt-2">علاقه مندی ها</h1>
    <div class="d-flex gap-5 flex-wrap mt-3 product-parent">
      <div
        class="card pointer"
        v-for="x in books"
        :key="x.name"
        @click="bookpage(x._id)"
      >
        <div class="d-flex justify-content-center">
          <img
            :src="require(`../../assets/${x.imgs[0]['adress']}`)"
            alt=""
            class="img-fluid rounded-3 mt-2 card-img-top"
          />
        </div>
        <div class="card-body">
          <p class="text-center">{{ x.name }}</p>
        </div>
        <div class="card-footer d-flex gap-5 justify-content-end">
          <div class="card-texts">
            <div v-if="!x.available">
              <span class="">ناموجود</span>
            </div>
            <div v-else-if="x.discount">
              <span class="d-block discount text-center" v-if="x.discount">
                {{ x.price }}
              </span>
              <span ref="" class="price"> {{ x.value }} </span>
              <span class="toman pe-1">تومان </span>
            </div>

            <div v-else>
              <span ref="" class="price"> {{ x.price }}</span>
              <span class="toman pe-1">تومان </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Icon
      icon="material-symbols:home-outline"
      width="35"
      height="35"
      @click="gotohome"
      class="home"
    />
  </div>
</template>

<script>
import axios from "axios";
import { info } from "../../../config/default";
import { Icon } from "@iconify/vue";
import funcs from "../login.vue";

let jwt = funcs.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];
export default {
  name: "favourite",
  beforeMount() {
    if (jwt) {
      axios.get(`${apiaddress}profile/${jwt}`).then((res) => {
        res.data.favourite.forEach((e) => {
          axios.get(`${apiaddress}book/${e.id}`).then((data) => {
            data.data.forEach((e) => {
              let discount = e.discount;
              let price = e.price;
              if (discount) {
                const percentregex = /%/;
                const numberregex = /^\d+$/;
                if (percentregex.test(discount)) {
                  const number = parseFloat(discount);

                  e.value = price - (number / 100) * price;
                  e.discountcval = e.price - e.value;
                  this.books.push(e);
                } else if (numberregex.test(discount)) {
                  e.value = price - discount;
                  e.discountcval = e.price - e.value;
                  this.books.push(e);
                }
              } else {
                e.value = price;
                this.books.push(e);
              }
            });
          });
        });
      });
    }
  },
  data() {
    return {
      books: [],
    };
  },
  methods: {
    bookpage: function (e) {
      location.href = `/book/${e}`;
    },
    gotohome: function () {
      location.href = `/`;
    },
  },
  components:{
    Icon
  }
};
</script>

<style scoped>
.card {
  width: 240px;
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
.card-texts {
  position: relative;
}
.home {
  position: absolute;
  bottom: 7%;
  right: 7%;
  cursor: pointer;
 
}
@media screen and (max-width: 767px) {
  .product-parent{
 justify-content: center;
 margin-bottom: 10px;
 gap: 10px !important;

}
}
</style>
