<template>
  <div class="container mt-2">
    <h2 class="text-center fs-1 mt-2">درباره ما</h2>
    <p class="text-center px-4 fs-5 mt-5 text-secondary">
      شرکت ما از سال 1385 در زمیه فروش کتا کار خودش را شروع کرد لورم ایپسوم متن
      ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
      است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
      برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود
      ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
      آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت
      بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود
      در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
      حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
      اساسا مورد استفاده قرار گیرد.
    </p>
    <div class="mt-5">
      <p class="text-center fs-4">راه های ارتباطی</p>
      <div class="d-flex justify-content-center gap-5">
        <a href="" v-for="x in socialmedia" :key="x.name">
          <Icon :icon="x.icn" width="30" height="30" class="text-secondary" />
        </a>
      </div>
    </div>
    <Icon
      icon="material-symbols:home-outline"
      width="35"
      height="35"
      @click="gotohome"
      class="home"
    />
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  name: "about",
  data() {
    return {
      socialmedia: [
        {
          name: "اینستاگرام",
          icn: "mdi:instagram",
          link: "",
        },
        {
          name: "تلگرام",
          icn: "ic:baseline-telegram",
          link: "",
        },
        {
          name: "واتساپ",
          icn: "ic:baseline-whatsapp",
          link: "",
        },
      ],
    };
  },
  components: {
    Icon,
  },

  methods: {
    gotohome: function () {
      location.href = `/`;
    },
  },
};
</script>

<style scoped>
.home {
  position: absolute;
  bottom: 7%;
  right: 7%;
  cursor: pointer;
}
.text-secondary {
  color: #6c757d !important;
}
</style>
