const getters = {
    todoLists: state => {
        return state.todoLists
    },
    todoContent: state => {
        return state.todoContent
    },
    currentSpace: state => {
        return state.currentSpace
    },
    user: state => {
        return state.user
    }

}

export default getters