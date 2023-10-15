<template>
  <div id="parent" class="container mt-5">
    <div class="border-1 border border-secondary rounded-3">
      <div class="d-flex justify-content-center position-relative m-3">
        <p class="fs-3">بنر های سایت</p>
        <Icon
          class="edit-icon pointer"
          icon="material-symbols:edit-outline"
          width="20"
          height="20"
          @click="bannereditshower = true"
        />
      </div>
      <div class="d-flex justify-content-center gap-3">
        <div v-for="x in banner" :key="x">
          <img
            :src="require(`../../assets/${x.adress}`)"
            class="rounded"
            alt=""
          />
          <p class="text-center pt-2">{{ x.adress }}</p>
        </div>
      </div>
    </div>
    <div class="border-1 border border-secondary rounded-3 mt-2 p-3">
      <div class="d-flex justify-content-center position-relative m-3">
        <p class="fs-3">دسته بندی کتاب ها</p>
        <Icon
          class="edit-icon pointer"
          icon="material-symbols:edit-outline"
          width="20"
          height="20"
        />
      </div>
      <div class="justify-content-center d-flex gap-5 flex-wrap">
        <p class="p-genre rounded px-3 py-2" v-for="x in arr.genre" :key="x">
          {{ x }}
        </p>
      </div>
    </div>
    <div class="border-1 border border-secondary rounded-3 mt-2 p-3">
      <p class="fs-3 text-center">تنظیمات نمایش</p>
      <div class="d-flex justify-content-evenly">
        <div class="d-flex gap-4 options-div">
          <span class="spans-title fs-5">پرفروش ترین ها </span>

          <div class="pt-2">
            <input
              type="checkbox"
              class="offscreen"
              name=""
              id="mostbuy"
              :checked="arr.mostbuy"
            />
            <label
              class="switch"
              for="mostbuy"
              @click="changetoggle('mostbuy')"
            ></label>
          </div>
        </div>
        <div class="d-flex gap-4 options-div">
          <span class="spans-title fs-5">تخفیف ها</span>

          <div class="pt-2">
            <input
              type="checkbox"
              class="offscreen"
              name=""
              id="discount"
              :checked="arr.discounted"
            />
            <label
              class="switch"
              for="discount"
              @click="changetoggle('discounted')"
            ></label>
          </div>
        </div>
        <div class="d-flex gap-4 options-div">
          <span class="spans-title fs-5">کتاب های جدید</span>

          <div class="pt-2">
            <input
              type="checkbox"
              class="offscreen"
              name=""
              id="newbook"
              :checked="arr.newbooks"
            />
            <label
              class="switch"
              for="newbook"
              @click="changetoggle('newbooks')"
            ></label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <banneredit
    v-if="bannereditshower"
    class=""
    @closepopup="closepopup"
    @success="success"
  />
  <genreedit v-if="genreeditshower" class="" @closepopup="closepopup" />
</template>

<script>
import { Icon } from "@iconify/vue";
import banneredit from "./popupupdatebanner.vue";
import genreedit from "./popupupdategenres.vue";
import Swal from "sweetalert2";
import axios from "axios";
import { info } from "../../../config/default";

let apiaddress = info.fetch["address"];

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default {
  name: "Base",
  beforeMount() {
    this.getdata();
  },
  components: {
    Icon,
    banneredit,
    genreedit,
  },
  data() {
    return {
      bannereditshower: false,
      genreeditshower: false,
      arr: [],
      banner: [],
    };
  },
  methods: {
    closepopup: function () {
      this.bannereditshower = false;
      this.genreeditshower = false;
    },
    success: function () {
      Toast.fire({
        icon: "success",
        title: `عملیات با موفقیت انجام شد`,
      });
    },
    getdata: function () {
      axios.get(`${apiaddress}getbase`).then((data) => {
        this.arr = data.data;
        this.banner = [];
        this.arr.banner.forEach((e) => {
          if (e.link != "null") {
            this.banner.push(e);
          }
        });
      });
    },
    changetoggle: function (e) {
      axios.get(`${apiaddress}changebase/${e}`).then((data) => {
        if (data.data.status) {
          this.getdata();
        }
      });
    },
  },
};
</script>

<style scoped>
.edit-icon {
  position: absolute;
  left: 2%;
  top: 5%;
}
img {
  height: 200px;
  width: 300px;
}
.p-genre {
  border: 1px dashed rgba(58, 57, 57, 0.54);
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
  transform: scale(1.2);
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
.options-div {
  height: 40px;
}
.spans-title {
  position: relative;
  top: 2px;
}
</style>
