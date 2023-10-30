<template>
  <div :class="fullmenu ? 'pt-4 longparent ' : 'pt-4 shortparent '">
    <nav v-if="fullmenu" class="d-flex flex-column">
      <div class="div-icon d-flex justify-content-center mb-3">
        <Icon
          icon="mingcute:left-fill"
          class="changer"
          width="30"
          height="30"
          :horizontalFlip="true"
          @click="fullmenu = false"
        />
      </div>
      <ul class="d-flex flex-column">
        <li
          :class="
            data == 'users'
              ? 'd-flex active-li justify-content-start pe-3'
              : 'd-flex justify-content-start pe-3'
          "
          @click="changedata('users')"
        >
          <div class="d-flex gap-5 py-4">
            <Icon icon="ph:users-bold" width="30" height="30" />
            <span>کاربران</span>
          </div>
        </li>
        <li
          :class="
            data == 'orders'
              ? 'd-flex active-li justify-content-start pe-3'
              : 'd-flex justify-content-start pe-3'
          "
          @click="changedata('orders')"
        >
          <div class="d-flex gap-5 py-4">
            <Icon
              icon="fluent-mdl2:reservation-orders"
              width="30"
              height="30"
            />
            <span>سفارش ها</span>
          </div>
        </li>
        <li
          :class="
            data == 'addbooks'
              ? 'd-flex active-li justify-content-start pe-3'
              : 'd-flex justify-content-start pe-3'
          "
          @click="changedata('addbook')"
        >
          <div class="d-flex gap-5 py-4">
            <Icon icon="material-symbols:add" width="30" height="30" />
            <span>افزودن کتاب</span>
          </div>
        </li>
        <li
          :class="
            data == 'showbook'
              ? 'd-flex active-li justify-content-start pe-3'
              : 'd-flex justify-content-start pe-3'
          "
          @click="changedata('showbooks')"
        >
          <div class="d-flex gap-5 py-4">
            <Icon icon="ph:books-duotone" width="30" height="30" />
            <span>کتاب ها</span>
          </div>
        </li>
        <li
          :class="
            data == 'request'
              ? 'd-flex active-li justify-content-start pe-3'
              : 'd-flex justify-content-start pe-3'
          "
          @click="changedata('request')"
        >
          <div class="d-flex gap-5 py-4">
            <Icon icon="carbon:request-quote" width="30" height="30" />
            <span>درخواست کتاب</span>
          </div>
        </li>
        <li
          :class="
            data == 'analyze'
              ? 'd-flex active-li justify-content-start pe-3'
              : 'd-flex justify-content-start pe-3'
          "
          @click="changedata('analyze')"
        >
          <div class="d-flex gap-5 py-4">
            <Icon icon="solar:chart-line-duotone" width="30" height="30" />
            <span>آمار</span>
          </div>
        </li>
        <li
          :class="
            data == 'discount'
              ? 'd-flex active-li justify-content-start pe-3'
              : 'd-flex justify-content-start pe-3'
          "
          @click="changedata('discount')"
        >
          <div class="d-flex gap-5 py-4">
            <Icon icon="iconamoon:discount" width="30" height="30" />
            <span>کد تخفیف</span>
          </div>
        </li>
        <li
          :class="
            data == 'base'
              ? 'd-flex active-li justify-content-start pe-3'
              : 'd-flex justify-content-start pe-3'
          "
          @click="changedata('base')"
        >
          <div class="d-flex gap-5 py-4">
            <Icon icon="uil:setting" width="30" height="30" />
            <span>تنظیمات</span>
          </div>
        </li>
        <li class="d-flex justify-content-start pe-3 home" @click="gotohome">
          <div class="d-flex gap-5 pb-4 mt-5">
            <Icon icon="material-symbols:home-outline" width="30" height="30" />
            <span>صفحه اصلی</span>
          </div>
        </li>
      </ul>
    </nav>
    <nav v-else class="d-flex flex-column">
      <div class="div-icon d-flex justify-content-center mb-3 pe-3">
        <Icon
          icon="mingcute:left-fill"
          class="changer"
          width="30"
          height="30"
          @click="fullmenu = true"
        />
      </div>
      <ul class="d-flex flex-column">
        <li
          :class="
            data == 'users'
              ? 'd-flex justify-content-center py-4 pe-3 active-li'
              : 'd-flex justify-content-center py-4 pe-3'
          "
          @click="changedata('users')"
        >
          <Icon icon="ph:users-bold" width="30" height="30" />
        </li>
        <li
          :class="
            data == 'orders'
              ? 'd-flex justify-content-center py-4 pe-3 active-li'
              : 'd-flex justify-content-center py-4 pe-3'
          "
          @click="changedata('orders')"
        >
          <Icon icon="fluent-mdl2:reservation-orders" width="30" height="30" />
        </li>
        <li
          :class="
            data == 'addbook'
              ? 'd-flex justify-content-center py-4 pe-3 active-li'
              : 'd-flex justify-content-center py-4 pe-3'
          "
          @click="changedata('addbook')"
        >
          <Icon icon="material-symbols:add" width="30" height="30" />
        </li>
        <li
          :class="
            data == 'showbooks'
              ? 'd-flex justify-content-center py-4 pe-3 active-li'
              : 'd-flex justify-content-center py-4 pe-3'
          "
          @click="changedata('showbooks')"
        >
          <Icon icon="ph:books-duotone" width="30" height="30" />
        </li>
        <li
          :class="
            data == 'request'
              ? 'd-flex justify-content-center py-4 pe-3 active-li'
              : 'd-flex justify-content-center py-4 pe-3'
          "
          @click="changedata('request')"
        >
          <Icon icon="carbon:request-quote" width="30" height="30" />
        </li>
        <li
          :class="
            data == 'analyze'
              ? 'd-flex justify-content-center py-4 pe-3 active-li'
              : 'd-flex justify-content-center py-4 pe-3'
          "
          @click="changedata('analyze')"
        >
          <Icon icon="solar:chart-line-duotone" width="30" height="30" />
        </li>
        <li
          :class="
            data == 'discount'
              ? 'd-flex justify-content-center py-4 pe-3 active-li'
              : 'd-flex justify-content-center py-4 pe-3'
          "
          @click="changedata('discount')"
        >
          <Icon icon="iconamoon:discount" width="30" height="30" />
        </li>
        <li
          :class="
            data == 'base'
              ? 'd-flex justify-content-center py-4 pe-3 active-li'
              : 'd-flex justify-content-center py-4 pe-3'
          "
          @click="changedata('base')"
        >
          <Icon icon="uil:setting" width="30" height="30" />
        </li>

        <li class="d-flex justify-content-center mt-5 pe-3">
          <Icon
            icon="material-symbols:home-outline"
            width="30"
            height="30"
            @click="gotohome"
          />
        </li>
      </ul>
    </nav>
  </div>
  <div class="responsive-menu">
    <ul class="mt-4">
      <li
        :class="data == 'users' ? 'py-4 active-li' : 'py-4'"
        @click="changedata('users')"
      >
        <Icon icon="ph:users-bold" width="25" height="25" />
      </li>
      <li
        :class="data == 'orders' ? 'py-4 active-li' : 'py-4'"
        @click="changedata('orders')"
      >
        <Icon icon="fluent-mdl2:reservation-orders" width="25" height="25" />
      </li>
      <li
        :class="data == 'addbook' ? 'py-4 active-li' : 'py-4'"
        @click="changedata('addbook')"
      >
        <Icon icon="material-symbols:add" width="25" height="25" />
      </li>

      <li
        :class="data == 'showbooks' ? 'py-4 active-li' : 'py-4'"
        @click="changedata('showbooks')"
      >
        <Icon icon="ph:books-duotone" width="25" height="25" />
      </li>
      <li
        :class="data == 'request' ? 'py-4 active-li' : 'py-4'"
        @click="changedata('request')"
      >
        <Icon icon="carbon:request-quote" width="25" height="25" />
      </li>
      <li
        :class="data == 'analyze' ? 'py-4 active-li' : 'py-4'"
        @click="changedata('analyze')"
      >
        <Icon icon="solar:chart-line-duotone" width="25" height="25" />
      </li>
      <li
        :class="data == 'discount' ? 'py-4 active-li' : 'py-4'"
        @click="changedata('discount')"
      >
        <Icon icon="iconamoon:discount" width="25" height="25" />
      </li>
      <li
        :class="data == 'base' ? 'py-4 active-li' : 'py-4'"
        @click="changedata('base')"
      >
        <Icon icon="uil:setting" width="25" height="25" />
      </li>
      <li class="py-4">
        <Icon
          icon="material-symbols:home-outline"
          width="30"
          height="30"
          @click="gotohome"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  name: "Dashboardmenu",
  data() {
    return {
      fullmenu: true,
      data: "users",
    };
  },
  components: {
    Icon,
  },
  methods: {
    gotohome: function () {
      location.href = "/";
    },
    changedata: function (e) {
      this.data = e;
      console.log(this.data);
      this.$emit("changedata", this.data);
    },
  },
  // Your component logic here
};
</script>

<style scoped>
.longparent {
  width: 20%;
  height: 100vh;
  border-left: 1px solid black;
  overflow-y: hidden;
  overflow-x: hidden;
}
.shortparent {
  width: 10%;
  height: 100vh;
  border-left: 1px solid black;
  overflow-y: hidden;
  overflow-x: hidden;
}

li {
  list-style: none;
  cursor: pointer;
  border-bottom: rgba(0, 0, 0, 0.151) solid 1px;
}

li:last-child {
  border: 0;
  color: var(--red);
}
.changer {
  cursor: pointer;
}
.active-li {
  border-bottom-color: var(--teal);
}
* {
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
}
.div-icon {
  flex: 1;
}

span {
  padding-top: 5px;
}
.responsive-menu {
  display: none;
}
@media screen and (max-width: 767px) {
  .longparent {
    display: none;
  }
  .shortparent {
    display: none;
  }
  .responsive-menu {
    display: flex !important;
    width: 15%;
    height: 550px;
    flex-direction: column;
    
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
//TODO click
