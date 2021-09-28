<template>
    <div>
        <h1 class="friends-list-header">Friends</h1>
        <div class="friends-list-wrapper">
            <FriendCard v-for="user in userData" :user="user" :key="user.id" />
        </div>
        <PaginationBar />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import FriendCard from './FriendCard.vue'
import PaginationBar from './PaginationBar.vue'
import { useStore } from '../store'

export default defineComponent({
    name: "FriendsList",
    components: {
        FriendCard,
        PaginationBar
    },
    setup() {
        const store = useStore();
        
        // Watch the store for when displayUsers changes. Will be fired on filter or page change.
        const userData = computed(() => store.getters.getDisplayedUsers);

        return {
            userData
        }
    }
})
</script>

<style scoped lang="scss">
    .friends-list-header {
        text-align: left;
    }

    .friends-list-wrapper {
        display: grid;
        grid-row-gap: 1.25em;
        
    }
</style>
