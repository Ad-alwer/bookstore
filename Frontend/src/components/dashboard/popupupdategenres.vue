<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <div class="popup-inner rounded-4">
      <p class="fs-4 text-center">ویرایش دسته بندی ها</p>
      <div class="d-flex justify-content-center gap-3">
        <input type="text" class="form-control border-secondary" ref="inpadd" />
        <button class="px-3 pt-2 btn-teal btn text-nowrap" @click="addgenre">
          افزودن دسته بندی جدید
        </button>
      </div>

      <table class="table mt-3">
        <thead>
          <tr>
            <th class="w-50 text-center">نام دسته بندی</th>
        
            <th class="text-center">حذف</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(x,i) in arr">
            <th class="text-center">
              <input
                type="text"
                class="form-control border-0 text-center"
                :value="x"
                readonly
               
              />
            </th>
            
            <th class="text-center">
              <Icon
                icon="mdi:bin"
                color="#fc345c"
                width="25"
                height="25"
                class="pointer"
                @click="remove(i)"
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



let apiaddress = info.fetch["address"];
export default {
  name: "basket",
  beforeMount() {
    this.getdata();
  },
  mounted() {
    document.addEventListener("keydown", this.esc);
  },
  components: {
    Icon,
  },

  methods: {
    close: function () {
      this.$emit("closepopup", "closed");
    },
    esc(event) {
      if (event.key === "Escape") {
        this.close();
      }
    },
    save: function () {
      axios.post(`${apiaddress}changegenre`, {
        genre: this.arr,
      });
    },
    addgenre: function () {
      this.arr.push(this.$refs.inpadd.value);
      this.save();
      this.$refs.inpadd.value = ''
    },
    getdata: function () {
      axios.get(`${apiaddress}getbase`).then((data) => {
        this.arr = data.data.genre;
        
       
      });
    },
    remove:function(i){
      this.arr.splice(i, 1);
      this.save()
    }
   
  },
  data() {
    return {
      arr: [],
    };
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
.btn-teal {
  color: white;
  background-color: var(--teal);
}
.form-control:focus,
.form-check-input {
  outline: none;
  box-shadow: none;
}
</style>
