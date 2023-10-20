<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <div class="popup-inner">
      <div>
        <Icon
          icon="ph:x-bold"
          color="#fc345c"
          width="30"
          height="30"
          class="pointer"
          @click="close"
        />
      </div>
      <p class="fs-2 text-center">فیلترها</p>
      <div>
        <div class="d-flex justify-content-between mx-4 mb-2">
          <p class="fs-5">دسته بندی</p>
          <Icon
            class="text-secondary pt-1 pointer"
            icon="icon-park:right"
            width="25"
            height="25"
            :rotate="genresshow ? 3 : 1"
            @click="genresshow = !genresshow"
          />
        </div>
        <div class="mt-1 mx-4" v-if="genresshow">
          <div class="pb-1 d-flex gap-5" v-for="x in genres">
            <input
              type="checkbox"
              class="form-check"
              :id="x.name"
              :checked="x.checked"
              @click="x.checked = !x.checked"
            />
            <label class="pointer form-check-label" :for="x.name">{{
              x.name
            }}</label>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center px-3">
        <v-range-slider
          class="mt-5 pt-5"
          min="100000"
          max="1000000"
          step="50000"
          v-model="value"
          thumb-label="always"
        ></v-range-slider>
      </div>

      <div class="mt-5 mx-4 d-flex justify-content-between">
        <label for="discount" class="fs-5">نمایش تخفیف دار ها</label>
        <input
          type="checkbox"
          class="offscreen"
          name=""
          id="discount"
          ref="discount"
        />
        <label class="switch mt-2" for="discount"></label>
      </div>
      <div class="mt-5 mx-4 d-flex justify-content-between">
        <label for="available" class="fs-5">فقط نمایش موجود ها</label>
        <input
          type="checkbox"
          class="offscreen"
          name=""
          id="available"
          ref="available"
        />
        <label class="switch mt-2" for="available"></label>
      </div>
      <div class="mt-5 pt-2 d-flex justify-content-center gap-5">
        <button class="btn-red px-4 py-2 mt-2 btn text-white" @click="save">
          اعمال فیلتر
        </button>
        <button
          class="btn-secondary px-4 py-2 mt-2 btn text-white"
          @click="reset"
        >
          حذف فیلتر ها
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

import axios from "axios";
import { info } from "../../../config/default";

let apiaddress = info.fetch["address"];
export default {
  name: "basket",
  beforeMount() {
    axios.get(`${apiaddress}getbase`).then((res) => {
      res.data.genre.forEach((e) => {
        if (e === this.genre) {
          let newgenre = {
            name: e,
            checked: true,
          };
          this.genres.push(newgenre);
        } else {
          let newgenre = {
            name: e,
            checked: false,
          };
          this.genres.push(newgenre);
        }
      });

      const filter = this.genres.filter((e) => e.checked === true);
      if(filter.length > 0){
        this.value = [100000, 1000000];
        this.save()
      }
    });
  },
  components: {
    Icon,
  },
  props: ["genre"],

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
    save: function () {
      let finalgenre = [];
      this.genres.forEach((e) => {
        if (e.checked) {
          finalgenre.push(e.name);
        }
      });
      let discount = this.$refs.discount.checked ? true : false;
      let available = this.$refs.available.checked ? true : false;
      const data = {
        finalgenre,
        discount,
        available,
        range: this.value,
      };
      this.$emit("sorted", data);
      this.close();
    },
    reset: function () {
      this.genres.forEach((e) => {
        e.checked = false;
      });
      this.$refs.discount.checked = false;
      this.$refs.available.checked = false;
      this.value = [100000, 1000000];
    },
  },
  data() {
    return {
      value: [150000, 850000],
      genres: [],
      genresshow: false,
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
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: all 0.3s;
  border-radius: 20px;
  cursor: pointer;
}
.switch::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background: #fff;
  top: 1px;
  left: 1px;
  transition: all 0.3s;
}
input[type="checkbox"]:checked + .switch::after {
  transform: translateX(20px);
}

input[type="checkbox"]:checked + .switch {
  background: var(--mint);
}
.offscreen {
  display: none;
}
.btn-red {
  background-color: var(--red);
}
</style>

//FIX DISCOUNT AND PRICE SHOWER
