<template>
  <div id="root" class="testtttt">
    <div :class="classes"></div>
    <div id="page" class="">
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
          flex
          flex-col
          items-center
          justify-center
        "
      >
      <h1>Loading...</h1>
      </div>
      <h1>{{ page.name }}</h1>
      <h2>{{ page.type }}</h2>
      <select name="foodType" v-model="resttype">
        <option>Indian</option>
        <option>Vietnamese</option>
        <option>BBQ</option>
      </select>
      <img :src="page.media" class="feat w-1/5" />
      <div class="container flex">
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
          <img class="w-1/3" v-bind:src="imagePreview" v-show="showPreview" />
        </div>
      </div>

      <p>{{ page.address }}</p>
      <input type="text" v-model="restaddress" />
      <p>{{ page.city }}, {{ page.state }}</p>
      <input type="text" v-model="restcity" />
      <input type="text" v-model="reststate" />
      <p>{{ page.hours }}</p>
      <input type="text" name="hours" v-model="resthours" />
      <p>{{ page.blurb }}</p>
      <textarea class="blurb" v-model="restblurb">{{ page.blurb }}</textarea>
      <input type="submit" value="Update Profile" @click="sendSub" />
      <ul>
        <li v-for="post in posts">
          {{ post.title.rendered }} | {{ post.status }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $ from "jquery";
import jQuery from "jquery";
import wpapi from "wpapi";
// import $axios from "@nuxtjs/axios";
import axios from "axios";
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
  data() {
    return {
      restaddress: "",
      restaddress2: "",
      restcity: "",
      reststate: "",
      restzip: "",
      resttype: "",
      resthours: "",
      restblurb: "",
      file: "",
      showPreview: false,
      imagePreview: "",
      loading: false,
    };
  },
  mounted() {
    // $("a").each(function () {
    //   $(this).attr("target", "_blank");
    // });
    let ax = this.$axios;
    console.log(ax);
    $("#rest-register").on("submit", function (e) {
      e.preventDefault();
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
  methods: {
    ...mapActions(["setPage"]),
    async sendSub() {
      this.loading = true;
      let wp = new wpapi({
        endpoint: "https://eathereindy.nfshost.com/wp-json",
        username: "tylerhillwebdev",
        password: "0MH4 CK5W 2Fm8 GUjP T4GG lHvw",
        auth: true,
      });
      // let restData = {
      //   name: this.restName,
      //   address: this.restAddress,
      //   address2: this.restAdress2,
      //   city: this.restCity,
      //   state: this.restState,
      //   zip: this.restZip,
      //   category: this.foodType,
      //   hours: this.hours,
      //   blurb: this.blurb,
      // };
      let pageClone = {};
      // let newPage = Object.assign(this.page,pageClone);
      // console.log('newPage',newPage);
      for (let item in this.page) {
        let restitem = "rest" + item;
        if (this[restitem] !== "" && typeof this[restitem] !== "undefined") {
          console.log(restitem, this[restitem]);
          pageClone[item] = this[restitem];
        } else {
          pageClone[item] = this.page[item];
        }
      }
      let title = this.page.name;
      console.log("pageClone", pageClone);
      let restSend = JSON.stringify(pageClone);
      let updatePage = await wp.pages().author(this.loggedin).get();
      updatePage = updatePage[0];
      let updated = await wp.pages().id(updatePage.id).update({
        content: restSend,
      });
      console.log("updated", updated);
      if (this.file) {
        let logo = await wp.media().file(this.file).create({
          title: title,
          post: updatePage.id,
        });
        let feat = await wp.pages().id(updatePage.id).update({
          featured_media: logo.id,
        });
        let logoSrc = await wp.media().id(logo.id).get();
        console.log("logoid", logo.id);
        console.log("logosrc", logoSrc);
        pageClone.media = logoSrc.guid.rendered;
        restSend = JSON.stringify(pageClone);
      }
      this.setPage(pageClone);
      this.loading = false;
      // this.$router.push({
      //   path: "/restaurant-dashboard",
      // });
    },
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
  },
  computed: {
    ajax() {
      return this.$store.state.ajax;
    },
    loggedin() {
      return this.$store.state.loggedin;
    },
    posts() {
      let wp = new wpapi({
        endpoint: "https://eathereindy.nfshost.com/wp-json",
        username: "tylerhillwebdev",
        password: "0MH4 CK5W 2Fm8 GUjP T4GG lHvw",
        auth: true,
      });
      let allPosts = this.$store.state.posts;
      let myPosts = [];
      for (let post of allPosts) {
        console.log(post.title, post.author);
        if (post.author == this.loggedin) {
          if (post.featured_media) {
            let feat = wp.media().id(post.featured_media).get();
            post.feat = feat;
          }
          myPosts.push(post);
        }
      }
      return myPosts;
    },
    page() {
      return this.$store.state.myPage;
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
select {
  @apply border border-burnt rounded w-full;
}
.ginput_complex {
  @apply flex flex-col;
}
</style>