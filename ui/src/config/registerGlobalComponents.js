import Vue from 'vue'
//components
import Input from '@/components/common/Input.vue'
import UploadImage from '@/components/common/UploadImage.vue'
// modules
import moment from 'moment'
import Modal from '@/utils/Modal'

Vue.component('CustomInput', Input)
Vue.component('UploadImage', UploadImage)

Vue.prototype.$moment = moment
Vue.prototype.$modalState = Modal

