import axios from 'axios'

export const localLogin = (username, password) => 
  axios.get('/login', {
    params: {
     username: username,
     password: password,
     loginType:'localLogin'
    }
  }) 

export const register = (username, password) => 
  axios.post('/create-user', {
      username: username,
      password: password,
      loginType:'localLogin'
})   

export const loginGoogle = (id, accessToken) =>   
  axios.get('/login', {
    params: {
     id:id, accessToken : accessToken,
     loginType:'googleLogin'
    }
  })

const instance = {
  local: localLogin,
  register: register,
  google: loginGoogle,
}  

export default instance
