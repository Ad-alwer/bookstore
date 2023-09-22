<template>
  <div id="parent" class="container mt-3">
    <P class="fs-1 text-center">افزودن کتاب</P>
    <div class="d-flex justify-content-center gap-5 mt-3">
      <div>
        <div class="border border-1 border-black divinp">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name=""
            class="d-none"
            id="inp1"
            ref="inp1"
            @change="addimg('inp1', 'img1')"
          />

          <div v-show="img1" class="border border-1 border-black divinp">
            <img src="" ref="img1" class="img-fluid w-100 h-100" alt="" />
          </div>

          <div
            v-if="!img1"
            class="h-100 d-flex align-items-center justify-content-center pointer"
          >
            <label for="inp1">
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
        <div v-if="img1" class="justify-content-center d-flex mt-2">
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
      <div>
        <div class="border border-1 border-black divinp">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name=""
            class="d-none"
            id="inp2"
            ref="inp2"
            @change="addimg('inp2', 'img2')"
          />

          <div v-show="img2" class="border border-1 border-black divinp">
            <img src="" ref="img2" class="img-fluid w-100 h-100" alt="" />
          </div>

          <div
            v-if="!img2"
            class="h-100 d-flex align-items-center justify-content-center pointer"
          >
            <label for="inp2">
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
        <div v-if="img2" class="justify-content-center d-flex mt-2">
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
      <div>
        <div class="border border-1 border-black divinp">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name=""
            class="d-none"
            id="inp3"
            ref="inp3"
            @change="addimg('inp3', 'img3')"
          />

          <div v-show="img3" class="border border-1 border-black divinp">
            <img src="" ref="img3" class="img-fluid w-100 h-100" alt="" />
          </div>

          <div
            v-if="!img3"
            class="h-100 d-flex align-items-center justify-content-center pointer"
          >
            <label for="inp3">
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
        <div v-if="img3" class="justify-content-center d-flex mt-2">
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
      <div>
        <div class="border border-1 border-black divinp">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name=""
            class="d-none"
            id="inp4"
            ref="inp4"
            @change="addimg('inp4', 'img4')"
          />

          <div v-show="img4" class="border border-1 border-black divinp">
            <img src="" ref="img4" class="img-fluid w-100 h-100" alt="" />
          </div>

          <div
            v-if="!img4"
            class="h-100 d-flex align-items-center justify-content-center pointer"
          >
            <label for="inp4">
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
        <div v-if="img4" class="justify-content-center d-flex mt-2">
          <Icon
            icon="ph:x-bold"
            color="red"
            width="30"
            height="30"
            class="pointer border border-1 border-danger rounded-circle p-1"
            @click="imgremove('img4')"
          />
        </div>
      </div>
    </div>
    <div class="mt-3">
      <input
        type="text"
        id="bookname"
        placeholder="نام کتاب"
        ref="name"
        class="form-control border-secondary"
      />

      <input
        type="text"
        placeholder="نام نویسنده"
        class="form-control my-2 border-secondary"
        ref="author"
      />

      <input
        type="number"
        placeholder=" سال تولید"
        class="form-control my-2 border-secondary"
        ref="year"
      />
      <select
        name=""
        id=""
        class="form-control my-2 border-secondary text-secondary"
        ref="genre"
      >
        <option value="روانشناسی">روانشناسی</option>
      </select>

      <input
        type="number"
        placeholder="قیمت"
        class="form-control my-2 border-secondary"
        ref="price"
      />

      <div>
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
    </div>
    <div class="d-flex justify-content-center mb-3 gap-5">
      <button class="btn btn-primary py-2 px-3" @click="save">ذخیره</button>
      <button class="btn btn-secondary py-2 px-3" @click="clear">انصراف</button>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import axios from "axios";
import { info } from "../../../config/default";
// import funcs from "./login.vue";

import Swal from "sweetalert2";

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

// let jwt = funcs.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];
export default {
  name: "AddBooks",
  data() {
    return {
      lenghtshower: "",
      imgarr: [
        { img: "img1", inp: `inp1` },
        { img: "img2", inp: `inp2` },
        { img: "img3", inp: `inp3` },
        { img: "img4", inp: `inp4` },
      ],
      img1: null,
      img2: null,
      img3: null,
      img4: null,
    };
  },
  components: {
    Icon,
  },
  methods: {
    addimg: function (inp, img) {
      if (img === "img1") {
        this.img1 = true;
        this.$refs[img].src = URL.createObjectURL(this.$refs[inp].files[0]);
      } else if (img === "img2") {
        this.img2 = true;
        this.$refs[img].src = URL.createObjectURL(this.$refs[inp].files[0]);
      } else if (img === "img3") {
        this.img3 = true;
        this.$refs[img].src = URL.createObjectURL(this.$refs[inp].files[0]);
      } else {
        this.img4 = true;
        this.$refs[img].src = URL.createObjectURL(this.$refs[inp].files[0]);
      }
    },
    imgremove: function (img) {
      if (img === "img1") {
        this.img1 = false;
        // this.$refs[img].src =  URL.createObjectURL();
        this.$refs[img].src = null;
        this.$refs.inp1.value = this.$refs.inp1.defaultValue;
      } else if (img === "img2") {
        this.img2 = false;
        this.$refs[img].src = null;
        this.$refs.inp2.value = this.$refs.inp2.defaultValue;
      } else if (img === "img3") {
        this.img3 = false;
        this.$refs[img].src = null;
        this.$refs.inp3.value = this.$refs.inp3.defaultValue;
      } else {
        this.img4 = false;
        this.$refs[img].src = null;
        this.$refs.inp4.value = this.$refs.inp4.defaultValue;
      }
    },
    save: function () {
      if (this.img1 || this.img2 || this.img3 || this.img4) {
        if (
          this.$refs.name.value &&
          this.$refs.author.value &&
          this.$refs.year.value &&
          this.$refs.textarea.value &&
          this.$refs.price.value
        ) {
          const formData = new FormData();
          let imginp = ["inp1", "inp2", "inp3", "inp4"];
          let counter = 1;

          imginp.forEach((e) => {
            if (this.$refs[e].files.length > 0) {
              formData.append(`file${counter}`, this.$refs[e].files[0]);
              counter++;
            }
          });
          formData.append("name", this.$refs.name.value);
          formData.append("author", this.$refs.author.value);
          formData.append("year", this.$refs.year.value);
          formData.append("discription", this.$refs.textarea.value);
          formData.append("price", this.$refs.price.value);

          formData.append("genre", this.$refs.genre.value);

          axios
            .post(`${apiaddress}addbook`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.data.status) {
                Toast.fire({
                  icon: "success",
                  title: "عملیات با موفقیت انجام شد",
                });
              } else {
                Toast.fire({
                  icon: "error",
                  title: `${res.data.msg}`,
                });
              }
            });
        } else {
          Toast.fire({
            icon: "error",
            title: `لطفا تمام فیلد ها را پرکنید`,
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: `لطفا عکس انتخاب کنید`,
        });
      }
    },
    clear: function () {
      this.$refs.textarea.value = null;
      this.lenghtshower=''

      this.$refs.name.value = "";
      this.$refs.author.value = "";
      this.$refs.year.value = "";

      this.$refs.price.value = "";

      this.imgremove("img1");
      this.imgremove("img2");
      this.imgremove("img3");
      this.imgremove("img4");
    },
  },
};
</script>

<style scoped>
.divinp {
  width: 200px;
  height: 200px;
  background-color: rgb(255, 255, 255);
}
.plusbtn {
  /* border-color: var(--teal); */
  border: 3px var(--teal) solid;
}
textarea {
  resize: none;
}
.spanshow {
  margin-top: -25px;
}
#parent {
  overflow-y: scroll;
}

::placeholder, input {
  font-family: "B Koodak";
}
</style>
//TODO options
