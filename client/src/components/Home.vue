<template>
  <div class="content">
    <div class="mobile-logo">
      <img class="logo" :src="require('@/assets/logo.png')" alt="ChessKid.com Logo" />
    </div>
    <div class="sidebar">
      <SideBar />
    </div>
    <div class="friend-content">
      <FilterBar />
      <FriendsList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from './SideBar.vue'
import FilterBar from './FilterBar.vue' 
import FriendsList from './FriendsList.vue' 

export default defineComponent({
    name: "Home",
    components: {
        SideBar,
        FilterBar,
        FriendsList
    }
})
</script>

<style lang="scss">
@import '../styles/containers';
.content {
  margin: 0px 20px 0px 20px;
  max-width: 1024px;
  min-width: 320px;
  
  .container {
    @include containerStyles;
  }

  h1 {
    font-family: $headerFont;
    font-weight: normal;
    letter-spacing: 2px;
  }

  .mobile-logo {
    margin: 0px auto 1em;
    display: block;

    img {
      margin: auto;
      display: block;
    }
  }
}

@media screen and (min-width: map-get($breakpoints, desktop)) {
  .content {
    font-size: 125%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    margin: 2em auto;
  
    p {
      font-size: 75%;
    }

    .mobile-logo {
      display: none;
    }

    .friend-content {
      flex-basis: 65%;
    }

    .sidebar {
      flex-basis: 25%;
    }
  }
}
</style>