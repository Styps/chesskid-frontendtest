<template>
    <div class="pagination container">
        <button @click="goToPage(currPage - 1)" :class="[(currPage == 1) ? 'disabled' : '', 'prev', 'btn']">&lt; Prev</button>
        <div class="page-number-nav">
            <button @click="goToPage(page)" 
                    v-for="page in visiblePageNums" 
                    :key="page"
                    :class="[(page == currPage) ? 'active' : 'inactive', 'page-number-btn']" >
                {{page}}     
            </button>
        </div>
        <button @click="goToPage(currPage + 1)" :class="[(currPage >= maxPages) ? 'disabled' : '', 'next', 'btn']">Next &gt;</button>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue'
import { useStore } from '../store'

export default defineComponent({
    name: "PaginationBar",
    setup() {
        const store = useStore()

        const maxPages = computed(() => store.getters.getMaxPages);

        const currPage = computed(() => store.getters.getCurrPage);

        const minVisiblePageNums = ref(10);

        /** 
         * Return the list of page numbers to display in the pagination bars container. 
         * The active page will always be first in list unless the current page is within 'minVisiblePageNums' of the max page
         * */
        const visiblePageNums = computed(() => {
            let firstVisiblePageNum = 1

            if (minVisiblePageNums.value < maxPages.value) {
                firstVisiblePageNum = ((currPage.value + minVisiblePageNums.value) >= maxPages.value) ? 
                                        maxPages.value - minVisiblePageNums.value : currPage.value;
            }
            
            const lastVisiblePageNum = ((currPage.value + minVisiblePageNums.value) <= maxPages.value) ? 
                                        currPage.value + minVisiblePageNums.value : maxPages.value;

            return [...Array(lastVisiblePageNum+1).keys()].slice(firstVisiblePageNum);
        });

        function goToPage(page: number): void {
            // Don't fire unless new page number is valid
            if (page > 0 && page <= maxPages.value) {
                store.dispatch("goToPage", page);
            }
        }

        return {
            maxPages,
            currPage,
            visiblePageNums,
            goToPage
        }
    }
})
</script>

<style scoped lang="scss">
    @import '../styles/buttons';

    button {
        @include buttonStyles;
    }

    .pagination.container {
        display: flex;
        justify-content: space-between;
        align-content: center;
        height: 3em;
        border-radius: .75em;
        margin: 2em 0 7em 0;
    }

    .page-number-nav {
        display: none;
    }

    @media screen and (min-width: map-get($breakpoints, desktop)) {
        .pagination.container {
            margin: 2em 0 0 0 
        }
        
        .page-number-nav {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-basis: 30%;
            
            button {
                width: 1.5em;
            }
        }
    }

    .prev {
        margin-left: .5em;
    }

    .next {
        margin-right: .5em;
    }

    .disabled {
        @include disabledButton;
    }

    .inactive {
        opacity: 50%;
    }

    .active {
        cursor: default;
    }
</style>