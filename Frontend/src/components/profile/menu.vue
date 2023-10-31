<template class="overflow-hidden">
  <div id="parent" class="pt-5">
    <nav class="d-flex flex-column gap-5">
      <ul class="d-flex flex-column">
        <li
          class="'d-flex justify-content-center py-4 pe-4'"
          
        >
          <Icon icon="fluent-mdl2:reservation-orders" width="30" height="30" />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  data() {
    return {
      show: "",
    };
  },

  components: {
    Icon,
  },

  methods: {
    // Your other Vue methods here
  },
};
</script>

<style scoped>
#parent {
  width: 5%;
  height: 100vh;
  border-left: 2px solid rgba(144, 169, 212, 0.678);
  overflow-x: hidden;
  overflow-y: hidden;
}
ul {
  height: 100%;
  background-color: aqua;
  align-items: center;
  gap: 20%;
}
</style>
