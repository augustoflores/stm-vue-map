import Vue from 'vue'
import VueRouter from 'vue-router'
import UbicationsComponent from '@/views/UbicationsComponent'
import VueDialog from '@/components/VueDialog'
//import VuePauta from '@/components/VuePauta'

//import listComponent from '@/views/ListComponent'
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
      //isList:false,
    },
    children: [
      {
        path: '/pauta/:markers',
        name: 'Pauta',
        props: {
          default: true,
        },
      },
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
  /*{
    path: '/listado',
    name: 'Listado',
    component: UbicationsComponent,
    props: {
      isList:true,
    }
  },
  {
    path: '/listado/ubicacion/:marker',
    name: 'Listado ubicacion',
    component: UbicationsComponent,
    props: {
      isList:true,
      default: true,
      ficha:true
    }
  },*/

]
const router = new VueRouter({
  routes
})
export default router