<template>
    <div v-if="userData" class="friend-details">
        <router-link class="friend-details-btn home" :to="{name: 'Home'}">
            <span>
                <i class="fas fa-arrow-left"></i>
                Back
            </span>
        </router-link>
        <div class="friend-details-main">
            <div class="friend-details-header">
                <img class="friend-details-avatar" :src="userData.avatar" alt="User's Avatar Image"/>
                <div class="friend-details-name-container">
                    <h1 class="friend-details-name">
                        {{userData.firstName}} {{userData.lastName}}
                        <span class="tooltip-container" v-if="userData.isAdmin">
                            <i class="fas fa-chess-king"></i>
                            <p class="admin-tooltip">Admin</p>
                        </span>
                    </h1>
                </div>
            </div>
            <div class="friend-details-data">
                <p><b>Birthday:</b> {{userData.birthday}}</p>
                <p><b>Gender:</b> {{userData.gender}}</p>
                <p><b>Games Played:</b> {{userData.gamesCount}}</p>
            </div>
            <!-- These buttons are not Functional since messaging and playing against others are not part of this project's scope. I wanted to add the design into the user's page, though.-->

            <div class="friend-details-btn-container">
                <button class="friend-details-btn message">Message</button>
                <button class="friend-details-btn challenge">Challenge</button>
            </div>
        </div>
        <div class="friend-details-bio-container">
            <p>{{userData.bio}}</p>
        </div>
        <div class= "navigate-btn-container">
            <router-link :class="[(userData.id == 1) ? 'disabled' : '']" :to="{name: 'FriendDetails', params: {id: userData.id - 1}}">
                <i class="fas fa-chevron-left"></i>
            </router-link>
            <router-link :class="[(userData.id == maxUsers) ? 'disabled' : '']" :to="{name: 'FriendDetails', params: {id: userData.id + 1}}">
                <i class="fas fa-chevron-right"></i>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store'
import User from '../user'

export default defineComponent({
    name: "FriendDetails",
    setup() {
        const route = useRoute();
        const store = useStore();

        // Need to watch maxUsers to know when to disable the 'Next' button.
        const maxUsers = computed (() => store.getters.getTotalUsers);

        // Retrieve userData based on the id taken from route.
        const userData = computed(() => {
            return store.getters.getAllUsers.find((user: User) => user.id == route.params.id)})

        return {
            userData,
            maxUsers
        }
    }
})
</script>

<style scoped lang="scss">
@import "../styles/buttons";

$bgColor: rgb(104, 166, 71);

.friend-details {
    min-width: 345px;
    max-width: 1024px;
    margin: auto;
}

.friend-details-main {
    margin-top: 1em;
    background-color: white;
    color: black;
    border-radius: 1.25em;
    padding: 1em;
}

.friend-details-name-container {
    grid-row: 2;
    grid-column: 2;
}

.friend-details-name {
    font-size: 1.25em;

}

.fa-chess-king {
    position: relative;
    display: inline-block;
    color: royalblue;
}

.admin-tooltip {
    visibility: hidden;
    position: relative;
    top: -3em;
    left: -2.8em;
    display: inline-block;
    background-color: black;
    font-size: .5em;
    padding: .5em;
    border-radius: 1em;
    color: white;
}

.tooltip-container {
    font-size: .75em;
}

@keyframes tooltipFadeIn {
    0% {opacity: 0%}
    25% {opacity: 25%}
    50% {opacity: 50%}
    75% {opacity: 75%}
    100% {opacity: 100%}
}

.tooltip-container:hover .admin-tooltip{
    animation-name: tooltipFadeIn;
    animation-duration: .25s;
    visibility: visible;
}

.friend-details-header {
    overflow: hidden;
    display: grid;
    grid-template-columns: .5fr 4.5fr;
    grid-template-rows: repeat(3, 2.168em);
    grid-column-gap: .5em;
    grid-template-areas: 
    "avatar ...."
    "avatar name"
    "avatar ....";
}

.friend-details-avatar {
    margin: .5em 0 0 .5em;
    display: block;
    background-color: tan;
    border-radius: 50%;
    width: 6em;
    height: 6em;
    grid-area: avatar;
}

.friend-details-data {
    margin-left: .5em;
}

.friend-details-btn-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1em;
    
}

.friend-details-btn {
    @include buttonStyles;
    background-color: gray;
    height: 3em;
    border-radius: 1.25em;
    font-family: 'Luckiest Guy';
    letter-spacing: 1.5px;
}

.home {
    font-family: $textFont;
    text-decoration: none;
    text-align: center;
    width: 6em;
    display: flex;
    justify-content: center;
    align-content: center;

    span {
        margin: auto;
    }

}

.friend-details-btn:hover {
    filter: brightness(125%);
}

.friend-details-bio-container {
    margin: auto;
    background-color: white;
    color: black;
    border-radius: 1.25em;
    margin: 1em 0;
    overflow: hidden;
    min-height: 10em;

    p {
        margin: 1em;
    }
}

.disabled {
    pointer-events: none;
    cursor: default;
    opacity: 50%;
}

.navigate-btn-container {
    position: fixed;
    bottom: 0px;
    left: -0.5px;
    display: flex;
    justify-content: space-between;
    width: 100vw;
    font-size: 2em;

    a {
        color: $textColor;
        text-decoration: none;
        background-color: gray;
        padding: .25em .75em;
        border-radius: .25em;
    }
}

@media screen and (min-width: map-get($breakpoints, desktop)) {
    .friend-details {
        font-size: 115%;
    }

    .friend-details-name {
        font-size: 150%;
    }
    
    .navigate-btn-container {
        position: static;
        bottom: auto;
        left: auto;
        display: flex;
        justify-content: space-between;
        width: auto;
        font-size: 2em;
    }
}

</style>