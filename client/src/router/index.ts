import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import FriendDetails from '../components/FriendDetails.vue';
import Home from '../components/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/friends/:id',
        name: 'FriendDetails',
        component: FriendDetails
    },

    // For simplicity, all other routes from sidebar will redirect to Home.
    {    
        path: '/play',
        redirect: '/',
    },
    {    
        path: '/puzzles',
        redirect: '/',
    },
    {    
        path: '/learn',
        redirect: '/',
    },
    {    
        path: '/friends',
        redirect: '/',
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;