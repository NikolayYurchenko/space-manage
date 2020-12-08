import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/components/layouts/Main.vue'
import Auth from '@/components/authorization/SignIn.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      meta: {
        requiresAuth:true
      }
    },
    {
      path:'/login',
      component:Auth
    }
  ]
})
