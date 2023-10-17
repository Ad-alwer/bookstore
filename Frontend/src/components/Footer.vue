<template>
  <footer class="py-4 mt-4" id="parent ">
    <div class="container d-flex justify-content-center gap-5">
      <div class="flex-child">
        <p class="text-center fs-2">کتاب ها</p>
        <ul>
          <li
            v-for="x in books"
            class="list-unstyled text-center pt-2 pointer li"
            :key="x"
            @click="showbook(x._id)"
          >
            {{ x.name }}
          </li>
        </ul>
      </div>
      <div class="flex-child">
        <p class="text-center fs-2">دسته بندی</p>
        <ul>
          <li
            v-for="x in genres"
            class="list-unstyled text-center pt-2 pointer li"
            :key="x"
            @click="gotoproducts(x)"
          >
            {{ x }}
          </li>
        </ul>
      </div>
      <div class="flex-child">
        <p class="text-center fs-2">دسترسی سریع</p>
        <ul>
          <li
            v-for="x in link"
            class="list-unstyled text-center pt-2 pointer li"
            :key="x"
            @click="linkhandeler(x.adress)"
          >
            {{ x.name }}
          </li>
        </ul>
      </div>
    </div>
    <hr class="mx-5 border-1 border border-secondary" />
    <div class="container d-flex justify-content-center gap-4">
      <a href="" class="text-decoration-none text-dark">
        <Icon   icon="mdi:instagram" width="40" height="40" />
      </a>
      <a href="https://github.com/Ad-alwer" class="text-decoration-none text-dark">
        <Icon   icon="mdi:github" width="40" height="40" />
      </a>
      <a href="https://www.linkedin.com/in/ad-alwer/" class="text-decoration-none text-dark">
        <Icon   icon="mdi:linkedin" width="40" height="40" />
      </a>
      <a href="https://t.me/Alwerco" class="text-decoration-none text-dark">
        <Icon   icon="ic:baseline-telegram" width="40" height="40" />
      </a>
    </div>
  </footer>
</template>

<script>
import { Icon } from "@iconify/vue";
import axios from "axios";
import { info } from "../../config/default";
let apiaddress = info.fetch["address"];
export default {
  name: "footer",
  beforeMount() {
    axios.get(`${apiaddress}mostbookorders`).then((res) => {
      this.books = res.data;
    });
    axios.get(`${apiaddress}getbase`).then((data) => {
      this.genres = data.data.genre.slice(0, 5);
    });
  },
  components: {
    Icon,
  },
  data() {
    return {
      books: [],
      genres: [],
      link: [
        { name: "خانه", adress: "/" },
        { name: "کتاب ها", adress: "/books" },
        { name: "درخواست کتاب", adress: "/requestbook" },
        { name: "سوالات متداول", adress: "/questions" },
        { name: "درباره ما", adress: "/about" },
      ],
    };
  },
  methods: {
    showbook: function (id) {
      location.href = `/book/${id}`;
    },
    gotoproducts: function (data) {
      location.href = `/book/${data}`;
    },
    linkhandeler: function (link) {
      location.href = link;
    },
  },
};
</script>

<style scoped>
footer {
  border-top: 1px solid rgba(87, 87, 87, 0.521);
}
li {
  font-size: 20px;
  color: gray;
}
li:hover {
  text-decoration: underline;
  color: black;
}
.flex-child {
  flex-grow: 1;
}

</style>
