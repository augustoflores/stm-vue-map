<template>
  <div class="md-layout md-alignment-center ubications">
    <img src="../assets/sotmedia.png" class="logo">
    <div class="md-layout-item col md-xsmall-size-100 md-medium-size-100 map">
          <VueMap 
            :markers="filterMarkers()" 
            :infoDireccionComercial="infoDireccionComercial" 
            :infoFormato="infoFormato" 
            :infoTipoLona="infoTipoLona"
            :centerLat="centerLat"
            :centerLng="centerLng"
            :zoom="zoom"
            v-on:childToParent="onChildEvent"
            v-on:zoomToParent="onZoomEvent"
          />
    </div>
    <div class="filter">
          <VueFilter
            :infoDireccionComercial="infoDireccionComercial" 
            :infoFormato="infoFormato" 
            :infoTipoLona="infoTipoLona"
            :total="total"
            v-on:filterPlaceToParent="onFilterPlaceEvent"
            v-on:filterTipoToParent="onFilterTipoEvent"
            v-on:filterFormatoToParent="onFilterFormatoEvent"
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
  data:  function (){
    return{
      menuVisible: true,
      markers: [],
      infoDireccionComercial: "String",
      infoFormato: "String",
      infoTipoLona: "String",
      showSnackbar: false,
      centerLat: 19.73038424639754,
      centerLng: -99.28264835562116,
      zoom:6,
      filtrosTipo:[],
      filtrosFormato:[],
      total: 0,
    }
  },
  mounted() {
    this.axios.get("/ubicaciones.json").then(response => {
      this.markers = response.data
    })
  },
  methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      },
      onZoomEvent(value) {
        this.zoom=30;
        this.centerLat=value.lat;
        this.centerLng=value.lng;
      },
      onChildEvent(info) {
        this.infoDireccionComercial = info.direccionComercial
        this.infoFormato = info.formato
        this.infoTipoLona = info.tipoLona
        this.showSnackbar=info.showSnackbar
      },
      onFilterPlaceEvent(place) {
        this.centerLat = place.centerLat
        this.centerLng= place.centerLng
        this.zoom=13
      },
      onFilterFormatoEvent(value) {
        this.filtrosFormato=value.formato;
      },
      onFilterTipoEvent(value) {
        this.filtrosTipo=value.tipo;
      },
      filterMarkers(){
        var filtrosTipo=this.filtrosTipo;
        var filtrosFormato=this.filtrosFormato;
        var newMarkers=this.markers.filter(
          function(elem){
            if(filtrosFormato.includes(elem.formato)){
              return true
            }
            if(filtrosTipo.includes(elem.tipo_lona)){
              return true
            }
          }
        );
        this.total=newMarkers.length
        return newMarkers
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
    height: 25vh;
  }
  .logo{
    height: 40px;
    position: absolute;
    top: 10px;
    right: 60px;
    z-index: 1;
    background: white;
    padding: 4px;
  }
  @media only screen and (min-width: 600px) {
    .filter{
      position: fixed;
      left: 50px;
      bottom: 50px;
      width: 40vw;
      height: 30vh;
    } 
  }
  @media only screen and (min-width: 960px) {
    .filter{
      width: 30vw;
    } 
  }
</style>