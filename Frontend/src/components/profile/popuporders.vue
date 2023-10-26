<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div id="popup">
      <div class="popup-inner rounded-4">
        <Icon
        icon="ph:x-bold"
        color="red"
        width="20"
        height="20"
        class="pointer"
        @click="close"
      />
        <h4 class="text-center ">جزییات خرید</h4>
        <table class="table table-bordered mt-4 ">
          <thead>
            <tr>
                <th class="text-center">نام کتاب</th>
                <th class="text-center">قیمت</th>
                <th class="text-center">تعداد</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="x in data" :key="x">
                <th class="text-center"> {{ x.name }}</th>
                <th class="text-center">{{x.value}}</th>
                <th>{{ x.number }}</th>
            </tr>
          </tbody>
          <tfoot class="table-dark">
            <tr>
              <th class="text-center">مجموع</th>
              <th class="text-center" colspan="2">{{ some }} تومان</th>

            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { Icon } from '@iconify/vue';
  export default {
    name: "popuprequest",
  
    mounted() {
      
      document.addEventListener("keydown", this.esc);
      this.data.forEach(e => {
        this.some =this.some + e.value
        
      });
     
      
      
    },
    data(){
      return{
         some:null
      }
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
    },
    props: ["data"],
    components:{
        Icon
    }
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
        width: 450px;
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
  textarea{
      resize: none;
      width: 500px;
      height: 150px;
  }
  
  </style>
  