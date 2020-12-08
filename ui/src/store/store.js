// modules
import vue from 'vue'
import vuex from 'vuex'
//mutations
import mutations from './mutations'
//actions
import actions from './actions'
// getters
import getters from './getters'

vue.use(vuex)

const store = new vuex.Store({
    state: {
        user: null,
        currentSpace: null,
        todoLists: null,
        todoContent: null
    },
    mutations: mutations,
    getters: getters,
    actions: actions
})

export default store 
