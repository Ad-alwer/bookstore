<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <form
      @submit.prevent="save"
      class="popup-inner d-flex justify-content-center flex-column gap-2 rounded-4"
    >
      
      <div class="d-flex justify-content-center">
        <div class="imgbox">
          <img
            src="../../assets/imgs/Cillian_Murphy-2014.jpg"
            class="img-fluid rounded-3"
            alt=""
          />
          <div class="mt-1 d-flex flex-column">
            <input id="img1" type="file" class="d-none" />
            <label class="mt-1 d-flex justify-content-center" for="img1"
              ><Icon
                icon="ph:x-bold"
                color="red"
                width="30"
                height="30"
                class="pointer border border-1 border-danger rounded-circle p-1"
            /></label>
          </div>
        </div>
        <div
          v-if="x"
          class="add border border-1 border-secondary rounded-3 d-flex justify-content-center align-items-center"
        >
          <Icon
            icon="typcn:plus"
            color="#49beb7"
            width="40"
            height="40"
            class="rounded-circle plusbtn"
          />
        </div>
      </div>
      <div class="d-flex flex-column gap-2">
        <input
          type="text"
          placeholder="نام کتاب"
          class="border-secondary form-control"
        />
        <input
          type="text"
          placeholder="نام نویسنده"
          class="border-secondary form-control"
        />
        <input
          type="number"
          placeholder="قیمت"
          min="0"
          class="border-secondary form-control"
        />

        <input
          type="number"
          min="0"
          placeholder="سال انتشار"
          class="border-secondary form-control"
        />
        <select
          name=""
          id=""
          class="form-control border-secondary text-secondary"
          ref="genre"
        >
          <option value="روانشناسی">روانشناسی</option>
        </select>
        <div class="d-flex gap-2">
          <input
            type="text"
            id="discount"
            placeholder="تخفیف"
            min="0"
            class="border-secondary form-control"
          />
          <label
            class="border border-secondary form-control text-secondary"
            for="discount "
            >قیمت پس از تخفیف</label
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
        <button class="btn btn-primary px-3 py-2">ثبت</button>
        <button class="btn btn-secondary px-3 py-2">انصراف</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

//   import axios from "axios";
//   import { info } from "../../../config/default";

//   import Swal from "sweetalert2";

//   let apiaddress = info.fetch["address"];

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
  name: "popupchange",
  data() {
    return {
      lenghtshower: "",
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
    //   cancel: function () {
    //     this.checkboxhandeler("");
    //     this.$refs.discountcode.value = "";
    //     this.$refs.value.value = "";
    //     this.close();
    //   },
    //   close: function () {
    //     this.$emit("closepopup", "closed");
    //   },
    //   esc(event) {
    //     if (event.key === "Escape") {
    //       this.close();
    //     }
    //   },
    //   save: function () {
    //     if (
    //       this.$refs.discountcode.value &&
    //       this.$refs.value.value &&
    //       (this.$refs.count.value || this.$refs.countlimit.checked) &&
    //       (this.$refs.maxdiscountinp.value || this.$refs.maxdiscount.checked) &&
    //       (this.$refs.minpriceinp.value || this.$refs.minprice.checked)
    //     ) {
    //       axios
    //         .post(`${apiaddress}adddiscount`, {
    //           discountcode: this.$refs.discountcode.value,
    //           value: this.$refs.value.value,
    //           countlimit: this.$refs.count.value || "unlimit",
    //           maxdiscount: this.$refs.maxdiscountinp.value || "unlimit",
    //           minprice: this.$refs.minpriceinp.value || "unlimit",
    //         })
    //         .then((res) => {
    //           if (res.data.status) {
    //             this.$emit("success", "success");
    //             this.close();
    //           } else {
    //             Toast.fire({
    //               icon: "error",
    //               title: `${res.data.msg}`,
    //             });
    //           }
    //         });
    //     } else {
    //       Toast.fire({
    //         icon: "error",
    //         title: `لطفا تمام فیلد ها را پر کنید`,
    //       });
    //     }
    //   },
    //   checkboxhandeler: function (e) {
    //     if (e === "countlimit") {
    //       if (this.$refs.countlimit.checked) {
    //         this.$refs.count.disabled = true;
    //         this.$refs.count.placeholder = "بدون محدودیت استفاده";
    //         this.$refs.count.value = null;
    //       } else {
    //         this.$refs.count.disabled = false;
    //         this.$refs.count.placeholder = " محدودیت استفاده";
    //       }
    //     } else if (e === "maxdiscount") {
    //       if (this.$refs.maxdiscount.checked) {
    //         this.$refs.maxdiscountinp.disabled = true;
    //         this.$refs.maxdiscountinp.placeholder = " بدون محدودیت تخفیف";
    //         this.$refs.maxdiscountinp.value = null;
    //       } else {
    //         this.$refs.maxdiscountinp.disabled = false;
    //         this.$refs.maxdiscountinp.placeholder = "حداکثر تخفیف";
    //       }
    //     } else if (e === "minprice") {
    //       if (this.$refs.minprice.checked) {
    //         this.$refs.minpriceinp.disabled = true;
    //         this.$refs.minpriceinp.placeholder = "بدون محدودیت خرید";
    //         this.$refs.minpriceinp.value = null;
    //       } else {
    //         this.$refs.minpriceinp.disabled = false;
    //         this.$refs.minpriceinp.placeholder = "حداقل خرید";
    //       }
    //     } else {
    //       this.$refs.maxdiscount.checked = false;
    //       this.$refs.maxdiscountinp.disabled = false;
    //       this.$refs.maxdiscountinp.placeholder = "حداکثر تخفیف";
    //       this.$refs.countlimit.checked = false;
    //       this.$refs.count.disabled = false;
    //       this.$refs.count.placeholder = "محدودیت استفاده";
    //       this.$refs.minprice.checked = false;
    //       this.$refs.minpriceinp.disabled = false;
    //       this.$refs.minpriceinp.placeholder = "حداقل خرید";
    //     }
    //   },
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
