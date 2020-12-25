<template>
  <div class="map">
    <router-view name="ficha" :authenticated="authenticated" :markers="markers" :marker="marker" v-on:zoomToParent="onZoomEvent" />
    <GmapMap style="width: 100%; height: 100%;"  :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUI: false,
        mapTypeControl: false,
        controlSize: 25,
        restriction: {
          latLngBounds: bounds,
          strictBounds: false,
        },
      }" :zoom="zoom" :center="{lat: centerLat, lng: centerLng}" ref="myMapRef" @zoom_changed="zoomChanged">
      <gmap-cluster :gridSize="30" :zoomOnClick="true" :minimumClusterSize="2" :maxZoom="15">
        <GmapMarker :key="index" v-for="(m, index) in markers" :position="{lat:Number(m.lat), lng:Number(m.lng)}"
          :clickable="true" @mouseover="ubicationOver(m)" @mouseout="ubicationOut(m)" @click="ubicationClick(m)" />
      </gmap-cluster>
    </GmapMap>
    <a href="/">
    <md-speed-dial class="home" md-direction="bottom">
      <md-speed-dial-target class="md-accent">
        <md-icon>close</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
    </a>
    <md-speed-dial class="currentPosition" md-direction="bottom">
      <md-speed-dial-target class="md-primary" v-on:click="geolocation()">
        <md-icon>my_location</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
    <md-speed-dial class="fullscreen" md-direction="bottom">
      <md-speed-dial-target class="md-primary" v-on:click="gotoFullscreen()">
        <md-icon v-if="!fullscreen">fullscreen</md-icon>
        <md-icon v-if="fullscreen">fullscreen_exit</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import GoogleMapCluster from 'vue2-google-maps/dist/components/cluster'
  Vue.component('gmap-cluster', GoogleMapCluster);
  Vue.use(VueAxios, axios)
  export default {
    name: 'VueMap',
    components: {},
    props: {
      texto: String,
      markers: Array,
      marker: String,
      zoom: Number,
      centerLat: Number,
      centerLng: Number,
      infoDireccionComercial: String,
      infoFormato: String,
      infoTipoLona: String,
      showSnackbar: Boolean,
      showDialog: Boolean,
      authenticated: Boolean,
    },
    data: () => ({
      fullscreen: false,
      currentUbication: {},
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      bounds: {
        north: 32.63,
        south: 11.54,
        west: -119.07,
        east: -84.74,
      },
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
    }),
    mounted() {
      
    },
    methods: {
      ubicationClick: function (info) {
        this.$router.push("/" + info.id)

      },

      ubicationOver: function (info) {
        this.$emit('childToParent', {
          direccionComercial: info.direccion_comercial,
          formato: info.formato,
          tipoLona: info.tipo_lona,
          showSnackbar: true,
        })
      },
      ubicationOut: function (info) {
        this.$emit('childToParent', {
          direccionComercial: info.direccion_comercial,
          formato: info.formato,
          tipoLona: info.tipo_lona,
          showSnackbar: false,
        })
      },
      geolocation: function () {
        navigator.geolocation.getCurrentPosition((position) => {
          this.$emit('zoomToParent', {
            zoom: 15,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        });
      },
      zoomChanged: function (value) {
        this.$emit('zoomChangedToParent', {
          zoom: value,
        })
      },
      onZoomEvent(value) {
        this.$emit('zoomToParent', {
          zoom: 30,
          centerLat: value.lat,
          centerLng: value.lng,
        })
      },
      gotoFullscreen() {
        this.fullscreen = !this.fullscreen
        this.$emit('fullscreenToParent', {
          val: true,
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .map {
    width: 100vw;
    height: 75vh;
  }

  .icon {
    margin: 0 10px 0 0;
    padding: 0 0 0 0;
  }

  .md-subheader {
    padding: 0;
  }

  .home {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .currentPosition {
    position: absolute;
    right: 55px;
    top: 10px;
  }

  .fullscreen {
    position: absolute;
    right: 100px;
    top: 10px;
  }

  .currentPosition,
  .fullscreen, .home {
    button {
      width: 38px;
      height: 38px;
    }
  }

  .pano {
    width: 100%;
    height: 50vh;
  }

  .dialogTitle {
    width: 70vw;
  }

  @media only screen and (min-width: 600px) {
    .map {
      width: 100vw;
      height: 100vh;
    }

    .currentPosition {
      top: unset;
      bottom: 17px;
      right: 70px;
    }

    .fullscreen {
      top: unset;
      bottom: 17px;
      right: 120px;
    }
  }
</style>