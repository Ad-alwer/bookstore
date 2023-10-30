<template>
  <div class="container mt-3">
    <div class="table-responsive">
      <table class="table">
      <thead>
        <tr>
          <th class="text-center">نام کتاب</th>
          <th class="text-center">توضیحات</th>
          <th class="text-center">مشاهده کامل</th>
          <th class="text-center">حذف</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in arr" :key="x">
          <th class="text-center trim-text">{{ x.bookname }}</th>
          <th class="text-center trim-text">{{ x.description }}</th>
          <th class="text-center">
            <Icon
              icon="icon-park-outline:doc-detail"
              width="30px"
              height="30px"
              class="pointer"
              @click="openpopup(x.bookname,x.description)"
            />
          </th>
          <th class="text-center">
            <Icon icon="mdi:bin" color="#fc345c" width="30" height="30" class="pointer" @click="remove(x._id)" />
          </th>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
  <popup
    :bookname="bookname"
    :description="description"
    @closepopup="popup = false"
    v-if="popup"
  />
</template>

<script>
import { Icon } from "@iconify/vue";
import popup from "./popuprequest.vue";

import axios from "axios";
import { info } from "../../../config/default";
let apiaddress = info.fetch["address"];
export default {
  name: "request",
  beforeMount() {
  this.getdata()
  },
  data() {
    return {
      arr: [],
      bookname: "",
      description: "",
      popup: false,
    };
  },
  components: {
    Icon,
    popup,
  },
  methods: {
    openpopup: function (bookname, description) {
      this.bookname = bookname;
      this.description = description;
      this.popup =true
    },
    remove:function(id){
        axios.get(`${apiaddress}deleterequest/${id}`).then(res=>{
            console.log(res.data);
            if(res.data.status){
                this.getdata()
            }
        })
    },
    getdata:function(){
        axios.get(`${apiaddress}getrequests`).then((res) => {
      this.arr = res.data.data;
    });
    }
  },
};
</script>

<style scoped>
.trim-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}
.blur {
  filter: blur(4px);
}
</style>
