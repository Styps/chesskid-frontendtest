<template>
    <div class="friend-preview container">
        <router-link class="friend-link" :to="{name: 'FriendDetails', params: {id: user.id}}">
            <img class="friend-avatar" :src="user.avatar" alt="User's Avatar Image"/>
            <div class="friend-info-wrapper">
                <h3 class="friend-info-name">{{user.firstName}} {{user.lastName}}</h3>
                <p><b>Birthday:</b> {{user.birthday}}, <b>games:</b> {{user.gamesCount}}</p>
            </div>
        </router-link>
        <button @click="toggleBio" class="expand"><i :class="['fas', (isBioExpanded) ? 'fa-chevron-up': 'fa-chevron-down']"></i></button>
        <div :class="['friend-bio-wrapper', (isBioExpanded) ? 'expanded' : 'collapsed']">
            {{user.bio}}
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "FriendCard",
    props: {
        user: {
            Object, 
            required: true,
            default: {
                firstName: "",
                lastName: "",
                birthday: "",
                gamesCount: 0,
                avatar: "",
                bio: ""
            }
        }
    },
    setup() {        
        const isBioExpanded = ref(false);

        function toggleBio(): void {
            isBioExpanded.value = !isBioExpanded.value; 
        }

        return {
            isBioExpanded,
            toggleBio
        }
    }
})
</script>

<style scoped lang="scss">
    @import "../styles/buttons";

    $friendSquareHeight: 6em;

    .friend-preview {
        display: flex;
        align-items: center;
        border-radius: 1.25rem;
        min-height: $friendSquareHeight
    }

    .friend-link {
        display: flex;
        align-items: center;
        border-radius: 1.25rem;
        min-height: $friendSquareHeight;
        color: $textColor;
        text-decoration: none;
    }

    .friend-info-wrapper {
        display: grid;

        .friend-info-name {
            margin: 0 0 .25em 0;
            color: $linkColor;
        }

        p {
            font-size: .65em;
            letter-spacing: 0.5px;
            margin: .5rem 0 0 0;
            width: 100%;
            align-self: flex-end;
        }
    }

    .friend-name {
        text-decoration: none;
        letter-spacing: 1.5px;
        width: 100%;
    }

    .friend-avatar {
        width: 3em;
        height: 3em;
        margin: 0 1rem;
    }

    button.expand {
        display: none;
    }

    .friend-bio-wrapper {
        display: none;
    }


    @media screen and (min-width: map-get($breakpoints, desktop)) {
        .friend-preview {
            display: grid;
            grid-template-columns: .5fr 1.5fr 1.5fr .5fr;
            grid-template-rows: ($friendSquareHeight / 12) ($friendSquareHeight / 1.25) auto;
            grid-template-areas:
                "........... ........... .......... .........."
                "friend-data friend-data .......... expand-btn"
                "........... friend-bio  friend-bio ..........";
        }

        .friend-avatar {
            grid-area: avatar;
        }
        
        .friend-link {
            grid-area: friend-data;
            display: grid;
            grid-template-columns: .5fr 1.5fr;
            grid-template-rows: 1fr;
            grid-template-areas:
                "avatar friend-info";
        }

        .friend-info-wrapper {
            grid-area: friend-info;

            p {
                margin-top: 1rem;
            }
        }

        .friend-data-wrapper {
            width: 80%;
            grid-area: friend-data;
            margin: 0;
        }
        
        button.expand {
            @include buttonStyles;
            grid-area: expand-btn;
        }

        .friend-bio-wrapper {
            grid-area: friend-bio;
            margin-bottom: 1em;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            font-size: 75%;
        }

        .collapsed {
            display: none
        }

        .expanded {
            display: auto;
        }
    }
</style>