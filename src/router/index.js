import Vue from 'vue'
import VueRouter from 'vue-router'
import UbicationsComponent from '../views/UbicationsComponent'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Ubicaciones',
    component: UbicationsComponent
  }
]

const router = new VueRouter({
  routes
})

export default router
