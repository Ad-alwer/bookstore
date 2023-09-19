<template>
  <div :class="fullmenu ? 'my-4 longparent' : 'my-4 shortparent'">
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
        <li class="d-flex justify-content-start pe-3">
          <div class="d-flex gap-5 py-4">
            <Icon icon="ph:users-bold" width="30" height="30" />
            <span>کاربران</span>
          </div>
        </li>
        <li class="d-flex justify-content-start pe-3">
          <div class="d-flex gap-5 py-4">
            <Icon
              icon="fluent-mdl2:reservation-orders"
              width="30"
              height="30"
            />
            <span>سفارش ها</span>
          </div>
        </li>
        <li class="d-flex justify-content-start pe-3">
          <div class="d-flex gap-5 py-4">
            <Icon icon="material-symbols:add" width="30" height="30" />
            <span>افزودن کتاب</span>
          </div>
        </li>
        <li class="d-flex justify-content-start pe-3">
          <div class="d-flex gap-5 py-4">
            <Icon icon="ph:books-duotone" width="30" height="30" />
            <span>کتاب ها</span>
          </div>
        </li>
        <li class="d-flex justify-content-start pe-3">
          <div class="d-flex gap-5 py-4">
            <Icon icon="carbon:request-quote" width="30" height="30" />
            <span>درخواست کتاب</span>
          </div>
        </li>
        <li class="d-flex justify-content-start pe-3">
          <div class="d-flex gap-5 py-4">
            <Icon icon="solar:chart-line-duotone" width="30" height="30" />
            <span>آمار</span>
          </div>
        </li>
        <li class="d-flex justify-content-start pe-3">
          <div class="d-flex gap-5 py-4">
            <Icon icon="iconamoon:discount" width="30" height="30" />
            <span>کد تخفیف</span>
          </div>
        </li>
        <li class="d-flex justify-content-start pe-3">
          <div class="d-flex gap-5 py-4">
            <Icon icon="uil:setting" width="30" height="30" />
            <span>تنظیمات</span>
          </div>
        </li>
        <li class="d-flex justify-content-start pe-3 home" @click="gotohome">
          <div class="d-flex gap-5 pb-4  mt-5">
            <Icon icon="iconamoon:discount" width="30" height="30" />
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
          @click="fullmenu =true"
        />
      </div>
      <ul class="d-flex flex-column">
        <li class="d-flex justify-content-center py-4 pe-3">
          <Icon icon="ph:users-bold" width="30" height="30" />
        </li>
        <li class="d-flex justify-content-center py-4 pe-3">
          <Icon icon="fluent-mdl2:reservation-orders" width="30" height="30" />
        </li>
        <li class="d-flex justify-content-center py-4 pe-3">
          <Icon icon="material-symbols:add" width="30" height="30" />
        </li>
        <li class="d-flex justify-content-center py-4 pe-3">
          <Icon icon="ph:books-duotone" width="30" height="30" />
        </li>
        <li class="d-flex justify-content-center py-4 pe-3">
          <Icon icon="carbon:request-quote" width="30" height="30" />
        </li>
        <li class="d-flex justify-content-center py-4 pe-3">
          <Icon icon="solar:chart-line-duotone" width="30" height="30" />
        </li>
        <li class="d-flex justify-content-center py-4 pe-3">
          <Icon icon="iconamoon:discount" width="30" height="30" />
        </li>
        <li class="d-flex justify-content-center py-4 pe-3">
          <Icon icon="uil:setting" width="30" height="30" />
        </li>
        
        <li class="d-flex justify-content-center   mt-5 pe-3 ">
          <Icon icon="material-symbols:home-outline" width="30" height="30" @click="gotohome" />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  name: "Dashboardmenu",
  data() {
    return {
      fullmenu: true,
    };
  },
  components: {
    Icon,
  },
  methods:{
    gotohome:function (){
      location.href='/'
    }
  }
  // Your component logic here
};
</script>

<style scoped>
.longparent {
  width: 20%;
  height: 100vh;
  border-left: 1px solid black;

  overflow-x: hidden;
}
.shortparent {
  width: 10%;
  height: 100vh;
  border-left: 1px solid black;

  overflow-x: hidden;
}
/* nav{
  height: 85%;
} */

li {
  list-style: none;
  cursor: pointer;
  border-bottom: rgba(0, 0, 0, 0.151) solid 1px;
}
li:last-child{
  border: 0;
  color: var(--red);
}
.changer {
  cursor: pointer;
}
.active_li {
  border-bottom-color: var(--teal);
}
* {
  overflow: hidden;
}
.div-icon {
  flex: 1;
}

span {
  padding-top: 5px;
}

</style>
//TODO click
