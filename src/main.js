import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import BootstrapVue from 'bootstrap-vue'
import messages from './lang/messages.js'
import saveAs from 'file-saver'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueI18n)
Vue.use(BootstrapVue)

const i18n = new VueI18n({
  locale: 'en',
  messages
})

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
