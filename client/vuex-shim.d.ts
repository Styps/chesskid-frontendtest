import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
    interface State {
        currPage: number,
        maxPages: number,
        allUsers: object[],
        displayedUsers: object[],
        filterTerm: string,
        filteredUsers: object[]

    }
  
    interface ComponentCustomProperties {
      $store: Store<State>
    }
  }