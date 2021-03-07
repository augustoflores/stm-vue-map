import Vue from 'vue'
import VueRouter from 'vue-router'
import UbicationsComponent from '@/views/UbicationsComponent'
//import listComponent from '@/views/ListComponent'
import VueDialog from '@/components/VueDialog'
//import VueTemplate from '@/components/VueTemplate'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Invalid',
    redirect: '/mapa',
  },
  {
    path: '/mapa',
    name: 'Ubicaciones',
    component: UbicationsComponent,
    props:{
      isList:false,
    },
    children: [
      {
        path: '/mapa/ubicacion/:marker',
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
  },

]
const router = new VueRouter({
  routes
})
export default router