<template>
  <div id="parent" class="mt-3 container-fluid">
    <div class="d-flex justify-content-center gap-3 mb-4">
      <select
        ref="selectref"
        name=""
        id=""
        class="form-select w-25 text-center"
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

      <select
        name=""
        id=""
        class="form-select w-25"
        @change="selectoption(this.$refs.selectref.value)"
        ref="selecttyperef"
      >
        <option
          :value="x.name"
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
            <th class="text-center">
              <input
                type="checkbox"
                class="offscreen"
                :name="x.username"
                id=""
                :checked="x.isadmin"
                :disabled="!thisuser.ismaster"
              />
              <label
                class="switch"
                :for="x.username"
                @click="changeadmin(x._id)"
              ></label>
            </th>
            <th class="text-center">{{ x.hmorders }}</th>
            <th class="text-center">
              <Icon
                icon="icon-park-outline:doc-detail"
                width="30px"
                height="30px"
                class="pointer"
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
      axios
        .get(`${apiaddress}find/${jwt}`)
        .then((res) => (this.thisuser = res.data.data));

      this.getusers();
    }
  },
  components: {
    Icon,
  },
  data() {
    return {
      arr: [],
      thisuser: [],
      // sort: "",
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
          name: "A تا Z",
          icn: "bx:sort-z-a",
          disable: false,
          selected: true,
        },
        {
          name: "Z تا A",
          icn: "bx:sort-a-z",
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
          selected: true,
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
        setTimeout(() => {
          if (this.$refs.selecttyperef.value === "A تا Z") {
            this.arr.sort((a, b) => {
              var nameA = a.username.toUpperCase();
              var nameB = b.username.toUpperCase();
              if (nameA < nameB) {
                return -1;
              } else if (nameA > nameB) {
                return 1;
              } else {
                return 0;
              }
            });
          } else if (this.$refs.selecttyperef.value === "Z تا A") {
            this.arr
              .sort((a, b) => {
                var nameA = a.username.toUpperCase();
                var nameB = b.username.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                } else if (nameA > nameB) {
                  return 1;
                } else {
                  return 0;
                }
              })
              .reverse();
          }
        });
      } else if (e == "ادمین") {
        this.selected = this.adminselect;
        this.arr.sort((a, b) => {
          if (a.isadmin && !b.isadmin) {
            return -1;
          } else if (!a.isadmin && b.isadmin) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        this.selected = this.hmbuyselect;
        setTimeout(() => {
          if (this.$refs.selecttyperef.value === "افزایشی") {
            this.arr.sort(function (a, b) {
              return b.hmorders - a.hmorders;
            });
          } else if (this.$refs.selecttyperef.value === "کاهشی") {
            this.arr
              .sort(function (a, b) {
                return b.hmorders - a.hmorders;
              })
              .reverse();
          }
        });

        // this.arr.sort(function (a, b) {
        //   return b.hmorders - a.hmorders;
        // });
      }
    },
    // selecttypeoption: function (e) {

    // },
    getusers: function () {
      axios.get(`${apiaddress}users/${jwt}`).then((res) => {
        this.arr = res.data;
        // console.log(this.$refs.selectref.value);
        this.selectoption(this.$refs.selectref.value);
      });
    },
    changeadmin: function (id) {
      if (this.thisuser.ismaster) {
        axios.get(`${apiaddress}users/admin/${id}`).then((res) => {
          if (res.data.status) {
            this.getusers();
          }
        });
      }
    },
  },
};
</script>
//TODO buy info
<style scoped>
thead th {
  cursor: pointer;
}
select:focus {
  outline: none;
  box-shadow: none;
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
