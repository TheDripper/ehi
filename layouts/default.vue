<template>
  <div>
    <div class="flex h-screen v-screen">
      <ul class="flex flex-col w-1/6 p-8 justify-center items-center font-bold" id="nav">
        <img :src="profile.media" />
        <p v-if="loggedin" class="text-md">You are logged in as: {{ profile.name }}</p>
        <NuxtLink :to="{ path: '/' }">Home</NuxtLink>
        <NuxtLink v-if="loggedin" :to="{ path: '/restaurant-dashboard' }">Profile</NuxtLink>
        <NuxtLink v-if="loggedin" :to="{ path: '/restaurant-submit' }">Submit Content</NuxtLink>
        <NuxtLink :to="{ path: '/login' }">Login</NuxtLink>
        <NuxtLink :to="{ path: '/register' }">Register</NuxtLink>
        <NuxtLink :to="{ path: '/search' }">Search</NuxtLink>
        <NuxtLink :to="{ path: '/archive' }">Archive</NuxtLink>
      </ul>
      <div class="overflow-scroll w-5/6 bg-back-grey p-8">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<style>
input,
select,
button {
  @apply border border-burnt rounded-xl w-full mb-8;
  height: 40px;
}
input[type="text"],
input[type="password"] {
  @apply pl-2;
}
button {
  @apply bg-burnt text-white;
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
<script>
export default {
  computed: {
    loggedin() {
      if(this.$store.state.loggedin) {
        return this.$store.state.loggedin;
      }
      return false;
    },
    profile() {
      if(this.loggedin) {
        return this.$store.state.users[this.loggedin].profile;
      }
      return false;
    }
  }
}
</script>

