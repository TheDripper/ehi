<template>
  <div id="root" class="testtttt">
    <div :class="classes"></div>
    <div class="h-screen v-screen flex items-center justify-center">
      <div
        class="
          restaurant-login
          bg-white
          my-12
          max-w-6xl
          mx-auto
          py-12
          p-8
          rounded-xl
        "
      >
        <h2 class="text-pink text-center mb-16">Login</h2>
        <input id="username" type="text" name="username" v-model="username" />
        <input
          id="password"
          type="password"
          name="password"
          v-model="password"
        />
        <button id="submit" type="submit" @click="senduser">Login</button>
        <NuxtLink :to="{ path: '/register' }"
          ><button class="bg-button-grey border-none text-white">
            Sign Up
          </button></NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $ from "jquery";
import jQuery from "jquery";
// import $axios from "@nuxtjs/axios";
import axios from "axios";
import wpapi from "wpapi";
export default {
  // async asyncData({ $axios }) {
  //   const header = await $axios.$get("/api/pages/7");
  //   console.log(header);
  //   const footer = await $axios.$get("/api/pages/9");
  //   const home = await $axios.$get("/api/pages/5");
  //   return {
  //     header,
  //     footer,
  //     home
  //   }
  // },
  created() {},
  mounted() {
    // $("a").each(function () {
    //   $(this).attr("target", "_blank");
    // });
    let ax = this.$axios;
    let wpusers = this.users;
    let setUserCall = this.setUser;
    console.log(ax);
    $(".scroll a").on("click", function (e) {
      e.preventDefault();
      const hash = $(this).attr("href");
      console.log(hash);
      // const headerHeight = $header.outerHeight() + 500;
      const offset = $(hash).offset().top;
      $("html,body").animate({ scrollTop: offset }, 500);
    });
    let instance = this;
    $(".slider").each(function () {
      instance.$slider($(this).find(".wp-block-group__inner-container"));
    });
  },
  methods: {
    async senduser() {
      let wp = new wpapi({
        endpoint: "https://eathereindy.nfshost.com/wp-json",
        username: "tylerhillwebdev",
        password: "0MH4 CK5W 2Fm8 GUjP T4GG lHvw",
        auth: true,
      });
      let logged = "";
      for (let i in this.users) {
        console.log(this.users[i]);
        if (this.users[i].name == this.username) {
          logged = i;
        }
      }
      console.log("logged", logged);
      this.setUser(logged);
      let profiles = await wp.posts().categories(183).get();
      for (let profile of profiles) {
        if (profile.author == logged && profile.categories.includes(208)) {
          this.$router.push("/author-dashboard");
        } else if (
          profile.author == logged &&
          profile.categories.includes(209)
        ) {
          this.$router.push("/restaurant-dashboard");
        }
      }
      return;
    },
    ...mapActions(["setUser"]),
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    ajax() {
      return this.$store.state.ajax;
    },
    page() {
      return this.$store.state.restLog;
    },
    header() {
      return this.$store.state.header;
    },
    footer() {
      return this.$store.state.footer;
    },
    classes() {
      return this.$store.state.classes;
    },
  },
};
</script>
<style lang="scss">
#content {
  overflow-x: hidden;
  width: 100vw;
}
html,
body {
}
h1,
h2,
h3,
h4,
h5,
h6 {
  @apply leading-snug;
  font-family: "Nunito";
}
h1 {
  @apply text-6xl font-bold;
}
h2 {
  @apply text-4xl font-bold;
}
h3 {
  @apply text-3xl font-bold;
}
h4 {
  @apply mb-2;
}
p,
a,
li {
  @apply font-light;
  font-family: "Nunito";
}
ul {
  list-style: circle;
  @apply pl-4;
}
// .blocks-gallery-grid.slick-slider {
//   @apply w-full relative pt-12 mt-12;
//   height: 230px;
//   overflow: hidden;
//   figure {
//     height: 230px;
//     overflow: hidden;
//     @apply flex justify-center items-center;
//   }
//   .slick-prev {
//     @apply absolute rounded p-2;
//     top: 0;
//     left: 0;
//     color: white;
//   }
//   .slick-next {
//     @apply absolute rounded p-2;
//     top: 0;
//     right: 0;
//     color: white;
//   }
// }
.gallery-vertical {
  li {
    margin: 3rem 0 !important;
    img {
      max-width: 120px !important;
      @apply mx-auto;
    }
  }
}
.w-full-gutter {
  width: calc(100% - 2rem);
}
.wp-block-button__link {
  border-radius: 0;
  background: none;
  border: 2px solid black;
  color: black;
}
.wp-block-buttons {
  @apply mt-8;
}
.bleed-up {
  img {
    transform: translateY(-30px);
    @apply relative z-10;
  }
}
.epmt {
  @apply flex justify-end;
  img {
    max-width: 913px;
    transform: translate(257px);
  }
}
.arrow-link {
  a {
    color: #b8c734;
    @apply relative font-normal mt-12 inline-block;
    &:after {
      @apply absolute;
      top: 50%;
      right: 0;
      transform: translate(110%, -38%);
      content: url("/Arrow.svg");
    }
  }
}
.list-none {
  ul {
    list-style: none !important;
  }
}
.wp-block-image {
  img {
    height: auto;
  }
}
.slider {
  @apply relative;
  .prev {
  }
  .next {
  }
}
.slick-slide {
  .wp-block-columns {
    display: flex !important;
    .wp-block-column {
      &:first-child {
        @apply relative z-10 bg-white p-4;
      }
    }
  }
}
.arrows {
  @apply flex justify-end;
  cursor: pointer;
  .wp-block-column {
    max-width: 70px;
  }
}
input,
select,
button {
  @apply border border-burnt rounded w-full mb-8;
  height: 40px;
}
.ginput_complex {
  @apply flex flex-col;
}
</style>