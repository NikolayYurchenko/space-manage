import Vue from 'vue'

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '897502457060-1r665ftpbl6opoqpm5hbash9mga97of9.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)