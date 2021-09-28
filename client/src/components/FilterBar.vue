<template>
    <div class="filter container">
        <div class="icon-wrapper">
            <i class="fas fa-search"></i>
        </div>
        <input class="filter-bar" v-model="filterText" placeholder="Filter friends...">
    </div>
</template>

<script lag="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '../store'

export default defineComponent({
    name: "FilterBar",
    setup() {
        const filterText = ref("");
        const store = useStore();

        /** 
         * Watch for when user inputs filter term. Fire the handleUserFilter action, which will perform mutations on the state for:
         *      - Filtering user list for users with term in first or last name
         *      - Getting total pages to display that subset of users
         *      - Setting the displayed users from the filtered list
         *      - Resetting current page to 1
         * */ 
        watch(filterText, () => {
            store.dispatch("handleUserFilter", filterText.value);
        });

        return {
            filterText
        }
    }
})
</script>

<style scoped lang="scss">
    input {
        border: none;
        background-color: transparent;
        color: $textColor;
        font-family: $textFont;
        font-size: 1em;
    }

    input::placeholder {
        color: $textColor;
        opacity: .5;
    }

    .filter { 
        min-height: 50px;
        display: flex;
    }

    .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 15%;
    }

    .filter-bar {
        flex-basis: 80%;
    }
</style>