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
        v-on:addPautaToParent="onAddPauta" v-on:tokenToParent="onTokenToParent" v-on:fullscreenToParent="toggle"
        :authenticated="authenticated" :isAdmin="isAdmin" :isList="isList" :markersPauta="markersPauta" />
    </div>
    <div class="filter" v-if="authenticated">
      <VueFilter :infoDireccionComercial="infoDireccionComercial" :infoFormato="infoFormato"
        :infoTipoLona="infoTipoLona" :total="total" :search="search" v-on:filterPlaceToParent="onFilterPlaceEvent"
        v-on:filterTipoToParent="onFilterTipoEvent" v-on:filterFormatoToParent="onFilterFormatoEvent"
        v-on:listadoToParent="onListadoEvent" v-on:pautaToParent="onPautaEvent" v-on:removePautaToParent="onRemovePauta"
        v-on:zoomToParent="onZoomEvent" :isList="isList" :isAdmin="isAdmin" :markersPauta="markersPauta"
        :filteredMarkersPauta="filteredMarkersPauta" />
    </div>
    <md-snackbar :md-duration="Infinity" :md-active.sync="showSnackbar">
      {{infoDireccionComercial}}, {{infoFormato}}, {{infoTipoLona}}
    </md-snackbar>
  </div>
</template>
<script>
  // @ is an alias to /src
  import Vue from 'vue'
  import VueMap from '@/components/VueMap.vue'
  import VueFilter from '@/components/VueFilter.vue'
  import underscore from 'vue-underscore';
  Vue.use(underscore);

  export default {
    name: 'UbicationsComponent',
    components: {
      VueMap,
      VueFilter,
    },
    props: {},
    data: function () {
      return {
        isList: true,
        isLoaded: false,
        menuVisible: true,
        markers: [],
        markersPauta: [],
        filteredMarkersPauta: [],
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
        userName: "",
        isAdmin: false,
      }
    },
    beforeRouteEnter(to, from, next) {
      if (to.query.redirectFrom) {
        next()
      } else {
        next()
      }
    },
    mounted() {
      var now = new Date()
      try {
        this.markersPauta = this.$route.params.markers.split(",").map(Number)
      } catch (error) {
        //console.log("Not pauta");
      }
      this.filterPautaMarkers()
      console.log("json", Vue.localStorage.get('authenticated', null))
      var auth = JSON.parse(Vue.localStorage.get('authenticated', null))
      var admin = Vue.localStorage.get('isAdmin', null)

      if (auth != null) {
        console.log("now:",now);
        console.log("exp;",new Date(auth.expiration));
        console.log("comparacion fechas:",now > new Date(auth.expiration));
        if (now > new Date(auth.expiration)) {
          auth = null
          Vue.localStorage.set('authenticated', '')
        }
          //Vue.localStorage.set('authenticated', '')
      }
      this.authenticated = auth
      this.isAdmin = (admin==="true")
      /*if (this.hasClass(document.body, "logged-in") && Vue.localStorage.get('authenticated') == null) {
        var expDate = new Date(now.setHours(now.getHours() + 1))
        this.authenticated = {
          token: 'wordpress-logged',
          expiration: expDate
        }
      }*/
      console.log("auth: ", this.authenticated);
      console.log("isAdmin: ", this.isAdmin);

      if (!this.authenticated) {
        Vue.localStorage.set('originUrl', window.location.href.split("#")[1]);
        console.log("url: ",Vue.localStorage.get('originUrl'));
        this.$router.push("/acceso")
      }
    },
    beforeMount() {
      this.axios.get("https://sotmedia.com.mx/wp-json/wp/v2/ubicacion?per_page=100&_embed").then(response => {
        this.isLoaded = true;
        var notEmptyMarkers = this.$_.filter(response.data,function(m){
          return m.lat!=0
        })
        this.markers = this.$_.sortBy(notEmptyMarkers, 'ciudad')
      })
    },
    methods: {
      showDialogEvent(dialog) {
        this.showDialog = dialog.dialogvisible
      },
      onZoomEvent(value) {
        this.zoom = value.zoom;
        this.centerLat = Number(value.centerLat);
        this.centerLng = Number(value.centerLng)-.00001;
        this.showDialog = value.dialogvisible;
        //this.isList = false
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
      onTokenToParent(value) {
        var now = new Date()
        var expDate = new Date(now.setHours(now.getHours() + 1))
        this.authenticated = {
          token: value.token,
          expiration: expDate
        }
        
        this.isAdmin = value.user_roles.includes('administrator')
        console.log("isAdmin: ", this.isAdmin)
        Vue.localStorage.set('authenticated', JSON.stringify(this.authenticated))
        Vue.localStorage.set('isAdmin', this.isAdmin)

      },
      onListadoEvent(value) {
        this.isList = value.isList
      },
      onAddPauta(value) {
        if (this.markersPauta.indexOf(value.id) === -1) {
          this.markersPauta.push(value.id)
        }
        this.filterPautaMarkers()
      },
      onRemovePauta(value) {
        if (this.markersPauta.indexOf(value.id) != -1) {
          this.markersPauta.splice(this.markersPauta.indexOf(value.id), 1);
          this.filterPautaMarkers()
        }
      },
      onPautaEvent(value) {
        if (value.isPauta) {
          this.filterPautaMarkers()
        }
      },
      arrayRemove(arr, value) {
        return arr.filter(function (ele) {
          return ele != value;
        });
      },
      filterPautaMarkers() {
        var markersPauta = this.markersPauta;
        this.filteredMarkersPauta = this.markers.filter(function (elem) {
          if (markersPauta.includes(elem.id)) {
            return true
          } else {
            return false
          }
        })
        //console.log("array: ", markersPauta);
        //console.log("filtered array: ", this.filteredMarkersPauta);
      },
      filterAllMarkers() {
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
      filterMapPautaMarkers() {
        var markersPauta = this.markersPauta;
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
        if (!this.isAdmin) {
          var newMarkersPauta = newMarkers.filter(function (elem) {
            if (markersPauta.includes(elem.id)) {
              return true
            } else {
              return false
            }
          })
          this.total = newMarkersPauta.length
          return newMarkersPauta
        } else {
          return newMarkers
        }
      },
      filterMarkers() {
        //console.log("isAdmin: ",this.isAdmin);
        if (this.markersPauta.length > 0 && !this.isAdmin) {
          return this.filterMapPautaMarkers()
        } else {
          //console.log(false);
          return this.filterAllMarkers()
        }
      },
      toggle() {
        this.$emit('fullscreenToParent', {
          val: true,
        })
      },
      hasClass(ele, cls) {
        var value = ele.className.indexOf(cls)
        if (value > -1) {
          return true
        }
        return false
      }
    },
  }
</script>
<style lang="scss" scoped>
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }
  .map {
    z-index: 0;
  }
  // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  .filter {
    position: fixed;
    right: 0px;
    bottom: 0px;
    width: 100vw;
    //height: 40vh;
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
      right: 50px;
      bottom: 100px;
      width: 43vw;
      //height: 30vh;
      //*FILTRO
    }
  }
  @media only screen and (min-width: 960px) {
    .filter {
      width: 35vw;
    }
  }
</style>