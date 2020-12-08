import axios from 'axios'

export const getUserSpaces = () => 
    axios.get("/user-spaces")

export const createSpace = (name, description, coverPath) => 
    axios.post("/create-space", {
        name: name,
        description: description,
        coverPath: coverPath
}) 

export const editSpace = (id, name, description, coverPath) => {
 return axios.put(`/edit-space/${id}`, {
    name: name,
    description: description,
    coverPath: coverPath
 })
}

export const deleteSpace = (id) => {
    return axios.delete(`/delete-space/${id}`)
}