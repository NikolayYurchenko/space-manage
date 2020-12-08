import axios from 'axios'
import router from '@/router/router'
import Vue from 'vue'

// every request config  
axios.interceptors.request.use(
    config => {
        const user = JSON.parse(localStorage.getItem('user'));
  
        if (user && user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        } 
        return config;
      },
    error => Promise.reject(error)
  );

// every response config  
axios.interceptors.response.use(
  config => {
    return config
  },
  error => {
    if (error.response.status === 401) {
      router.push('/login')
    }
    if (error.response.status === 403) {
       Vue.prototype.$message({
        showClose: true,
        message: 'Invalid password or name',
        type: 'error'
      });
      router.push('/login')
    }
    if (error.response.status === 500) {
      Vue.prototype.$message({
        showClose: true,
        message: error.response.data.msg,
        type: 'error'
      });
    }
    if (error.response.status === 409) {
      Vue.prototype.$message({
        showClose: true,
        message: 'User with the same name is already exist',
        type: 'error'
      });
    }
    return Promise.reject(error)
  }
)  

// secure routes which need auth
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { // if route need auth
    let user = JSON.parse(window.localStorage.getItem('user'));
    if (user && user.token) {
      next()
    } else {
      next({ path: '/login' })
    }
  } 
  // any else case allowed to following to route
  next()
});