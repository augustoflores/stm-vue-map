<template>
  <div class="md-layout md-alignment-center ubications">
    <a href="/">
      <img src="../assets/sotmedia.png" class="logo">
    </a>

    <div class="md-layout-item col md-xsmall-size-100 md-medium-size-100 map">
      <VueMap v-if="isLoaded" :markers="filterMarkers()" :infoDireccionComercial="infoDireccionComercial"
        :infoFormato="infoFormato" :infoTipoLona="infoTipoLona" :centerLat="centerLat" :centerLng="centerLng"
        :zoom="zoom" :showDialog="showDialog" v-on:childToParent="onChildEvent" v-on:zoomToParent="onZoomEvent"
        v-on:zoomChangedToParent="onZoomChangedEvent" v-on:showDialogToParent="showDialogEvent"
        v-on:tokenToParent="onTokenToParent" v-on:fullscreenToParent="toggle" :authenticated="authenticated"/>
    </div>
    <div class="filter">
      <VueFilter :infoDireccionComercial="infoDireccionComercial" :infoFormato="infoFormato"
        :infoTipoLona="infoTipoLona" :total="total" :search="search" v-on:filterPlaceToParent="onFilterPlaceEvent"
        v-on:filterTipoToParent="onFilterTipoEvent" v-on:filterFormatoToParent="onFilterFormatoEvent" />
    </div>
    <md-snackbar :md-duration="Infinity" :md-active.sync="showSnackbar">
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
    data: function () {
      return {
        isLoaded: false,
        menuVisible: true,
        markers: [],
        infoDireccionComercial: "String",
        infoFormato: "String",
        infoTipoLona: "String",
        showSnackbar: false,
        centerLat: 19.73038424639754,
        centerLng: -99.28264835562116,
        zoom: 6,
        filtrosTipo: [],
        filtrosFormato: [],
        total: 0,
        search: "",
        showDialog: false,
        authenticated: null,
      }
    },
    mounted(){
      this.authenticated=this.$session.get('authenticated')
    },
    beforeMount() {
      this.axios.get("http://devel.sotmedia.com.mx/wp-json/wp/v2/ubicacion?per_page=100").then(response => {
        this.isLoaded = true;
        this.markers = response.data
      })
    },
    methods: {
      showDialogEvent(dialog) {
        this.showDialog = dialog.dialogvisible
      },
      onZoomEvent(value) {
        console.log(value)
        this.zoom = value.zoom;
        this.centerLat = Number(value.centerLat);
        this.centerLng = Number(value.centerLng);
        this.showDialog = value.dialogvisible;
      },
      onZoomChangedEvent(value) {
        this.zoom = value.zoom;
      },
      onChildEvent(info) {
        this.infoDireccionComercial = info.direccionComercial
        this.infoFormato = info.formato
        this.infoTipoLona = info.tipoLona
        this.showSnackbar = info.showSnackbar
      },
      onFilterPlaceEvent(place) {
        console.log(place.search);
        this.centerLat = place.centerLat
        this.centerLng = place.centerLng
        this.zoom = 13
        this.search = place.search
      },
      onFilterFormatoEvent(value) {
        this.filtrosFormato = value.formato;
      },
      onFilterTipoEvent(value) {
        this.filtrosTipo = value.tipo;
      },
      onTokenToParent(value){
          this.authenticated = value;
      },
      filterMarkers() {
        var filtrosTipo = this.filtrosTipo;
        var filtrosFormato = this.filtrosFormato;
        var newMarkers = this.markers.filter(
          function (elem) {
            if (filtrosFormato.includes(elem.formato)) {
              return true
            }
            if (filtrosTipo.includes(elem.tipo_lona)) {
              return true
            }
          }
        );
        this.total = newMarkers.length
        return newMarkers
      },
      toggle() {
        this.$emit('fullscreenToParent', {
          val: true,
        })
      }
    },
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

  .filter {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100vw;
    height: 25vh;
  }

  .logo {
    height: 60px;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    background: white;
    padding: 4px;
  }

  @media only screen and (min-width: 600px) {
    .filter {
      position: fixed;
      left: 50px;
      bottom: 50px;
      width: 40vw;
      height: 30vh;
    } 
  }

  @media only screen and (min-width: 960px) {
    .filter {
      width: 30vw;
    }
  }
</style>