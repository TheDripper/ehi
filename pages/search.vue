<template>
  <div id="pages">
    <ul>
      <li v-for="tag in facets" >
        <input type="checkbox" :value="tag.slug" @click="update(tag.slug)"/>{{ tag.slug }}
      </li>
    </ul>
    <ul class="flex flex-wrap p-8 search">
      <li v-for="page in search" class="w-1/3 m-4 p-4">
        <NuxtLink :to="page.link"
          ><img class="thumb" :src="page.media"
        /></NuxtLink>
        <h3 class="text-xl">{{ page.title }}</h3>
        <p class="text-md font-bold">{{ page.blurb }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  methods: {
    async update(slug) {
      if(this.selected[slug] && this.selected[slug] != false) {
        this.selected[slug] = false;
      } else {
        this.selected[slug] = true;
      }
      console.log(this.selected);
    },
    async filter() {
      let request_data = {
        data: {
          facets: {
            tags: ["american"],
          },
          query_args: {
            post_type: "posts",
            posts_per_page: 10,
            paged: 1,
          },
        },
      };
      this.$axios.onRequest((config) => {
        config.headers.common["Authorization"] = 'Basic ' + btoa('tylerhillwebdev:0MH4 CK5W 2Fm8 GUjP T4GG lHvw') ;
      });
      let filtered = await this.$axios.$post(
        "/api/facetwp/v1/fetch",
        request_data
      );
      console.log(filtered);
    },
  },
  data() {
    return {
      selected: {} 
    }
  },
  computed: {
    filtered() {
      let filtered = [];
      return filtered;
      // for (let post in this.$store.state.posts);
    },
    facets() {
      return this.$store.state.facets;
    },
    search() {
      return this.$store.state.search;
    },
    pages() {
      return this.$store.state.pages.urls;
    },
  },
};
</script>
<style>
.search {
  list-style: none !important;
}
.thumb {
  border-radius: 30px;
  width: 150px;
}
</style>