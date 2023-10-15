<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <div class="popup-inner rounded-4">
      <h3 class="text-center ">{{ bookname }}</h3>
      <textarea
        name=""
        id=""
        cols="25"
        rows="5"
        class="form-control border-secondary text-secondary text-dark"
        placeholder="توضیحات"
        v-model="desc"
        
      >
      
    </textarea>
   <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-secondary px-3 py-2" @click="close">بستن</button>
   </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "popuprequest",

  mounted() {
    document.addEventListener("keydown", this.esc);
    this.desc =this.description
    
    
  },
  data(){
    return{
        desc:''
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
  props: ["bookname", "description"],
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
textarea{
    resize: none;
    width: 500px;
    height: 150px;
}

</style>
