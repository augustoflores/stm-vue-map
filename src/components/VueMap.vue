<template>
  <div class="map">
    <GmapMap style="width: 100%; height: 100%;" 
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUI: false,
        restriction: {
          latLngBounds: bounds,
          strictBounds: false,
        },
      }"
      :zoom="zoom" 
      :center="{lat: centerLat, lng: centerLng}"
      ref="map"
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
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title class="dialogTitle"><md-icon class="icon">room</md-icon>{{infoDireccionComercial}}</md-dialog-title>
        <md-tabs md-dynamic-height>
          <md-tab md-label="Información">
            <md-subheader><md-icon class="icon">map</md-icon>Ubicacion</md-subheader>
            Ciudad: {{infoCiudad}}<br>
            Colonia: {{infoColonia_comercial}}<br>
            Delegacion o municipio: {{infoDelegacion}}<br>
            <md-divider></md-divider>
            <md-subheader><md-icon class="icon">assignment</md-icon>Especificaciones</md-subheader>
            Formato: {{infoFormato}}<br>
            Tipo de lona: {{infoTipoLona}}<br>
            Vista: {{infoVista}}<br>
            <md-divider></md-divider>
            <md-subheader><md-icon class="icon">aspect_ratio</md-icon>Medidas</md-subheader>
            Altura: {{infoAltura}}<br>
            Base: {{infoBase}}<br>
            Superficie: {{infoSuperficie}}<br>
          </md-tab>

          <md-tab md-label="Vista de calle">
            <gmap-street-view-panorama class="pano"
            :pov="{heading: 0, pitch: 0}"
            :position="{lat: Number(this.currentUbication.lat),lng: Number(this.currentUbication.lng)}"
            :zoom="1" >
            </gmap-street-view-panorama>
          </md-tab>
        </md-tabs>
        <md-dialog-actions>
          <md-button class="md-primary" @click="zoomClick()">Acercarse<md-icon class="icon">zoom_in</md-icon></md-button>

          <md-button class="md-primary" @click="showDialog = false">Cerrar<md-icon class="icon">close</md-icon></md-button>
        </md-dialog-actions>
      </md-dialog>
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
    zoom: Number,
    centerLat: Number,
    centerLng: Number,
    infoDireccionComercial: String,
    infoFormato: String,
    infoTipoLona: String,
    showSnackbar: Boolean,
    //Dialog info
    /*infoAltura: String,
    infoBase: String,
    infoCiudad: String,
    infoColonia_comercial: String,
    infoColonia_fiscal: String,
    infoDelegacion: String,
    infoSuperficie: String,
    infoVista: String,*/
  },
  data:() => ({
    showDialog: false,
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
    //Dialog info
    infoAltura: "",
    infoBase: "",
    infoCiudad: "",
    infoColonia_comercial: "",
    infoColonia_fiscal: "",
    infoDelegacion: "",
    infoSuperficie: "",
    infoVista: "",
  }),
  mounted() {

  },
   methods: {
      ubicationClick:function(info){
        this.currentUbication=info
        //this.zoom=50
        this.infoCiudad=info.ciudad
        this.infoColonia_comercial=info.colonia_comercial
        this.infoColonia_fiscal=info.colonia_fiscal
        this.infoDelegacion=info.delegacion
        this.infoSuperficie=info.superficie
        this.infoVista=info.vista
        this.showDialog = true
      },
      zoomClick:function(){
        this.showDialog = false
        this.$emit('zoomToParent', {
          lat:Number(this.currentUbication.lat),
          lng:Number(this.currentUbication.lng)
        })
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
