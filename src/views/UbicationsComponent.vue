<template>
  <div class="md-layout md-alignment-center ubications">
    <div class="md-layout-item col md-xsmall-size-100 md-medium-size-100 map">
          <VueMap 
            :markers="markers" 
            :infoDireccionComercial="infoDireccionComercial" 
            :infoFormato="infoFormato" 
            :infoTipoLona="infoTipoLona"
            :centerLat="centerLat"
            :centerLng="centerLng"
            v-on:childToParent="onChildEvent"
          />
    </div>
    <div class="filter">
          <VueFilter
            :infoDireccionComercial="infoDireccionComercial" 
            :infoFormato="infoFormato" 
            :infoTipoLona="infoTipoLona"
            v-on:filterToParent="onFilterEvent"
          />
    </div>
    <md-snackbar  :md-duration="Infinity" :md-active.sync="showSnackbar" >
        {{infoDireccionComercial}}, {{infoFormato}}, {{infoTipoLona}}
    </md-snackbar>
  </div>
</template>
<script>
// @ is an alias to /src
import VueMap from '@/components/VueMap.vue'
import VueFilter from '@/components/VueFilter.vue'

export default {
  name: 'UbicationsComponent',
  components: {
    VueMap,
    VueFilter
  },
  data: () => ({
      menuVisible: true,
      markers: [],
      infoDireccionComercial: "String",
      infoFormato: "String",
      infoTipoLona: "String",
      showSnackbar: false,
      centerLat: 19.73038424639754,
      centerLng: -99.28264835562116,
  }),
  mounted() {
    this.axios.get("/ubicaciones.json").then(response => {
      this.markers = response.data
    })
  },
  methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      },
      onChildEvent(info) {
        this.infoDireccionComercial = info.direccionComercial
        this.infoFormato = info.formato
        this.infoTipoLona = info.tipoLona
        this.showSnackbar=info.showSnackbar
      },
      onFilterEvent(place) {
        this.centerLat = place.centerLat
        this.centerLng= place.centerLng
      }
    }
}
</script>

<style lang="scss" scoped>
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }
   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  .filter{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100vw;
  }
  @media only screen and (min-width: 600px) {
    .filter{
      position: fixed;
      left: 50px;
      bottom: 50px;
      width: 40vw;
    } 
  }
    @media only screen and (min-width: 100px) {
    .filter{
      position: fixed;
      left: 50px;
      bottom: 50px;
      width: 30vw;
    } 
  }

</style>