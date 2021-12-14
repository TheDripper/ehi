<template>
  <div id="pages">
    <ul>
      <li v-for="(tag, index) in facets" :key="index">
        <input
          type="checkbox"
          :value="tag.id"
          @change="filter(tag.id)"
        />{{ tag.slug }}
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
import wpapi from "wpapi";
export default {
  methods: {
    async filter(id) {
      console.log('filter');
      let wp = new wpapi({
        endpoint: "https://eathereindy.nfshost.com/wp-json/",
        username: "tylerhillwebdev",
        password: "0MH4 CK5W 2Fm8 GUjP T4GG lHvw",
        auth: true,
      });
      console.log(id);
      let test = this.selected.indexOf(id);
      console.log('test',test);
      if(test > -1) {
        this.selected.splice(test,1);
      } else {
        this.selected.push(id);
      }
      console.log('selected',this.selected);
      let filtered = await wp.posts().tags(this.selected).perPage(100).get();
      console.log("filtered", filtered);
    },
  },
  data() {
    return {
      selected: [],
    };
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