const getDefaultState = () => {
    return {
        user: null,
        currentSpace: null,
        todoLists: null,
        todoContent: null
    }
  }

const mutations = {

    setUser(state, user) {
       state.user = {...user} 
    },

    setTodoLists(state, list) {
        state.todoLists = list
    },
    updateTodo(state, todo) {
       state.todoLists
         .filter((item, index) => item._id === todo._id && (state.todoLists[index] = {...todo}))
    },
    addTodoList(state, todo) {
        state.todoLists.push(todo)
    },
    deleteTodoList(state, id) {
        state.todoLists
         .filter((todo, index) => todo._id === id && state.todoLists.splice(index, 1) )
    },
    saveUser(state, user) {
          state.user = { ...user }
    },
    setTodoContent(state, todo) {
        state.todoContent = todo
    },
    setCurrentSpace(state, space) {
        state.currentSpace = space
    },
    clearStore(state) {
        Object.assign(state, getDefaultState())
    }    
}

export default mutations