import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from '@/store/store'

import '@/styles/index.scss'
import '@/library/fontawesome'
import '@/config/googleAuthConfig'
import '@/config/notify'
import '@/config/interceptor'
import '@/config/editor'
import '@/config/registerGlobalComponents'
import '@/config/common'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

Vue.prototype.$store = store
