<template>
  <div id="root" class="testtttt">
    <div :class="classes"></div>
    <div class="flex items-center justify-between mb-6">
      <img id="logo" src="/ehi-logo.jpg" />
      <div class="relative w-full">
        <img id="glass" src="/glass.svg" />
        <input
          class="searchbox h-12 rounded-full border-none mb-0 pl-12"
          v-model="search"
          type="text"
          @change="searchSend"
        />
      </div>
    </div>
    <div class="flex w-full mb-2">
      <div class="news-float">
        <div class="news-links">
        <h5 class="text-sm font-bold">Trending News</h5>
        <a href="/archive">Read More News</a>
        </div>
        <div
          id="featNews"
          v-if="featNews && featNews.length"
          class="
            flex
            bg-white
            shadow
            rounded-3xl
            overflow-hidden
            mr-8
          "
        >
          <ul class="p-0 slider w-full">
            <li v-for="news in featNews" class="list-none slide-frame">
              <div class="image-frame">
                <img :src="news.media" class="rounded-3xl" />
              </div>
              <div class="title-frame p-4">
                <h3
                  class="
                    text-burnt
                    font-bold
                    mt-4
                    md:ml-4
                    text-lg
                  "
                >
                  {{ news.title }}
                </h3>
                <div class="flex py-4">
                  <img
                    :src="news.author.media"
                    class="rounded-3xl mr-4 biopic"
                  />
                  <div class="flex flex-col">
                    <p>{{ news.author.name }}</p>
                    <p class="text-xs text-grey">{{ news.date }}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        </div>
        <div class="news-float">
        <div
          id="userNews"
          v-if="userNews && userNews.length"
          class="flex bg-white rounded-3xl overflow-hidden shadow"
        >
        <div class="user-links">
        <h5 class="text-2xl text-white font-bold">New User Posts</h5>
        <a href="/archive">View More Posts</a>
        </div>
          <ul class="p-0 slider w-full">
            <li
              v-for="news in userNews"
              class="list-none slide-frame user-post"
            >
              <div class="image-frame">
                <img :src="news.media" class="rounded-3xl" />
              </div>
              <div class="title-frame p-4">
                <h3
                  class="
                    text-burnt
                    font-bold
                    mt-4
                    md:mt-0 md:ml-4
                    text-lg
                    md:text-xl
                  "
                >
                  {{ news.title }}
                </h3>
                <div class="flex p-4">
                  <img
                    :src="news.author.media"
                    class="rounded-3xl w-1/6 mr-4 biopic"
                  />
                  <div class="flex flex-col">
                    <p>{{ news.author.name }}</p>
                    <p class="text-xs text-grey">{{ news.date }}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </div>
      <h1 class="font-bold text-burnt">Restaurants</h1>
      <ul
        v-if="filtered && filtered.length"
        class="w-full flex filtered w-4/5 max-w-full"
      >
        <li v-for="post in filtered" class="m-4 list-none result flex-shrink-0">
          <NuxtLink :to="post.link"
            ><img class="thumb mb-4" :src="post.media"
          /></NuxtLink>
          <h3 class="text-xl">{{ post.title }}</h3>
          <p class="text-md">{{ post.blurb }}</p>
        </li>
      </ul>
      <ul v-else class="w-full flex search w-4/5 max-w-full p-0">
        <li
          v-for="page in searchAry"
          class="m-4 list-none result flex-shrink-0"
        >
          <div class="frame">
            <NuxtLink :to="page.link"
              ><img class="thumb mb-4" :src="page.media"
            /></NuxtLink>
          </div>
          <h3 class="text-xl">{{ page.title }}</h3>
          <p class="text-md">{{ page.blurb }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import wpapi from "wpapi";
import $ from "jquery";
export default {
  data() {
    return {
      filtered: [],
      search: "",
    };
  },
  methods: {
    async filter(id) {
      console.log("filter");
      let wp = new wpapi({
        endpoint: "https://eathereindy.nfshost.com/wp-json/",
        username: "tylerhillwebdev",
        password: "0MH4 CK5W 2Fm8 GUjP T4GG lHvw",
        auth: true,
      });
      console.log(id);
      let test = this.selected.indexOf(id);
      console.log("test", test);
      if (test > -1) {
        this.selected.splice(test, 1);
      } else {
        this.selected.push(id);
      }
      console.log("selected", this.selected);
      let filteredPosts = await wp
        .posts()
        .tags(this.selected)
        .categories(183)
        .perPage(100)
        .get();
      let filtered = [];
      for (let post of filteredPosts) {
        var jstr = $("<div/>").html(post.content.rendered).text();
        var obj = JSON.parse(jstr);
        obj.link = "/spots/" + post.slug;
        obj.title = post.title.rendered;
        filtered.push(obj);
      }
      console.log("filtered", filtered, filtered.length);
      this.filtered = filtered;
    },
    async searchSend() {
      let wp = new wpapi({
        endpoint: "https://eathereindy.nfshost.com/wp-json/",
        username: "tylerhillwebdev",
        password: "0MH4 CK5W 2Fm8 GUjP T4GG lHvw",
        auth: true,
      });
      let filtered = [];
      let searchRes = await wp.posts().categories(183).search(this.search);
      for (let searched of searchRes) {
        var jstr = $("<div/>").html(searched.content.rendered).text();
        var obj = JSON.parse(jstr);
        obj.link = "/spots/" + searched.slug;
        obj.title = searched.title.rendered;
        filtered.push(obj);
      }
      console.log(searchRes);
      this.filtered = filtered;
    },
  },
  created() {},
  mounted() {
    // $("a").each(function () {
    //   $(this).attr("target", "_blank");
    // });
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
      instance.$slider($(this));
    });
  },
  computed: {
    featNews() {
      return this.$store.state.featNews;
    },
    userNews() {
      return this.$store.state.userNews;
    },
    searchAry() {
      return this.$store.state.search;
    },
    page() {
      return this.$store.state.home;
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
.news-float {
  @apply flex relative w-1/2;
  .news-links {
    @apply absolute z-10 pl-4;
    top: 1rem;
    left: 50%;
    a {
      @apply text-burnt underline;
    }
  }
  .user-links {
    @apply absolute z-10 pl-4;
    top: 1rem;
    left: 1rem;
    a {
      @apply text-white underline;
    }
  }
}
#glass {
  @apply absolute z-10;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
}
.biopic {
  width: 50px !important;
  height: 50px;
}
#logo {
  @apply mr-4;
  width: 45px;
}
.search {
  overflow-x: scroll;
}
.result {
  width: 300px;
  .frame {
    width: 100%;
    height: 150px;
    @apply overflow-hidden flex items-center justify-center rounded-3xl mb-4;
    img {
      width: auto !important;
      height: auto !important;
    }
  }
}
.shadow {
  box-shadow: 2px 2px 4px 4px #eeeeee, -1px -1px 2px 2px #eeeeee;
}
.searchbox {
  box-shadow: 2px 2px 4px 4px #eeeeee, -1px -1px 2px 2px #eeeeee;
  @apply p-4 relative;
  &:before {
    @apply absolute;
    content: "";
    background: url("/glass.svg");
    width: 15px;
    height: 15px;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
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
#header {
  position: absolute;
  z-index: 99;
  width: 100vw;
  margin-bottom: 80px;
  .logo {
    width: 77px;
  }
}
.slider {
  @apply relative;
  height: 300px;
  .slick-slide {
    height: 300px;
  }
  .slide-frame {
    width: 100%;
    height: 300px;
    display: flex !important;
    @apply items-center justify-start;

    .image-frame {
      width: 50%;
      @apply overflow-hidden rounded-3xl;
      img {
        width: auto !important;
        max-width: 120% !important;
      }
    }
    .title-frame {
      width: 50%;
    }
    &.user-post {
      @apply flex-col;
      .image-frame {
        width: 100%;
        img {
          width: 100% !important;
          max-width: 100% !important;
        }
      }
      .title-frame {
        width: 100%;
        @apply justify-start;
      }
    }
  }
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
</style>