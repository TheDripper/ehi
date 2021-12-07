<template>
  <div id="pages">
    <ul>
      <li v-for="page in search">
        <NuxtLink :to="page.link"><img class="thumb" :src="page.media" /></NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
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
.thumb {
	width: 150px;
}
</style>