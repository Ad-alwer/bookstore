<template>
  <div>
    <h2 class="mt-5 text-center">سوالات متداول</h2>
    <div>
      <div>
        <div
          class="d-flex gap-5 border-2 rounded-4 pointer form-control mx-auto parent mt-5 w-50"
          @click="open('question1')"
        >
          <Icon
            icon="mingcute:down-fill"
            :rotate="question1 ? 2 : 4"
            class="icn"
            width="25"
            height="25"
          />
          <Icon
            icon="mingcute:down-fill"
            :rotate="question2 ? 2 : 4"
            class="icn-responsive"
            width="20"
            height="20"
          />
          <div class="justify-content-center d-flex w-75 title-parent">
            <span class="fs-5"> ایا مرجوع کالا ممکن است؟</span>
          </div>
        </div>
        <textarea
          v-if="question1"
          class="border-2 rounded-4 form-control mx-auto mt-5 w-50 text-center"
          name=""
          disabled
          id=""
          cols="20"
          rows="5"
          placeholder="توضیحات"
          ref="desc"
        >
بله در صورت سالم بودن کالا تا هفت روز پس از خرید مرجوع کردن آن امکان پذیر است میتوانید کالا را مرجوع کنید.
</textarea
        >
      </div>
      <div>
        <div
          class="d-flex gap-5 border-2 rounded-4 pointer form-control mx-auto mt-5 w-50 parent"
          @click="open('question2')"
        >
          <Icon
            icon="mingcute:down-fill"
            :rotate="question2 ? 2 : 4"
            class="icn"
            width="25"
            height="25"
          />
          <Icon
            icon="mingcute:down-fill"
            :rotate="question2 ? 2 : 4"
            class="icn-responsive"
            width="20"
            height="20"
          />

          <div class="justify-content-center d-flex w-75">
            <span class="fs-5"
              >کتاب هایی که در سایت موجود نیستند را چگونه میتوانیم تهیه
              کنیم؟</span
            >
          </div>
          <div></div>
        </div>
        <textarea
          v-if="question2"
          class="border-2 rounded-4 form-control mx-auto mt-5 w-50 text-center"
          name=""
          disabled
          id=""
          cols="20"
          rows="5"
          placeholder="توضیحات"
          ref="desc"
        >
شما میتوانید از طریق سربرگ صفحه اصلی به صفحه درخواست کتاب بروید از ان جا درخواست خود را ثبت کنید.
</textarea
        >
      </div>
      <div>
        <div
          class="d-flex gap-5 border-2 rounded-4 pointer form-control mx-auto mt-5 w-50 parent"
          @click="open('question3')"
        >
          <Icon
            icon="mingcute:down-fill"
            :rotate="question3 ? 2 : 4"
            class="icn"
            width="25"
            height="25"
          />
          <Icon
            icon="mingcute:down-fill"
            :rotate="question2 ? 2 : 4"
            class="icn-responsive"
            width="20"
            height="20"
          />
          <div class="justify-content-center d-flex w-75">
            <span class="fs-5"> هزینه ازسال و زمان تحویل به چه صورت است؟ </span>
          </div>
          <div></div>
        </div>
        <textarea
          v-if="question3"
          class="border-2 rounded-4 form-control mx-auto mt-5 w-50 text-center"
          name=""
          disabled
          id=""
          cols="20"
          rows="5"
          placeholder="توضیحات"
          ref="desc"
        >
هزینه ارسال مبلغ 25000 تومان است که به هزینه کتاب اضاقه می شود و  محصول شما در مدت 3 الی 5 روز کاری به دست شما می رسد.
</textarea
        >
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
  data() {
    return {
      question1: true,
      question2: false,
      question3: false,
    };
  },
  components: {
    Icon,
  },
  methods: {
    open: function (e) {
      this[e] = !this[e];
    },
    gotohome: function () {
      location.href = `/`;
    },
  },
};
</script>
<style scoped>
::placeholder,
textarea,
input {
  font-family: "B Koodak";
  color: rgb(26, 25, 25);
  resize: none;
}
textarea {
  resize: none;
  height: 100px;
}
.home {
  position: absolute;
  bottom: 7%;
  right: 7%;
  cursor: pointer;
}
.icn-responsive {
  display: none;
}
@media screen and (max-width: 767px) {
  input {
    width: 180px !important;
  }
  span {
    font-size: 14px !important;
  }
  .parent {
    width: 450px !important;
    padding: 10px 8px !important;
  }
  .icn {
    display: none;
  }
  .icn-responsive {
    display: block !important;
  }
  textarea{
    height: 150px !important;
    width: 300px !important;
   
  }
}
</style>
