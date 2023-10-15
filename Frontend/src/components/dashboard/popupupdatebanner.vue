<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <div class="popup-inner rounded-4">
      <p class="fs-4 text-center">ویرایش بنرهای سایت</p>
      <div class="mt-4">
        <input
          type="file"
          @change="changefile"
          name=""
          class="form-control border-secondary d-none"
          id="fileinp1"
          ref="file1inp"
        />
        <label ref="labelinp1" for="fileinp1" class="px-3 py-2 btn btn-primary"
          >انتخاب بنر</label
        >
        <input
          type="text"
          name=""
          class="form-control border-secondary mt-1 text-center"
          placeholder="لینک"
          id=""
          ref="link1"
        />
      </div>
      <div class="mt-4">
        <input
          type="file"
          @change="changefile"
          name=""
          class="form-control border-secondary d-none"
          id="fileinp2"
          ref="file2inp"
        />
        <label ref="labelinp2" for="fileinp2" class="px-3 py-2 btn btn-primary"
          >انتخاب بنر</label
        >
        <input
          type="text"
          name=""
          class="form-control border-secondary mt-1 text-center"
          placeholder="لینک"
          id=""
          ref="link2"
        />
      </div>
      <div class="mt-4">
        <input
          type="file"
          @change="changefile"
          name=""
          class="form-control border-secondary d-none"
          id=""
          ref="file3inp"
        />
        <label ref="labelinp3" for="fileinp3" class="px-3 py-2 btn btn-primary"
          >انتخاب بنر</label
        >
        <input
          type="text"
          name=""
          class="form-control border-secondary mt-1 text-center"
          placeholder="لینک"
          id=""
          ref="link3"
        />
      </div>
      <div class="mt-3 d-flex justify-content-center gap-2">
        <button class="btn btn-secondary px-3 py-2" @click="close">انصراف</button>
        <button class="btn px-3 py-2 btn-teal" @click="save">ذخیره</button>
        <button class="btn px-3 py-2 bg-danger text-white" @click="reset">
          بازگردانی
        </button>
      </div>
    </div>
  </div>
</template>

<script>
//   import { Icon } from "@iconify/vue";
import axios from "axios";
import { info } from "../../../config/default";

import Swal from "sweetalert2";

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

let apiaddress = info.fetch["address"];
export default {
  name: "basket",
  beforeMount() {
    axios.get(`${apiaddress}getbase`).then((data) => {
      this.arr = data.data;
      console.log(this.arr.banner);

      if (this.arr.banner[0]) {
        this.$refs.labelinp1.innerText = this.arr.banner[0].name;
        this.arr.banner[0].link != "null"
          ? (this.$refs.link1.value = this.arr.banner[0].link)
          : "";
      } else {
        this.$refs.labelinp3.innerText = "انتخاب بنر";
      }

      if (this.arr.banner[1]) {
        this.$refs.labelinp2.innerText = this.arr.banner[1].name;
        this.arr.banner[1].link != "null"
          ? (this.$refs.link2.value = this.arr.banner[1].link)
          : "";
      } else {
        this.$refs.labelinp3.innerText = "انتخاب بنر";
      }

      if (this.arr.banner[2]) {
        this.$refs.labelinp3.innerText = this.arr.banner[2].name;

        this.arr.banner[2].link != "null"
          ? (this.$refs.link3.value = this.arr.banner[2].link)
          : "";
      } else {
        this.$refs.labelinp3.innerText = "انتخاب بنر";
      }
    });
  },
  mounted() {
    document.addEventListener("keydown", this.esc);
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
      if (
        this.$refs.file1inp.files[0] ||
        this.$refs.file2inp.files[0] ||
        this.$refs.file3inp.files[0]
      ) {
        const formData = new FormData();
        formData.append("reset", this.resetflag);
        formData.append(
          "link1",
          this.$refs.link1.value ? this.$refs.link1.value : null
        );
        formData.append(
          "link2",
          this.$refs.link2.value ? this.$refs.link2.value : null
        );
        formData.append(
          "link3",
          this.$refs.link3.value ? this.$refs.link3.value : null
        );
        if (this.$refs.file1inp.files[0]) {
          formData.append("file1", this.$refs.file1inp.files[0]);
        } else {
          formData.delete("link1");
          formData.append("link1", null);
        }

        if (this.$refs.file2inp.files[0]) {
          formData.append("file2", this.$refs.file2inp.files[0]);
        } else {
          formData.delete("link2");
          formData.append("link2", null);
        }

        if (this.$refs.file3inp.files[0]) {
          formData.append("file3", this.$refs.file3inp.files[0]);
        } else {
          formData.delete("link3");
          formData.append("link3", null);
        }

        axios.post(`${apiaddress}changebanner`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then(data => {
            if(data.data.status){
                this.close()
                this.success()
            }
        })
      } else {
        Toast.fire({
          icon: "error",
          title: `شما باید حداقل یک بنر انتخاب کنید`,
        });
      }
    },
    reset: function () {
      this.resetflag = true;
      this.$refs.file1inp.value = "";
      this.$refs.file2inp.value = "";
      this.$refs.file3inp.value = "";
      this.$refs.link1.value = null;
      this.$refs.link2.value = null;
      this.$refs.link3.value = null;
      this.$refs.labelinp1.innerText = "انتخاب بنر";
      this.$refs.labelinp2.innerText = "انتخاب بنر";
      this.$refs.labelinp3.innerText = "انتخاب بنر";
    },
    changefile: function (e) {
      e.target.labels[0].textContent = e.target.files[0].name;
    },
    success:function(){
        this.$emit("success", "successful");
    }
  },
  data() {
    return {
      arr: [],
      resetflag: false,
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
input,
label {
  width: 400px;
}
</style>
