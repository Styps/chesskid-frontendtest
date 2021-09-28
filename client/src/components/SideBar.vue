<template>
    <div class="sidebar-wrapper">
        <nav class="nav container">
            <ul>
                <!-- All elements either route or redirect to the home page since only Home was required to be implemented. In a larger scoped project, the non-home routes would be implemented too.  -->
                <NavElement :icon="require('@/assets/icons/home-tint.svg')" text="Home" routeTo="/"/>
                <NavElement :icon="require('@/assets/icons/play-chess-tint.svg')" text="Play" routeTo="/play"/>
                <NavElement :icon="require('@/assets/icons/puzzles-tint.svg')" text="Puzzles" routeTo="/puzzles"/>
                <NavElement :icon="require('@/assets/icons/learn-tint.svg')" text="Learn" routeTo="/learn"/>
                <NavElement :icon="require('@/assets/icons/friends-tint.svg')" text="Friends" routeTo="/friends"/>
            </ul>
        </nav>
        <img class="logo" :src="require('@/assets/logo.png')" alt="ChessKid.com Logo" />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import NavElement from './NavElement.vue'

export default defineComponent({
    name: "SideBar",
    components: {
        NavElement
    }
})
</script>

<style scoped lang="scss">
    @import "../styles/containers";

    // Fixed to bottom of screen for mobile
    .sidebar-wrapper {
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        right: 0;
        border-radius: 0px;
        height: 4em;
        background-color: $backgroundColor;

        nav {            
            height: inherit;
            border-radius: 0;
        }

        ul {
            padding: 0px;
            margin: 0px;
            display: flex;
            justify-content: space-evenly;
            height: stretch;
        }
    }

    .logo {
        display: none;
    }

    @media screen and (min-width: map-get($breakpoints, desktop)) {

        // No longer fixed to the bottom of screen, but is now fixed to side of content
        .sidebar-wrapper {
            width: 14em;
            height: auto;
            bottom: auto;
            top: auto;
            left: auto;
            right: auto;
            background-color: transparent;
 
            nav {
                @include containerStyles;
            }
        
            ul {
                display: grid;
                justify-content: normal;
                justify-items: center;
            }
        }

        .logo {
            display: block;
            margin: .75em auto;
        }
    }
</style>