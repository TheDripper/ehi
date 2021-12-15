<template>
  <div id="pages" class="flex">
    <ul class="flex flex-col w-1/5" id="facets">
      <li class="list-none"
       v-for="(tag, index) in facets" :key="index">
        <p class="flex items-center justify-start">
        <input class="w-auto mr-4" type="checkbox" :value="tag.id" @change="filter(tag.id)" />{{ tag.slug }}</p>
      </li>
    </ul>
    <ul v-if="filtered && filtered.length" class="flex flex-wrap p-8 filtered w-4/5">
      <li v-for="post in filtered" class="w-1/3 m-4 p-4 list-none">
        <NuxtLink :to="post.link"
          ><img class="thumb" :src="post.media"
        /></NuxtLink>
        <h3 class="text-xl">{{ post.title }}</h3>
        <p class="text-md font-bold">{{ post.blurb }}</p>
      </li>
    </ul>
    <ul v-else class="flex flex-wrap p-8 search w-4/5">
      <li v-for="page in search" class="w-1/3 m-4 p-4 list-none">
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
import wpapi from "wpapi";
import $ from "cheerio";
export default {
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
        obj.link = post.link;
        obj.title = post.title.rendered;
        filtered.push(obj);
      }
      console.log('filtered',filtered,filtered.length);
      this.filtered = filtered;
    },
  },
  data() {
    return {
      selected: [],
      filtered: [],
    };
  },
  computed: {
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