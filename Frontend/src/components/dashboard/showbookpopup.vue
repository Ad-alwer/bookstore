<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <form
      class="popup-inner d-flex justify-content-center flex-column gap-2 rounded-4"
    >
      <div class="d-flex flex-row gap-3">
        <div class="">
          <div class="imgbox" v-show="img1flag">
            <input
              id="inp1"
              type="file"
              class="d-none"
              ref="inp1"
              @change="addimg(`inp1`, `img1`)"
            />
            <img :src="img1src" class="img-fluid rounded-3" ref="img1" alt="" />
            <div class="d-flex justify-content-center mt-2">
              <Icon
                icon="ph:x-bold"
                color="red"
                width="30"
                height="30"
                class="pointer border border-1 border-danger rounded-circle p-1"
                @click="imgremove('img1')"
              />
            </div>
          </div>
          <div
            v-if="!img1flag"
            class="add border border-1 border-secondary rounded-3 d-flex justify-content-center align-items-center"
          >
            <label class="d-flex justify-content-center" for="inp1">
              <Icon
                icon="typcn:plus"
                color="#49beb7"
                width="40"
                height="40"
                class="rounded-circle plusbtn"
              />
            </label>
          </div>
        </div>
        <div class="">
          <div class="imgbox" v-show="img2flag">
            <input
              id="inp2"
              type="file"
              class="d-none"
              ref="inp2"
              @change="addimg(`inp2`, `img2`)"
            />
            <img :src="img2src" ref="img2" alt="" />
            <div class="d-flex justify-content-center mt-2">
              <Icon
                icon="ph:x-bold"
                color="red"
                width="30"
                height="30"
                class="pointer border border-1 border-danger rounded-circle p-1"
                @click="imgremove('img2')"
              />
            </div>
          </div>
          <div
            v-if="!img2flag"
            class="add border border-1 border-secondary rounded-3 d-flex justify-content-center align-items-center"
          >
            <label class="d-flex justify-content-center" for="inp2">
              <Icon
                icon="typcn:plus"
                color="#49beb7"
                width="40"
                height="40"
                class="rounded-circle plusbtn"
              />
            </label>
          </div>
        </div>
        <div class="">
          <div class="imgbox" v-show="img3flag">
            <input
              id="inp3"
              type="file"
              class="d-none"
              ref="inp3"
              @change="addimg(`inp3`, `img3`)"
            />
            <img :src="img3src" class="img-fluid rounded-3" ref="img3" alt="" />
            <div class="d-flex justify-content-center mt-2">
              <Icon
                icon="ph:x-bold"
                color="red"
                width="30"
                height="30"
                class="pointer border border-1 border-danger rounded-circle p-1"
                @click="imgremove('img3')"
              />
            </div>
          </div>
          <div
            v-if="!img3flag"
            class="add border border-1 border-secondary rounded-3 d-flex justify-content-center align-items-center"
          >
            <label class="d-flex justify-content-center" for="inp3">
              <Icon
                icon="typcn:plus"
                color="#49beb7"
                width="40"
                height="40"
                class="rounded-circle plusbtn"
              />
            </label>
          </div>
        </div>
        <div class="">
          <div class="imgbox" v-show="img4flag">
            <input
              id="inp4"
              type="file"
              class="d-none"
              ref="inp4"
              @change="addimg(`inp4`, `img4`)"
            />
            <img :src="img4src" class="img-fluid rounded-3" ref="img4" alt="" />
            <div class="d-flex justify-content-center mt-2">
              <Icon
                icon="ph:x-bold"
                color="red"
                width="30"
                height="30"
                class="pointer border border-1 border-danger rounded-circle p-1"
              />
            </div>
          </div>
          <div
            v-if="!img4flag"
            class="add border border-1 border-secondary rounded-3 d-flex justify-content-center align-items-center"
          >
            <label class="d-flex justify-content-center" for="inp4">
              <Icon
                icon="typcn:plus"
                color="#49beb7"
                width="40"
                height="40"
                class="rounded-circle plusbtn"
                @click="imgremove('img4')"
              />
            </label>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column gap-2">
        <input
          type="text"
          placeholder="نام کتاب"
          class="border-secondary form-control"
          ref="name"
        />
        <input
          type="text"
          placeholder="نام نویسنده"
          class="border-secondary form-control"
          ref="author"
        />
        <input
          type="number"
          placeholder="قیمت"
          min="0"
          class="border-secondary form-control"
          ref="price"
          @keyup.prevent="
            discountchecker(this.$refs.discount.value, this.$refs.price.value)
          "
        />

        <input
          type="number"
          min="0"
          placeholder="سال انتشار"
          class="border-secondary form-control"
          ref="year"
        />
        <select
          name=""
          id=""
          class="form-control border-secondary text-secondary"
          ref="genre"
        >
          <option value="روانشناسی" selected>روانشناسی</option>
        </select>
        <div class="d-flex gap-2">
          <input
            type="text"
            id="discount"
            placeholder="تخفیف"
            class="border-secondary form-control"
            ref="discount"
            @keyup.stop="
              discountchecker(this.$refs.discount.value, this.$refs.price.value)
            "
          />
          <label
            class="border border-secondary form-control text-secondary text-center"
            for="discount "
            >{{ discount ? discount : "قیمت پس از تخفیف" }}</label
          >
        </div>
        <textarea
          name=""
          id=""
          cols="20"
          class="form-control pb-4 border-secondary"
          rows="5"
          v-model="lenghtshower"
          placeholder="توضیحات"
          maxlength="895"
          ref="textarea"
        ></textarea>
        <P class="spanshow mx-3">
          {{ 900 - lenghtshower.length }} / {{ lenghtshower.length }}</P
        >
      </div>
      <div class="d-flex justify-content-center gap-3 mt-1">
        <button class="btn btn-primary px-3 py-2" @click.prevent="save">
          ثبت
        </button>
        <button class="btn btn-secondary px-3 py-2" @click.prevent="close">
          انصراف
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import axios from "axios";

import { info } from "../../../config/default";

 import Swal from "sweetalert2";

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
  name: "popupchange",
  beforeMount() {
    axios.get(`${apiaddress}book/${this.id}`).then((res) => {
      this.data = res.data[0];
      this.lenghtshower = this.data.description;

      this.$refs.discount.value = this.data.discount;
      this.$refs.price.value = this.data.price;
      this.$refs.author.value = this.data.author;
      this.$refs.name.value = this.data.name;
      this.$refs.year.value = this.data.year;

      this.discount = this.data.discount
        ? this.discountchecker(this.data.discount, this.data.price)
        : null;

      // this.img1flag = this.data.imgs[0] ? true : null;
      // this.img2flag = this.data.imgs[1] ? true : null;
      // this.img3flag = this.data.imgs[2] ? true : null;
      // this.img4flag = this.data.imgs[3] ? true : null;
      // this.img1src = this.img1flag
      //   ? require(`../../assets/${this.data.imgs[0].adress}`)
      //   : null;
      // this.img2src = this.img2flag
      //   ? require(`../../assets/${this.data.imgs[1].adress}`)
      //   : null;
      // this.img3src = this.img3flag
      //   ? require(`../../assets/${this.data.imgs[2].adress}`)
      //   : null;
      // this.img4src = this.img14lag
      //   ? require(`../../assets/${this.data.imgs[3].adress}`)
      //   : null;
    });
  },

  data() {
    return {
      lenghtshower: "",
      data: [],
      img1flag: null,
      img2flag: null,
      img3flag: null,
      img4flag: null,
      img1src: null,
      img2src: null,
      img3src: null,
      img4src: null,
      discount: "",
    };
  },
  components: {
    Icon,
  },

  props: ["id"],

  mounted() {
    document.addEventListener("keydown", this.esc);
    
  },

  methods: {
    discountchecker: function (discount, value) {
      const percentregex = /%/;
      const numberregex = /^\d+$/;
      if (percentregex.test(discount)) {
        const number = parseFloat(discount);
        return (this.discount = this.discount = value - (number / 100) * value);
      } else if (numberregex.test(discount)) {
        return (this.discount = this.discount = value - discount);
      }
    },

    addimg: function (inp, img) {
      if (img === "img1") {
        this.img1flag = true;
        this.img1src = URL.createObjectURL(this.$refs[inp].files[0]);
      } else if (img === "img2") {
        this.img2flag = true;
        this.img2src = URL.createObjectURL(this.$refs[inp].files[0]);
      } else if (img === "img3") {
        this.img3flag = true;
        this.img3src = URL.createObjectURL(this.$refs[inp].files[0]);
      } else {
        this.img4flag = true;
        this.img4src = URL.createObjectURL(this.$refs[inp].files[0]);
      }
    },
    imgremove: function (img) {
      if (img === "img1") {
        this.img1flag = false;
        this.img1src = false;
        this.$refs.inp1 ? this.$refs.inp1.defaultValue : null;
      } else if (img === "img2") {
        this.img2flag = false;
        this.img2src = false;
        this.$refs.inp2 ? this.$refs.inp2.defaultValue : null;
      } else if (img === "img3") {
        this.img3flag = false;
        this.img3src = false;
        this.$refs.inp3 ? this.$refs.inp3.defaultValue : null;
      } else {
        this.img4flag = false;
        this.img4src = false;
        this.$refs.inp4 ? this.$refs.inp4.defaultValue : null;
      }
    },
    close: function () {
      this.$emit("closepopup", "closed");
    },
    esc(event) {
      if (event.key === "Escape") {
        this.close();
      }
    },
    save: function () {
      if (
        this.$refs.inp1.files[0] ||
        this.$refs.inp2.files[0] ||
        this.$refs.inp3.files[0] ||
        this.$refs.inp4.files[0]
      ) {
        const formData = new FormData();
        let imginp = ["inp1", "inp2", "inp3", "inp4"];
        console.log(this.$refs);
        let counter = 1;

        imginp.forEach((e) => {
          if (this.$refs[e].files.length > 0) {
            console.log(this.$refs[e]);
            formData.append(`file${counter}`, this.$refs[e].files[0]);
            counter++;
          }
        });

        formData.append("bookid", this.id);
        formData.append("name", this.$refs.name.value);
        formData.append("author", this.$refs.author.value);
        formData.append("year", this.$refs.year.value);

        formData.append("discription", this.$refs.textarea.value);
        formData.append("price", this.$refs.price.value);
        formData.append("genre", this.$refs.genre.value);
        formData.append("discount", this.$refs.discount.value);

        axios
          .post(`${apiaddress}updatebook`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.status) {
              this.$emit("success", "success");
              this.close();
              Toast.fire({
                icon: "error",
                title: `${res.data.message}`,
              });
            }
          });
      } else {
        Toast.fire({
          icon: "error",
          title: `لطفا عکس انتخاب کنید`,
        });
      }
    },
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
    position: relative;
    padding: 20px;

    max-height: 780px;
    max-width: 1000px;
  }
}
.form-control:focus {
  outline: none;
  box-shadow: none;
}
::placeholder,
input[type="text"],
input[type="number"] {
  font-family: "B Koodak";
}

img {
  width: 200px;
  height: 200px;
}
.add {
  width: 200px;
  height: 200px;
}
.imgbox {
  width: 200px;
}
.plusbtn {
  border: 3px var(--teal) solid;
}
textarea {
  resize: none;
}
.spanshow {
  margin-top: -30px;
}
</style>

//Fix select
