<template>
  <div id="root" class="testtttt">
    <div :class="classes"></div>
    <div
      v-if="loading"
      id="loading"
      class="
        z-30
        absolute
        top-0
        left-0
        h-screen
        w-screen
        bg-burnt
        flex flex-col
        items-center
        justify-center
      "
    >
      <h1>Loading...</h1>
    </div>
    <div class="flex h-screen v-screen">
      <div class="flex flex-col p-4">
        <label class="text-2xl">Post Title</label>
        <input type="text" name="title" v-model="title" />
        <label class="text-2xl">Write your thoughts here!</label>
        <textarea name="body" v-model="body"> </textarea>
        <input type="submit" name="submit" id="submit" @click="sendSub" />
      </div>
      <div class="container p-4">
        <p>Upload a featured image</p>
        <hr />
        <div class="large-12 medium-12 small-12 cell">
          <label
            >File Preview
            <input
              type="file"
              id="file"
              accept="image/*"
              @change="handleFileUpload($event)"
            />
          </label>
          <img v-bind:src="imagePreview" v-show="showPreview" />
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
    let vue = this;
    console.log(vue);
    console.log(ax);
    $("#gform_2").on("submit", async function (e) {
      e.preventDefault();
      let formData = new FormData(e.target);
      let send = [];
      let title = formData.get("input_1");
      let author = this.loggedin;
      for (let entry of formData.entries()) {
        send.push({
          key: entry[0],
          value: entry[1],
        });
      }

      console.log(author);
      console.log(posts);
      // vue.$router.go('/restaurant-dashboard');
    });
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
  data() {
    return {
      title: "",
      body: "",
      file: "",
      showPreview: false,
      imagePreview: "",
      loading: false,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );
      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          /*
							Fire the readAsDataURL method which will read the file in and
							upon completion fire a 'load' event which we will listen to and
							display the image in the preview.
						*/
          reader.readAsDataURL(this.file);
        }
      }
    },
    async sendSub() {
      this.loading = true;
      let wp = new wpapi({
        endpoint: "https://eathereindy.nfshost.com/wp-json",
        username: "tylerhillwebdev",
        password: "0MH4 CK5W 2Fm8 GUjP T4GG lHvw",
        auth: true,
      });

      let postSend = {
        title: this.title,
        body: this.body,
      };
      if (this.file) {
        let logo = await wp.media().file(this.file).create({
          title: this.title,
          // post: updatePage.id,
        });
        // let feat = await wp.pages().id(updatePage.id).update({
        //   featured_media: logo.id,
        // });
        let logoSrc = await wp.media().id(logo.id).get();
        console.log("logoid", logo.id);
        console.log("logosrc", logoSrc);
        postSend.media = logoSrc.guid.rendered;
      }
      postSend = JSON.stringify(postSend);
      let posts = await wp.posts().create({
        title: this.title,
        content: postSend,
        author: this.loggedin,
        categories: [207],
        status: "publish",
      });
      console.log(posts, posts.id);
      this.loading = false;
    },
  },
  computed: {
    ajax() {
      return this.$store.state.ajax;
    },
    loggedin() {
      return this.$store.state.loggedin;
    },
    page() {
      return this.$store.state.restSubmit;
    },
    pages() {
      return this.$store.state.pages;
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
textarea {
  @apply border border-burnt rounded w-full;
}
.ginput_complex {
  @apply flex flex-col;
}
</style>