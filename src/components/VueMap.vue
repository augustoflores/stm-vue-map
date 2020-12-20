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
        disableDefaultUI: false
      }"
      :zoom="zoom" 
      :center="{lat: centerLat, lng: centerLng}"
      ref="map"
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
    texto: String,
    markers: Array,
    zoom: Number,
    centerLat: Number,
    centerLng: Number,
    infoDireccionComercial: String,
    infoFormato: String,
    infoTipoLona: String,
    showSnackbar: Boolean,
  },
  data:() => ({
    showDialog: false,
    currentUbication: {},
    center:{lat: 19.63038424639754, lng: -99.28264835562116},
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

  },
   methods: {
      ubicationClick:function(info){
        this.showDialog = true
        this.currentUbication=info
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
.map{
  width: 100vw;
  height: 75vh;
}
  @media only screen and (min-width: 600px) {
    .map{
        width: 100vw;
        height: 100vh;
    }  
  }
</style>
