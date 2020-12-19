<template>
  <div class="map">
    <GmapMap style="width: 600px; height: 400px;" 
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUI: false
      }"
      :zoom="10" 
      :center="center"
      ref="map"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="{lat:Number(m.lat), lng:Number(m.lng)}"
        :clickable="true"
        @mouseover="ubicationOver(m)"
        @mouseout="ubicationOut()"
        @click="ubicationClick(m)"
      />

      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        <p>{{infoUbicacion}}</p>
        <p>{{infoFormato}},{{infoTipoLona}}</p>
      </gmap-info-window>

    </GmapMap>

        <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Preferences</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="General">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        </md-tab>

        <md-tab md-label="Activity">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        </md-tab>

        <md-tab md-label="Account">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <div>
      <b>{{infoUbicacion}},</b> {{infoFormato}},{{infoTipoLona}}
    </div>
  </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  name: 'VueMap',
  props: {
    msg: String
  },
  data:() => ({
    showDialog: false,
    markers: [],
    currentUbication: {},
    center:{lat: 19.63038424639754, lng: -99.28264835562116},
    infoUbicacion: '',
    infoFormato: '',
    infoTipoLona: '',
    infoWindowPos: null,
    infoWinOpen: false,
    currentMidx: null,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -35
      }
    },
  }),
  mounted() {
    this.axios.get("/ubicaciones.json").then(response => {
      this.markers = response.data
    })
  },
   methods: {
      ubicationClick:function(info){
        this.showDialog = true
        //this.center = {lat: Number(info.lat), lng: Number(info.lng)}
        this.currentUbication=info
      },
       ubicationOver:function(info){
        //this.infoWinOpen=true
        this.infoWindowPos = {lat: Number(info.lat), lng: Number(info.lng)}
        this.infoUbicacion= info.direccion_comercial
        this.infoFormato= info.formato
        this.infoTipoLona= info.tipo_lona
      },
      ubicationOut:function(){
        this.infoWinOpen=false
        this.infoUbicacion= ""
        this.infoFormato= ""
        this.infoTipoLona= ""
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
</style>
