var jQuery = require('jquery')
window.jQuery = jQuery
window.$ = jQuery
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'

require('../node_modules/jquery/dist/jquery.min.js')
require('../node_modules/popper.js/dist/popper.min.js')
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../node_modules/animate.css/animate.min.css'
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
