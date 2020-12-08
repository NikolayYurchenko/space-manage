import axios from 'axios'

export const createTodo = (spaceId, name) => {
 return axios.post("/create-todoList", {
      spaceId: spaceId,
      name: name,
      content: "Write something",
   })
}
export const editTodo = (id, name, content) => {
   return axios.put(`/edit-todo/${id}`, {
         name: name,
         content: content
   })
}
export const todoListsBySpace = spaceId => {
  axios.get('/user-todoLists', {
       params : {
          spaceId:spaceId
       }
   })  
}

export const deleteTodo = (id) => {
   return axios.delete(`/delete-todoList/${id}`)
}