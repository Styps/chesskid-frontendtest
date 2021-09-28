<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from './store'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();

    // Populate state with friend data from server and set the friends which start visible on page.
      onMounted(() => {
        fetch("http://localhost:8000/api/get-friends")
        .then((response) => response.json())
        .then((data) => store.dispatch("storeUsers", data))
        .then(() => store.dispatch("setMaxPages", Math.ceil(store.getters.getAllUsers.length / store.getters.getUsersPerPage)))
        .then(() => store.dispatch("setUsersOnPage", {users: store.getters.getAllUsers, start: 0, end: store.getters.getUsersPerPage}))
    })
  }
});
</script>

<style lang="scss">

@import './styles/containers';

html {
  background: url(./assets/background.png) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#app {
  font-family: $textFont;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $textColor;
}
</style>
