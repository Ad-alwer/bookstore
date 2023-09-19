<template>
  <div id="parent" class="shadow-lg">
    <div class="content container-fluid border-1 border rounded-3 d-flex">
      <div class="div-log mx-4">
        <Icon
          class="mt-3 icon-home d-block"
          icon="ep:back"
          color="#565454"
          width="50"
          height="30"
          @click="backbtn"
        />
        <div class="justify-content-center d-flex mb-2">
          <img src="../assets/imgs/Logo.png" alt="" />
        </div>
        <p class="text-center fw-bold title my-2 mt-3">ورود</p>
        <div class="d-flex mt-3">
          <input
            type="text"
            class="p5-2 pe-3 form-control border-black rounded-3"
            placeholder="نام کاربری"
            ref="usernamelogin"
            @keyup="usernamechecker('login')"
          />

          <Icon
            icon="ph:user"
            width="30"
            height="30"
            class="iconinputs-log d-inline-block mt-1"
          />
        </div>
        <span ref="namealertlogin" class="spanalert mx-2 mt-1"></span>
        <div class="d-flex mt-3">
          <input
            :type="eyelogin ? 'text' : 'password'"
            class="ps-5 pe-3 form-control border-black rounded-3"
            placeholder="رمزعبور"
            ref="passwordlogin"
            @keyup="passwordchecker('login')"
            @copy="disableCopy"
          />

          <Icon
            :icon="eyelogin ? 'ph:eye' : 'ph:eye-slash'"
            class="iconinputs-log d-inline-block mt-1"
            width="30"
            height="30"
            @click="eyelogin = !eyelogin"
          />
        </div>
        <span ref="passwordalertlogin" class="spanalert mx-2 mt-1"></span>

        <div class="d-flex mt-3">
          <input
            :type="eyeloginagain ? 'text' : 'password'"
            class="ps-5 pe-3 form-control border-black rounded-3"
            placeholder="تکرار رمزعبور"
            ref="passwordagainlogin"
            @copy="disableCopy"
            @keyup="passwordagainchecker"
          />

          <Icon
            :icon="eyeloginagain ? 'ph:eye' : 'ph:eye-slash'"
            class="iconinputs-log d-inline-block mt-1"
            width="30"
            height="30"
            @click="eyeloginagain = !eyeloginagain"
          />
        </div>
        <span ref="passwordagainalert" class="spanalert mx-2 mt-1"></span>
        <div>
          <div class="me-2 form-check-reverse">
            <input
              type="checkbox"
              name=""
              id="dontforget"
              ref="dontforget"
              class="form-check-input border border-1 border-black"
            />
            <label for="dontforget" class="form-check-label me-3"
              >مرا فراموش نکن</label
            >
          </div>
        </div>
        <div class="mt-2 mb-5 justify-content-center d-flex">
          <button class="btn py-2 px-4 fs-5 btn-finish" @click="login">ادامه</button>
        </div>
      </div>
      <div class="div-reg mx-4">
        <Icon
          class="mt-3 icon-home d-block"
          icon="ep:back"
          color="#565454"
          width="50"
          height="30"
          @click="backbtn"
        />

        <div class="justify-content-center d-flex mb-2">
          <img src="../assets/imgs/Logo.png" alt="" />
        </div>
        <p class="text-center fw-bold title my-2 mt-3">ثبت نام</p>
        <div class="d-flex mt-3">
          <input
            type="text"
            class="p5-2 pe-3 form-control border-black rounded-3"
            placeholder="نام کاربری"
            ref="username"
            @keyup="usernamechecker"
            maxlength="12"
          />

          <Icon
            icon="ph:user"
            width="30"
            height="30"
            class="iconinputs-reg d-inline-block mt-1"
          />
        </div>
        <span ref="namealert" class="spanalert mx-2 mt-1"></span>
        <div class="d-flex mt-3">
          <input
            type="text"
            class="ps-5 pe-3 form-control border-black rounded-3"
            placeholder="ایمیل"
            ref="mail"
            @keyup="mailchecker"
          />

          <Icon
            icon="ic:outline-email"
            class="iconinputs-reg d-inline-block mt-1"
            width="30"
            height="30"
          />
        </div>
        <span ref="mailalert" class="spanalert mx-2 mt-1"></span>
        <div class="d-flex mt-3">
          <input
            :type="eyereg ? 'text' : 'password'"
            class="ps-5 pe-3 form-control border-black rounded-3"
            placeholder="رمزعبور"
            ref="password"
            @keyup="passwordchecker"
            @copy="disableCopy"
            
          />

          <Icon
            :icon="eyereg ? 'ph:eye' : 'ph:eye-slash'"
            class="iconinputs-reg d-inline-block mt-1"
            width="30"
            height="30"
            @click="eyereg = !eyereg"
          />
        </div>
        <span ref="passwordalert" class="spanalert mx-2 mt-1"></span>

        <div class="mt-2 mb-5 justify-content-center d-flex">
          <button class="btn py-2 px-4 fs-5 btn-finish" @click="signup">
            ادامه
          </button>
        </div>
      </div>
      <div
        :class="
          reddivstatus == 'right'
            ? 'red-div transion-right'
            : reddivstatus == 'left'
            ? 'red-div transion-left'
            : 'red-div'
        "
      >
        <div class="red-content" v-if="reddivstatustext == 'right'">
          <p class="fs-1 text-white text-center">سلام</p>
          <p class="fs-4 text-white text-center">
            برای عضویت لطفا فرم روبرو را پر کنید
          </p>
          <div class="d-flex justify-content-center flex-column mt-5">
            <p class="fs-6 text-white text-center pb-0 mb-0">
              اگر قبلا ثبت نام کردید روی دکمه زیر کلیک کنید
            </p>
            <div class="justify-content-center d-flex mt-2">
              <button
                class="btn px-4 py-2 fs-5 btn-login mt-1 rounded-3"
                @click="loginpage"
              >
                ورود
              </button>
            </div>
          </div>
          <div class="social-div">
            <hr class="text-black border-1 border border-black" />
            <div class="d-flex justify-content-center gap-4">
              <a
                class="text-decoration-none text-black"
                href="http://yun.ir/Alwer_Instagram"
              >
                <Icon icon="mdi:instagram" width="30" height="30" />
              </a>
              <a
                class="text-decoration-none text-black"
                href="https://t.me/Alwerco"
              >
                <Icon icon="ic:baseline-telegram" width="30" height="30" />
              </a>
              <a
                class="text-decoration-none text-black"
                href="https://github.com/Ad-alwer"
              >
                <Icon icon="mdi:github" width="30" height="30"
              /></a>
            </div>
          </div>
        </div>
        <div class="red-content" v-if="reddivstatustext == 'left'">
          <p class="fs-1 text-white text-center">خوش آمدی</p>
          <p class="fs-4 text-white text-center">
            برای ورود لطفا فرم روبرو را پر کنید
          </p>
          <div class="d-flex justify-content-center flex-column mt-5">
            <p class="fs-6 text-white text-center pb-0 mb-0">
              اگر حساب کاربری ندارید روی دکمه زیر کلید کنید
            </p>
            <div class="justify-content-center d-flex mt-1">
              <button
                class="btn px-4 py-2 btn-login mt-1 rounded-3 fs-5"
                @click="regpage"
              >
                ثبت نام
              </button>
            </div>
          </div>
          <div class="social-div">
            <hr class="text-black border-1 border border-black" />
            <div class="d-flex justify-content-center gap-4">
              <a
                class="text-decoration-none text-black"
                href="http://yun.ir/Alwer_Instagram"
              >
                <Icon icon="mdi:instagram" width="30" height="30" />
              </a>
              <a
                class="text-decoration-none text-black"
                href="https://t.me/Alwerco"
              >
                <Icon icon="ic:baseline-telegram" width="30" height="30" />
              </a>
              <a
                class="text-decoration-none text-black"
                href="https://github.com/Ad-alwer"
              >
                <Icon icon="mdi:github" width="30" height="30"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import axios from "axios";
import { info } from "../../config/default";
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
const apiaddress = info.fetch["address"];
const regexusername =
  /^(?=.{4,12}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
/* eslint-disable */
const mailregex =
  /^[a-z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*@gmail\.com$/;
const passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default {
  name: "login",
  beforeMount() {
    if (this.getcookies("jwt")) {
      this.removecookies(150, this.getcookies("jwt"));
    }
  },
  data() {
    return {
      eyelogin: false,
      eyeloginagain: false,
      eyereg: false,
      reddivstatus: "start",
      reddivstatustext: "right",
    };
  },

  components: {
    Icon,
  },
  methods: {
    setcookies: function (expireday, value) {
      let now;
      if (expireday == "session") {
        now = "session";
      } else {
        now = new Date();

        now.setTime(now.getTime() + expireday * 24 * 60 * 60 * 1000);
      }

      document.cookie = `jwt=${value};path=/;expires=${now}`;
    },
    getcookies: function (cookiename) {
      let cookiesArray = document.cookie.split(";");

      let mainCookie = null;

      cookiesArray.some((cookie) => {
        if (cookie.includes(cookiename)) {
          mainCookie = cookie.substring(cookie.indexOf("=") + 1);
          return true;
        }
      });

      return mainCookie;
    },
    removecookies: function (expireday, value) {
      const now = new Date();

      now.setTime(now.getTime() - expireday * 24 * 60 * 60 * 1000);

      document.cookie = `jwt=${value};path=/;expires=${now}`;
    },
    loginpage: function () {
      this.reddivstatustext = null;
      this.reddivstatus = "right";
      setTimeout(() => {
        this.reddivstatustext = "left";
        this.clear();
      }, 1800);
    },
    regpage: function () {
      this.reddivstatustext = null;
      this.reddivstatus = "left";
      setTimeout(() => {
        this.reddivstatustext = "right";
        this.clear();
      }, 1800);
    },
    backbtn: function () {
      location.href = "/";
    },
    usernamechecker: function (field) {
      if (field == "login") {
        const testval = regexusername.test(this.$refs.usernamelogin.value);

        if (!testval) {
          this.$refs.namealertlogin.innerHTML = "نام کاربری معتبر نیست";
        } else {
          this.$refs.namealertlogin.innerHTML = "";
        }
      } else {
        const testval = regexusername.test(this.$refs.username.value);

        if (!testval) {
          this.$refs.namealert.innerHTML = "نام کاربری معتبر نیست";
        } else {
          this.$refs.namealert.innerHTML = "";
        }
      }
    },
    mailchecker: function () {
      const testval = mailregex.test(this.$refs.mail.value);

      if (!testval) {
        this.$refs.mailalert.innerHTML = "آدرس ایمیل معتبر نیست";
      } else {
        this.$refs.mailalert.innerHTML = "";
      }
    },
    passwordchecker: function (field) {
      if (field == "login") {
        const testval = passwordregex.test(this.$refs.passwordlogin.value);

        if (!testval) {
          this.$refs.passwordalertlogin.innerHTML =
            "رمز باید 8 حرف باشد وحداقل یک حرف و یک عدد در ان باشد";
        } else {
          this.$refs.passwordalertlogin.innerHTML = "";
        }
      } else {
        const testval = passwordregex.test(this.$refs.password.value);

        if (!testval) {
          this.$refs.passwordalert.innerHTML =
            "رمز باید 8 حرف باشد وحداقل یک حرف و یک عدد در ان باشد";
        } else {
          this.$refs.passwordalert.innerHTML = "";
        }
      }
    },
    passwordagainchecker: function () {
      if (
        this.$refs.passwordlogin.value !== this.$refs.passwordagainlogin.value
      ) {
        this.$refs.passwordagainalert.innerHTML =
          "رمز عبور با تکرار آن برابر نیست";
      } else {
        this.$refs.passwordagainalert.innerHTML = "";
      }
    },
    clear: function () {
      this.$refs.usernamelogin.value = "";
      this.$refs.namealertlogin.innerHTML = "";

      this.$refs.username.value = "";
      this.$refs.namealert.innerHTML = "";

      this.$refs.mail.value = "";
      this.$refs.mailalert.innerHTML = "";

      this.$refs.passwordlogin.value = "";
      this.$refs.passwordalertlogin.innerHTML = "";

      this.$refs.password.value = "";
      this.$refs.passwordalert.innerHTML = "";

      this.$refs.passwordagainlogin.value = "";
      this.$refs.passwordagainalert.innerHTML = "";
    },
    signup: function () {
      if (
        this.$refs.namealert.innerHTML == "" &&
        this.$refs.mailalert.innerHTML == "" &&
        this.$refs.passwordalert.innerHTML == "" &&
        this.$refs.username.value &&
        this.$refs.mail.value &&
        this.$refs.password.value
      ) {
        axios
          .post(`${apiaddress}signup`, {
            username: this.$refs.username.value,
            email: this.$refs.mail.value,
            password: this.$refs.password.value,
          })
          .then((res) => {
            if (res.data.token) {
              this.setcookies("session", res.data.token);
              Swal.fire({
                icon: "success",
                title: "خوش آمدید",
                showConfirmButton: false,
                timer: 1500,
              });
              setInterval(() => {
                location.href = "/";
              }, 1000);
            } else {
              Toast.fire({
                icon: "error",
                title: `${res.data.message}`,
              });
            }
          });
      } else {
        Toast.fire({
          icon: "error",
          title: `لظفا تمام فیلد ها را پرکنید`,
        });
      }
    },
    login: function () {
      if (
        this.$refs.passwordlogin.value == this.$refs.passwordagainlogin.value &&
        this.$refs.namealertlogin.innerHTML == "" &&
        this.$refs.usernamelogin.value &&
        this.$refs.passwordlogin.value &&
        this.$refs.passwordagainlogin.value

      ) {
        axios
          .post(`${apiaddress}login`, {
            username: this.$refs.usernamelogin.value,
            password: this.$refs.passwordlogin.value,
          })
          .then((res) => {
            if (res.data.token) {
              
              if(this.$refs.dontforget.checked){
                this.setcookies(10, res.data.token);
              Swal.fire({
                icon: "success",
                title: "خوش آمدید",
                showConfirmButton: false,
                timer: 1200,
              });
              setInterval(() => {
                location.href = "/";
              }, 1000);
              }else{
                this.setcookies("session", res.data.token);
              Swal.fire({
                icon: "success",
                title: "خوش آمدید",
                showConfirmButton: false,
                timer: 1200,
              });
              setInterval(() => {
                location.href = "/";
              }, 1000);
              }
            } else {
              Toast.fire({
                icon: "error",
                title: `${res.data.message}`,
              });
            }
          })
      }else{
        Toast.fire({
          icon: "error",
          title: `لظفا تمام فیلد ها را پرکنید`,
        });
      }
    },
    disableCopy:function(event) {
      event.preventDefault();
    },
  },
};
</script>

<style scoped>
#parent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title {
  font-size: 40px;
}
.div-reg,
.div-log {
  /* border: 1px black solid; */
  /* height: 450px; */
  width: 480px;
}
.spanalert {
  color: var(--red);
  font-weight: 800;
}
.iconinputs-reg {
  position: absolute;
  left: 5%;
  cursor: pointer;
}
.iconinputs-log {
  position: absolute;
  left: 54%;
  cursor: pointer;
}
.icon-home {
  position: relative;
  right: 90%;
  cursor: pointer;
}
.btn-finish {
  background-color: var(--teal);
  color: white;
}
img {
  width: 80px;
}
.red-div {
  width: 50%;
  z-index: 999;
  position: absolute;

  right: 0;
  border-radius: 0 10px 10px 0px;
  height: 100%;
  background-color: var(--red);
}
.btn-login {
  color: aliceblue;
  background-color: var(--teal);
}
.transion-right {
  animation: ease-out 2s runright;
  animation-fill-mode: forwards;
}
.transion-left {
  animation: ease-out 2s runleft;
  animation-fill-mode: forwards;
}

.social-div {
  position: absolute;
  bottom: 15%;
  left: 38%;
}
.red-content {
  margin-top: 20%;
}

@keyframes runright {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
    border-radius: 10px 0 0 10px;
  }
}
@keyframes runleft {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
    border-radius: 0 10px 10px 0;
  }
}
</style>
