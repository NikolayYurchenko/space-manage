import axios from 'axios'

const actions = {
  getTodoLists(context, spaceId) {
     axios.get('http://localhost:8090/user-todoLists', {
         params : {
             spaceId:spaceId
         }
     }).then(response => {
         context.commit('setTodoLists', response.data)
     })
  },

  setUser(context, user) {
      localStorage.setItem("user", JSON.stringify(user))
      context.commit("setUser", user)
  },

  setTodoContent(context, todo) {
      context.commit('setTodoContent', todo)
  },

  setCurrentSpace(context, space) {
      context.commit('setCurrentSpace', space)
  },

  addTodoList(context, todo) {
      context.commit('addTodoList', todo)
  },

  updateTodo(context, todo) {
    context.commit('updateTodo', todo)
  },

  deleteTodoList(context, id) {
      context.commit('deleteTodoList', id)
  },

  clearStore(context) {
    context.commit('clearStore')
  }
}

export default actions