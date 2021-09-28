import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import parseBirthday from '@/functions/parseBirthday'
import User from '@/user'

export interface State {
    currPage: number,
    maxPages: number,
    usersPerPage: 10,
    allUsers: User[],
    displayedUsers: User[],
    filteredUsers: User[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state:{
        currPage: 1,
        maxPages: 1,
        usersPerPage: 10,
        allUsers: [],
        displayedUsers: [],
        filteredUsers: []
    },
    mutations: {

        setCurrPage(state, payload: number) {
            if (payload <= state.maxPages && payload > 0) {
                state.currPage = payload;
            }
        },
        
        storeUsers(state, payload: User[]): void {
            state.allUsers = payload;
        },

        setUsersOnPage(state, payload: {users: User[], start: number, end: number}): void {
            state.displayedUsers = payload.users.slice(payload.start, payload.end);
        },
        
        setMaxPages(state, payload: number) {
            state.maxPages = payload;
        },

        setFilteredUsers(state, payload: string): void {
            payload = payload.toLowerCase();
            const filteredUsers = state.allUsers.filter(function(user) {
                
                if (`${user.firstName}`.toLowerCase().includes(payload) || 
                    `${user.lastName}`.toLowerCase().includes(payload)) {

                    return user;
                }
            });

            state.filteredUsers = filteredUsers;
        },

        // Only called during the "storeUsers" action. 
        // Only called once to reformat birthdays from UNIX Timestamp to mm/dd/yyyy format
        reformatUsersBirthday(state): void {
            state.allUsers.forEach((user: User) => user.birthday = parseBirthday(`${user.birthday}`));
        }

    },
    actions: {
        goToPage({ commit, getters }, payload: number) {
            commit("setCurrPage", payload);
            const users = (getters.getFilteredUsers.length) ? getters.getFilteredUsers : getters.getAllUsers;
            const start = getters.getUsersPerPage * (payload - 1);
            const end = start + getters.getUsersPerPage;
            commit("setUsersOnPage", {users: users, start: start, end: end})            
        },

        // Only called when app is launched. Populates store with its starting data.
        storeUsers({ commit }, payload: User[]): void {
            commit("storeUsers", payload);
            
            // Need to parse birthday from the given UNIX Timestamp format into mm/dd/yyyy format.
            commit("reformatUsersBirthday");
        },
        
        setUsersOnPage({ commit }, payload: {users: User[], start: number, end: number}): void {
            commit("setUsersOnPage", payload);
        },
        
        // Fired when a filter term is given. Filters users by name given the term, and fires mutations to set the new page information. 
        handleUserFilter({ commit, getters }, payload: string): void {
            commit("setFilteredUsers", payload);
            commit("setMaxPages", Math.ceil(getters.getFilteredUsers.length /  getters.getUsersPerPage));
            commit("setUsersOnPage", {users: getters.getFilteredUsers, start: 0, end: getters.getUsersPerPage});
            commit("setCurrPage", 1);
        },

        setMaxPages({ commit }, payload: number) {
            commit("setMaxPages", payload);
        }

    },
    getters: {
        getCurrPage: state => {
            return state.currPage;
        },

        getMaxPages: state => {
            return state.maxPages;
        },

        getUsersPerPage: state => {
            return state.usersPerPage;
        },

        getAllUsers: state => {
            return state.allUsers;
        },

        getDisplayedUsers: state => {
            return state.displayedUsers;
        },

        getFilteredUsers: state => {
            return state.filteredUsers;
        },

        getTotalUsers: state => {
            return state.allUsers.length;
        }
    }
})

// define my own useStore to prevent the need to import and inject key into vuex useStore instances in other components
export function useStore() {
    return baseUseStore(key);
}