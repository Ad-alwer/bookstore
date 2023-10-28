<template>
  <div class="container-fluid">
    <siteheader />
    <div
      class="d-flex  sort-div align-items-baseline justify-content-start w-100 mx-5 mt-5"
    >
      <div class="w-25 filter-parent">
        <Icon
          icon="mdi:filter"
          width="25"
          height="25"
          class="pointer "
          @click="showsort = true"
        />
      </div>
      <div class="w-25 filter-parent-responsive">
        <Icon
          icon="mdi:filter"
          width="20"
          height="20"
          class="pointer "
          @click="showsort = true"
        />
      </div>
      <div class="mx-5 px-3 mt-5 d-flex w-100 sort-parent">
        <p
          :class="
            sort == 'mostbuy'
              ? 'text-center fs-5 sort-items pointer color-red'
              : 'text-center fs-5 sort-items pointer'
          "
          @click="changesort('mostbuy')"
        >
          پرفروش ترین
        </p>
        <p
          :class="
            sort == 'expensive'
              ? 'text-center fs-5 sort-items pointer color-red'
              : 'text-center fs-5 sort-items pointer'
          "
          @click="changesort('expensive')"
        >
          گران ترین
        </p>
        <p
          :class="
            sort == 'cheep'
              ? 'text-center fs-5 sort-items pointer color-red'
              : 'text-center fs-5 sort-items pointer'
          "
          @click="changesort('cheep')"
        >
          ارزون ترین
        </p>
        <p
          :class="
            sort == 'discount'
              ? 'text-center fs-5 sort-items pointer color-red'
              : 'text-center fs-5 sort-items pointer'
          "
          @click="changesort('discount')"
        >
          بیشترین تخفیف
        </p>
        <p
          :class="
            sort == 'newbook'
              ? 'text-center fs-5 sort-items pointer color-red'
              : 'text-center fs-5 sort-items pointer'
          "
          @click="changesort('newbook')"
        >
          جدید ترین
        </p>
      </div>
    </div>
    <hr class="mt-5 px-5" />
    <div>
      <div class="d-flex gap-5 flex-wrap product-parent ">
        <div
          class="card pointer"
          v-for="x in books"
          :key="x.name"
          @click="bookpage(x._id)"
        >
          <div class="d-flex justify-content-center">
            <img
              :src="require(`../assets/${x.imgs[0]['adress']}`)"
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
    </div>
    <filtermenu
      v-show="showsort"
      @closepopup="showsort = false"
      @sorted="filtered"
      :genre="genre"
    />
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

import siteheader from "./header.vue";
import filtermenu from "./Products/sort.vue";
import axios from "axios";
import { info } from "../../config/default";
let apiaddress = info.fetch["address"];

export default {
  name: "products",
  beforeMount() {
    this.getdata();
  },
  data() {
    return {
      sort: null,
      books: [],
      pagenation: 1,
      genre: null,
      filter: {},
      showsort: false,
    };
  },
  methods: {
    bookpage: function (e) {
      location.href = `/book/${e}`;
    },
    changesort: function (e) {
      this.sort = e;
      this.getdata();
    },
    getdata: function () {
      this.genre = decodeURIComponent(location.pathname.split("/books/")[1]);

      this.books = [];
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

        res.data = this.books.slice(
          this.pagenation * 15 - 15,
          this.pagenation * 15
        );

        if (Object.keys(this.filter).length > 0) {
          this.books = res.data;
          this.filter.available
            ? (this.books = this.books.filter((e) => e.available))
            : null;

          this.filter.discount
            ? (this.books = this.books.filter((e) => e.discount))
            : null;

          this.filter.finalgenre.length > 0
            ? (this.books = this.books.filter((e) =>
                this.filter.finalgenre.includes(e.genre)
              ))
            : null;

          this.books = this.books.filter(
            (e) =>
              e.value > this.filter.range[0] && e.value < this.filter.range[1]
          );
        }
        if (this.sort) {
          if (this.sort == "mostbuy") {
            let notavailable = [];
            let sortdata = [];
            this.books.forEach((e) => {
              if (!e.available) {
                notavailable.push(e);
              } else {
                sortdata.push(e);
              }
            });
            this.books = sortdata.sort((a, b) => b.orders - a.orders);
            this.books = this.books.concat(notavailable);
          } else if (this.sort == "expensive") {
            let notavailable = [];
            let sortdata = [];
            this.books.forEach((e) => {
              if (!e.available) {
                notavailable.push(e);
              } else {
                sortdata.push(e);
              }
            });
            this.books = sortdata.sort((a, b) => b.value - a.value);

            notavailable.forEach((e) => this.books.push(e));
          } else if (this.sort == "cheep") {
            let notavailable = [];
            let sortdata = [];
            this.books.forEach((e) => {
              if (!e.available) {
                notavailable.push(e);
              } else {
                sortdata.push(e);
              }
            });
            this.books = sortdata.sort((a, b) => b.value - a.value).reverse();
            notavailable.forEach((e) => this.books.push(e));
          } else if (this.sort == "discount") {
            let discount = [];
            let nondiscount = [];
            let notavailable = [];
            this.books.forEach((e) => {
              if (!e.available) {
                notavailable.push(e);
              } else if (e.discountcval) {
                discount.push(e);
              } else {
                nondiscount.push(e);
              }
            });
            this.books = discount.sort(
              (a, b) => b.discountcval - a.discountcval
            );

            this.books = this.books.concat(nondiscount, notavailable);
          } else {
            let notavailable = [];
            let sortdata = [];
            this.books.forEach((e) => {
              if (!e.available) {
                notavailable.push(e);
              } else {
                sortdata.push(e);
              }
            });
            this.books = sortdata.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            this.books = this.books.concat(notavailable);
          }
        }
      });
    },
    filtered: function (e) {
      this.filter = e;
      this.getdata();
    },
  },
  components: {
    siteheader,
    Icon,
    filtermenu,
  },
};
</script>

<style scoped>
.sort-items {
  flex: 1;
}
.sort-items:hover {
  color: var(--red);
  fill: 0.8;
}
hr {
  border: 1px solid var(--red);
}
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
.icons {
  position: relative;
  top: 40%;
  left: 5%;
}
/* .price{
  font-size: 14px;
} */
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
.box {
  position: absolute;
  top: 0;
}
.color-red {
  color: var(--red);
}
.filter-parent-responsive{
 display: none;
}
@media screen and (max-width: 767px) {

.product-parent{
 justify-content: center;
 margin-bottom: 10px;
 gap: 10px !important;

}
.sort-items{
flex: 1;
font-size: 15px !important;
}
.filter-parent{
  display: none;
}
.filter-parent-responsive{
 display: block;
 width: 2% !important;

}
.sort-parent{
  width: 90% !important;
}
.sort-div{
  margin: 0 17px!important;
}
hr{
  margin-top: 0 !important;
}
}
</style>
