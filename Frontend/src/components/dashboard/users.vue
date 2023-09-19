<template>
  <div id="parent" class="mt-3">
    <div class="d-flex justify-content-center gap-3 mb-4">
      <select
        name=""
        id=""
        class="form-select w-25 text-center"
        v-mode
        @change="selectoption($event.target.value)"
      >
        <option
          v-for="x in select"
          :key="x.name"
          :selected="x.select"
          :value="x.name"
        >
          {{ x.name }}
        </option>
      </select>

      <select name="" id="" class="form-select w-25">
        <option
          value=""
          :key="x"
          v-for="x in selected"
          :disabled="x.disable"
          :selected="x.selected"
          class="text-center"
        >
          {{ x.name }}
        </option>
      </select>
    </div>

    <div>
      <table class="table table-bordered mt-3">
        <thead>
          <tr>
            <th class="text-center">نام کاربری</th>
            <th class="text-center">ایمیل</th>
            <th class="text-center">ادمین</th>
            <th class="text-center">تعداد خرید</th>
            <th class="text-center">اطلاعات خرید</th>
          </tr>
        </thead>
        <tbody v-if="arr.length <= 0">
          <tr>
            <th colspan="5">
              <div class="d-flex justify-content-center">
                <img
                  src="../../assets/imgs/notfound.png"
                  class="img-fluid"
                  alt=""
                />
              </div>
            </th>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="x in arr" :key="x.name">
            <th class="text-center enfont">{{ x.username }}</th>
            <th class="text-center enfont">{{ x.email }}</th>
            <th class="text-center">//TODO toogle</th>
            <th class="text-center">{{ x.hmorders }}</th>
            <th class="text-center">
              <Icon
                icon="icon-park-outline:doc-detail"
                width="30px"
                height="30px"
              />
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

import axios from "axios";
import { info } from "../../../config/default";
import funcs from "../login.vue";
let jwt = funcs.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];
export default {
  name: "users",
  beforeMount() {
    if (jwt) {
      console.log(jwt);
      axios.get(`${apiaddress}users/${jwt}`).then((res) => {
        this.arr = res.data;
      });
      this.selectoption("ادمین");
    }
  },
  components: {
    Icon,
  },
  data() {
    return {
      arr: [],
      sort: "",
      selected: "",
      select: [
        {
          name: "نام کاربری",
          select: false,
        },
        {
          name: "ادمین",
          select: true,
        },
        {
          name: "تعداد خرید ",
          select: false,
        },
      ],
      usernameselect: [
        {
          name: "Z تا A",
          icn: "bx:sort-a-z",
          disable: false,
          selected: false,
        },
        {
          name: "A تا Z",
          icn: "bx:sort-z-a",
          disable: false,
          selected: false,
        },
      ],
      adminselect: [
        {
          name: "---",

          disable: true,
          selected: true,
        },
      ],
      hmbuyselect: [
        {
          name: "افزایشی",
          icn: "fa-solid:sort-amount-up-alt",
          disable: false,
          selected: false,
        },
        {
          name: "کاهشی",
          icn: "fa-solid:sort-amount-down-alt",
          disable: false,
          selected: false,
        },
      ],
    };
  },
  methods: {
    selectoption: function (e) {
      if (e == "نام کاربری") {
        this.selected = this.usernameselect;
      } else if (e == "ادمین") {
        this.selected = this.adminselect;
      } else {
        this.selected = this.hmbuyselect;
      }
    },
  },
};
</script>

<style scoped>
thead th {
  cursor: pointer;
}
.form-control:focus {
  outline: none;
  box-shadow: none;
}
</style>
