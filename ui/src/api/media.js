import axios from 'axios'

export const uploadImage = (formData) => {
  return  axios.post('/upload-image', formData)
}