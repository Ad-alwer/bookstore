<template>
  <div id="parent" class="container mt-3">
    <h2 class="text-center">کتاب ها</h2>
    <hr />
    <div class="d-flex justify-content-end">
      <div class="card ">
        <div class="d-flex justify-content-center">
          <img
            src="../../../../Backend/File/79cbabff4091f36c6460b29c08eac5ec.png"
            alt=""
            class="img-fluid rounded-3 mt-2 card-img-top"
          />
        </div>
        <div class="card-body">
          <p class="text-center">اثرمرکب</p>
        </div>
        <div class="card-footer d-flex gap-5">
          <div class="card-texts">
            <span class="d-block discount text-center" v-if="spanshow"
              >500000</span
            >
            <span> 255000</span>
            <span class="toman pe-1">تومان </span>
          </div>
          <div :class="spanshow ? 'd-flex icons gap-3' : 'd-flex  gap-2'">
            <Icon
              icon="material-symbols:edit-outline"
              color="gray"
              width="23"
              height="23"
              class="pointer"
            />
            <Icon
              icon="mdi:bin-outline"
              color="#fc345c"
              width="23"
              height="23"
              class="pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "ShowBooks",
  components: {
    Icon,
  },
  data() {
    return {
      discountmodel: "",
      spanshow: false,
    };
  },

  methods: {},
};
</script>

<style scoped>
.card {
  width: 200px;
  height: 260px;
}
img {
  width: 150px;
  height: 150px;
}
.card-body {
  height: 30px;
}
.card-footer {
  border: none;
}
.icons {
  position: relative;
  top: 40%;
  left: 5%;
}

.discount {
  text-decoration: var(--red) line-through 2px;
  font-size: 12px;
}
.toman {
  font-size: 10px;
}
</style>
