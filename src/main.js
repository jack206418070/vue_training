import { createApp } from 'vue'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import mitt from 'mitt'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

const app = createApp(App).use(router).use(VueAxios, axios)
app.config.globalProperties.$emitter = mitt()
app.component('LoadingView', Loading)
app.component('FormView', Form)
app.component('FieldView', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
