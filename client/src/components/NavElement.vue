<template>
    <div :class="['nav-element-wrapper', (isRouteActive) ? 'active' : '']">
        <router-link :to="routeTo" class="nav-element">
            <img :src="icon" />
            <span>{{ text }}</span>
        </router-link>
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: "NavElement",
    props: {
        icon: String,
        text: String,
        routeTo: String
    },
    setup(props) {
        const route = useRoute();
        const isRouteActive = computed(() => {
            if (props.text === route.name) {
                return true
            } else {
                return false;
            }
        })

        return {
            isRouteActive
        }
    }
})
</script>

<style scoped lang="scss">
    
    .nav-element-wrapper:hover {
        background-color: rgba(0, 0, 0, .25);
    }

    .nav-element-wrapper {
        display: flex;
        flex-basis: 15%;
        justify-content: center;
    }

    .nav-element {
        display: flex;
        height: 100%;
    }

    span {
        display: none;
    }

    img {
        object-fit: none;
    }

    @media screen and (min-width: map-get($breakpoints, desktop)) {
        .nav-element-wrapper {
            width: 90%;
            flex-basis: auto;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 2.5em;
            border-radius: 20px;
            margin: .25em 0;
        }

        span {
            display: inline;
            margin: .75em;
        }

        .nav-element {
            align-items: center;
            text-decoration: none;
            color: $textColor;
            margin-left: .75em;
            width: 100%;
        }

        .active {
            background-color: rgb(104, 166, 71);
        }

        .nav-element-wrapper.active {
            pointer-events: none;
        }
    }


</style>