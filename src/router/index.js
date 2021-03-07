import Vue from 'vue'
import VueRouter from 'vue-router'
import UbicationsComponent from '@/views/UbicationsComponent'
import VueDialog from '@/components/VueDialog'
//import VueTemplate from '@/components/VueTemplate'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Invalid',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Ubicaciones',
    component: UbicationsComponent,
    props:{
      isList:false,
    },
    children: [
      {
        path: '/ubicacion/:marker',
        name: 'Ubicacion',
        components: {ficha:VueDialog},
        props: {
          default: true,
          ficha:true
        },
      },
    ]
  },
  {
    path: '/listado',
    name: 'Listado',
    component: UbicationsComponent,
    props: {
      isList:true,
    }
  }

]
const router = new VueRouter({
  routes
})
export default router