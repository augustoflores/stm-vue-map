import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import './registerServiceWorker'
import router from './router'
import VueLocalStorage from 'vue-localstorage'
import VueCryptojs from 'vue-cryptojs'

//import VueSessionStorage from 'vue-sessionstorage'

Vue.use(VueMaterial)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB5Ay6CQ98jRuWo1dGeXr9NJKEBOst5IgY',
    libraries: 'places,drawing,visualization', 
    region: 'MX',
    language: 'es-419',
    v: '3.26',
  },
})
Vue.use(VueLocalStorage)
Vue.use(VueCryptojs)

//Vue.use(VueSessionStorage)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
