<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <form
      @submit.prevent="save"
      class="popup-inner d-flex justify-content-center flex-column gap-2 rounded-4"
    >
      <h4 class="text-center">افزودن کد تخفیف</h4>
      <input
        type="text"
        name="code"
        ref="discountcode"
        class="form-control border-secondary"
        placeholder="کد تخفیف"
      />
      <input
        type="text"
        name="value"
        ref="value"
        class="form-control border-secondary"
        placeholder="مقدار تخفیف"
      />
      <input
        type="number"
        min="0"
        name="count"
        ref="count"
        class="form-control border-secondary"
        placeholder="محدودیت استفاده"
      />
      <input
        type="number"
        min="0"
        name="minprice"
        ref="minpriceinp"
        class="form-control border-secondary"
        placeholder="حداقل خرید"
      />
      <input
        type="number"
        min="0"
        name="maxdiscount"
        ref="maxdiscountinp"
        class="form-control border-secondary"
        placeholder="حداکثر تخفیف"
      />
      <div class="mt-1">
        <div class="form-check-reverse mt-1 me-2">
          <input
            type="checkbox"
            name="countlimit"
            id="countlimit"
            ref="countlimit"
            class="form-check-input border border-1 border-black"
            @change="checkboxhandeler('countlimit')"
          />
          <label for="countlimit" class="form-check-label"
            >تعداد استفاده از این کد بدون محدودیت باشد</label
          >
        </div>
        <div class="form-check-reverse mt-1 me-2">
          <input
            type="checkbox"
            name=""
            id="minprice"
            ref="minprice"
            class="form-check-input border border-1 border-black"
            @change="checkboxhandeler('minprice')"
          />
          <label for="minprice" class="form-check-label"
            >حداقل مقدار خرید بدون محدودیت باشد</label
          >
        </div>
        <div class="form-check-reverse mt-1 me-2">
          <input
            type="checkbox"
            name=""
            id="maxdiscount"
            ref="maxdiscount"
            class="form-check-input border border-1 border-black"
            @change="checkboxhandeler('maxdiscount')"
          />
          <label for="maxdiscount" class="form-check-label"
            >حداکثر تخفیف بدون محدودیت یاشد</label
          >
        </div>
      </div>

      <input
        type="submit"
        class="btn btn-primary mt-3"
        @click.prevent="save"
        value="ثبت "
      />
      <input
        type="reset"
        class="btn btn-secondary"
        @click.prevent="cancel"
        value="انصراف"
      />
    </form>
  </div>
</template>

<script>
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
  data() {
    return {
      flag: false,
    };
  },

  mounted() {
    document.addEventListener("keydown", this.esc);
  },

  methods: {
    cancel: function () {
      this.checkboxhandeler("");
      this.$refs.discountcode.value = "";
      this.$refs.value.value = "";
      this.close();
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
        this.$refs.discountcode.value &&
        this.$refs.value.value &&
        (this.$refs.count.value || this.$refs.countlimit.checked) &&
        (this.$refs.maxdiscountinp.value || this.$refs.maxdiscount.checked) &&
        (this.$refs.minpriceinp.value || this.$refs.minprice.checked)
      ) {
        axios
          .post(`${apiaddress}adddiscount`, {
            discountcode: this.$refs.discountcode.value,
            value: this.$refs.value.value,
            countlimit: this.$refs.count.value || "unlimit",
            maxdiscount: this.$refs.maxdiscountinp.value || "unlimit",
            minprice: this.$refs.minpriceinp.value || "unlimit",
          })
          .then((res) => {
            if (res.data.status) {
              this.$emit("success", "success");
              this.close();
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
          title: `لطفا تمام فیلد ها را پر کنید`,
        });
      }
    },
    checkboxhandeler: function (e) {
      if (e === "countlimit") {
        if (this.$refs.countlimit.checked) {
          this.$refs.count.disabled = true;
          this.$refs.count.placeholder = "بدون محدودیت استفاده";
          this.$refs.count.value = null;
        } else {
          this.$refs.count.disabled = false;
          this.$refs.count.placeholder = " محدودیت استفاده";
        }
      } else if (e === "maxdiscount") {
        if (this.$refs.maxdiscount.checked) {
          this.$refs.maxdiscountinp.disabled = true;
          this.$refs.maxdiscountinp.placeholder = " بدون محدودیت تخفیف";
          this.$refs.maxdiscountinp.value = null;
        } else {
          this.$refs.maxdiscountinp.disabled = false;
          this.$refs.maxdiscountinp.placeholder = "حداکثر تخفیف";
        }
      } else if (e === "minprice") {
        if (this.$refs.minprice.checked) {
          this.$refs.minpriceinp.disabled = true;
          this.$refs.minpriceinp.placeholder = "بدون محدودیت خرید";
          this.$refs.minpriceinp.value = null;
        } else {
          this.$refs.minpriceinp.disabled = false;
          this.$refs.minpriceinp.placeholder = "حداقل خرید";
        }
      } else {
        this.$refs.maxdiscount.checked = false;
        this.$refs.maxdiscountinp.disabled = false;
        this.$refs.maxdiscountinp.placeholder = "حداکثر تخفیف";

        this.$refs.countlimit.checked = false;
        this.$refs.count.disabled = false;
        this.$refs.count.placeholder = "محدودیت استفاده";

        this.$refs.minprice.checked = false;
        this.$refs.minpriceinp.disabled = false;
        this.$refs.minpriceinp.placeholder = "حداقل خرید";
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
    max-height: 720px;
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
  width: 350px;
}
</style>
