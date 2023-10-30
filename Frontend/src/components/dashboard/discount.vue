<template>
  <div id="parent" class="container-fluid mt-4">
    <div :class="popupshow ? 'blur table-responsive ' : ' table-responsive '">
      <Table class="table table-bordered mt-3">
        <thead>
          <tr>
            <th class="text-center">کد تخفیف</th>
            <th class="text-center">مقدار تخفیف</th>
            <th class="text-center">محدودیت</th>
            <th class="text-center">حداقل خرید</th>
            <th class="text-center">حداکثر خرید</th>
            <th class="text-center">وضعیت</th>
            <th class="text-center">حذف</th>
          </tr>
          <tr>
            <th colspan="7" class="text-center">
              <Icon
                icon="icon-park-outline:add"
                color="teal"
                width="35"
                height="35"
                class="pointer"
                @click="popupshow = true"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="x in arr" :key="x.code">
            <th class="text-center">{{ x.code }}</th>
            <th class="text-center">{{ x.value }}</th>
            <th class="text-center">{{ x.count }}</th>
            <th class="text-center">{{ x.minprice }}</th>
            <th class="text-center">{{ x.maxdiscount }}</th>
            <th class="text-center">
              <input
                type="checkbox"
                class="offscreen"
                :name="x.code"
                :checked="x.active"
              />
              <label
                class="switch"
                :for="x.code"
                @click="changeactive(x._id)"
              ></label>
            </th>

            <th class="text-center">
              <Icon
                icon="solar:trash-bin-2-outline"
                class="pointer"
                color="#fc345c"
                width="30"
                height="30"
                @click="remove(x._id, x.code)"
              />
            </th>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </Table>
    </div>
    <popup
      v-if="popupshow"
      @closepopup="popupshow = false"
      @success="success"
    />
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import popup from "./discountpopup.vue";

import { info } from "../../../config/default";
import Swal from "sweetalert2";
import axios from "axios";

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
  name: "Discount",
  beforeMount() {
    this.getdiscounts();
  },
  data() {
    return {
      popupshow: false,
      arr: [],
    };
  },
  components: {
    Icon,
    popup,
  },
  methods: {
    success: function () {
      Toast.fire({
        icon: "success",
        title: "عملیات با موفقیت انجام شد",
      });
      this.getdiscounts();
    },
    getdiscounts: function () {
      axios.get(`${apiaddress}getdiscount`).then((data) => {
        this.arr = data.data.data;
      });
    },
    changeactive: function (id) {
      axios.get(`${apiaddress}getdiscount/active/${id}`).then((data) => {
        if (data.data.status) {
          this.getdiscounts();
        }
      });
    },
    remove: function (id, name) {
      Swal.fire({
        title: "ایا از پاک کردن  مطمئن هستید؟",
        text: `شما در حال پاک کردن ${name} هستید`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: " بله پاک شود",
        cancelButtonText: "انصراف",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.get(`${apiaddress}getdiscount/delet/${id}`).then((data) => {
            if (data.data.status) {
              Toast.fire({
                icon: "success",
                title: "با موفقیت پاک شد",
              });
              this.getdiscounts();
            } else {
              Toast.fire({
                icon: "error",
                title: "لطفا دوباره تلاش کنید",
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.blur {
  filter: blur(4px);
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
</style>

/Fix blur effect
