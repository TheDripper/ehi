<template>
  <div id="root" class="testtttt">
    <div :class="classes"></div>
    <div class="flex h-screen v-screen">
      <div id="page" class="bg-back-grey">
        <div class="single mb-4">
          <div v-if="page.media" class="frame">
            <img :src="page.media" class="feat" />
          </div>
        </div>
        <div class="bg-white rounded-xl p-8 mb-4">
          <h1>{{ page.title }}</h1>
          <p>{{ page.body }}</p>
        </div>
        <div class="bg-white rounded-xl p-8 mb-4">
          <ul v-if="comments && comments.length">
            <h3 class="text-burnt">Comments</h3>
            <li
              v-for="comment in comments"
              class="list-none bg-back-grey rounded-xl m-4 p-4"
            >
              <p>
                {{ decode(comment.comment.content.rendered) }}
              </p>
              <div class="flex">
                <img :src="comment.author.profile.media" />
              <p>{{ comment.author.profile.name }}</p>
              </div>
            </li>
          </ul>
          <div class="bg-white rounded-xl p-8 mb-4"></div>
          <div v-if="user">
            <p>Comment</p>
            <textarea id="comment" v-model="comment"></textarea>
            <button @click="sendComment">Post Comment</button>
          </div>
        </div>
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
import { decode } from "html-entities";

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
    $("#rest-register").on("submit", function (e) {
      e.preventDefault();
    });
    $(".scroll a").on("click", function (e) {
      e.preventDefault();
      const hash = $(this).attr("href");
      // const headerHeight = $header.outerHeight() + 500;
      const offset = $(hash).offset().top;
      $("html,body").animate({ scrollTop: offset }, 500);
    });
    let instance = this;
    $(".slider").each(function () {
      instance.$slider($(this).find(".wp-block-group__inner-container"));
    });
    $("#gform_1").on("submit", async function (e) {
      e.preventDefault();
      let formData = $(this).serializeArray();
      // $.ajax({
      //   type: "POST",
      //   dataType: "json",
      //   url: this.ajax,
      //   data: formData,
      //   success: function (msg) {
      //     console.log(msg);
      //   },
      // });
      window.location.href = "/restaurant-created";
      // let postRes = await ax.$post("/api/presspack/v1/restaurant-register", {
      //   test: "test",
      // });
    });
  },
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    decode(comment) {
      return decode(comment);
    },
    async sendComment() {
      let wp = new wpapi({
        endpoint: "https://eathereindy.nfshost.com/wp-json/",
        username: "tylerhillwebdev",
        password: "0MH4 CK5W 2Fm8 GUjP T4GG lHvw",
        auth: true,
      });
      let newComment = await wp.comments().create({
        post: this.page.id,
        author_email: this.user.name,
        author_name: this.user.name,
        content: this.comment,
      });
      console.log("comment", newComment);
    },
  },
  computed: {
    comments() {
      let comments = [];
      for (let comment of this.$store.state.comments) {
        if (comment.post == this.page.id) {
          let name = comment.author_name;
          let author = this.profiles[name];
          comments.push({ comment, author });
        }
      }
      return comments;
    },
    user() {
      if (this.$store.state.loggedin) {
        let loggedin = this.$store.state.loggedin;
        return this.$store.state.users[loggedin];
      }
      return false;
    },
    profiles() {
      return this.$store.state.profiles;
    },
    ajax() {
      return this.$store.state.ajax;
    },
    page() {
      let slug = this.$route.params.post.replace("-", "");
      console.log(slug);
      return this.$store.state.posts[slug];
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
.single {
  .frame {
    @apply w-1/2 flex items-center justify-center overflow-hidden rounded-xl;
    object-fit: contain;
    height: 300px;
  }
}
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
select {
  @apply border border-burnt rounded w-full;
}
.ginput_complex {
  @apply flex flex-col;
}
</style>