<template>
  <div class="map">
    <router-view name="ficha"
    :markers="markers"
    :marker="marker"
    v-on:zoomToParent="onZoomEvent"
    />
    <GmapMap style="width: 100%; height: 100%;" 
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUI: false,
        restriction: {
          latLngBounds: bounds,
          strictBounds: false,
        },
      }"
      :zoom="zoom" 
      :center="{lat: centerLat, lng: centerLng}"
      ref="map"
      @zoom_changed="zoomChanged"
    >
      <gmap-cluster
      :gridSize="30"
      :zoomOnClick="true"
      :minimumClusterSize="2"
      :maxZoom="15"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="{lat:Number(m.lat), lng:Number(m.lng)}"
          :clickable="true"
          @mouseover="ubicationOver(m)"
          @mouseout="ubicationOut(m)"
          @click="ubicationClick(m)"
        />
      </gmap-cluster>
    </GmapMap>
      <md-speed-dial class="currentPosition" md-direction="bottom">
        <md-speed-dial-target class="md-primary" v-on:click="geolocation()">
          <md-icon>my_location</md-icon>
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
  components: {
  },
  props: {
    texto: String,
    markers: Array,
    marker:String,
    zoom: Number,
    centerLat: Number,
    centerLng: Number,
    infoDireccionComercial: String,
    infoFormato: String,
    infoTipoLona: String,
    showSnackbar: Boolean,
    showDialog: Boolean,
  },
  data:() => ({
    currentUbication: {},
    infoWindowPos: null,
    infoWinOpen: false,
    currentMidx: null,
    bounds:{
      north: 32.63,
      south: 14.54,
      west: -117.07,
      east: -86.74,
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
      ubicationClick:function(info){
        this.$router.push("/"+info.id)

      },

       ubicationOver:function(info){
        this.$emit('childToParent', {
          direccionComercial:info.direccion_comercial,
          formato:info.formato,
          tipoLona:info.tipo_lona,
          showSnackbar: true,
        })
      },
      ubicationOut:function(info){
        this.$emit('childToParent', {
          direccionComercial:info.direccion_comercial,
          formato:info.formato,
          tipoLona:info.tipo_lona,
          showSnackbar: false,
        })
      },
       geolocation : function() {
        navigator.geolocation.getCurrentPosition((position) => {
          this.$emit('zoomToParent', {
          zoom:15,
          lat:position.coords.latitude,
          lng:position.coords.longitude
        })
        });
      },
      zoomChanged : function(value){
        this.$emit('zoomChangedToParent', {
          zoom:value,
        })
      },
      onZoomEvent(value) {
        this.$emit('zoomToParent', {
          zoom:30,
          centerLat:value.lat,
          centerLng:value.lng,
        })
        
      },
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
.map{
  width: 100vw;
  height: 75vh;
}
.icon{
    margin: 0 10px 0 0;
    padding: 0 0 0 0;
}
.md-subheader{
  padding: 0;
}
.currentPosition{
    position: absolute;
    right: 10px;
    top: 60px;
}
.pano {
  width: 100%;
  height: 50vh;
}
.dialogTitle{
  width: 70vw;
}
@media only screen and (min-width: 600px) {
    .map{
        width: 100vw;
        height: 100vh;
    }
    .currentPosition{
      top: unset;
      bottom: 17px;
      right: 70px;
    }  
}
</style>
