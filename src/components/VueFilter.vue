<template>
<div>
 <md-card class="filtro">
    <md-card-content>
      <div class="md-layout md-gutter">
        <div class="md-layout-item col  md-medium-size-50 md-large-size-50"> 
          <span v-if="markersPauta.length" class="botonpautad">
            <span class="switchlabel">Buscar </span><md-icon class="switchicon">travel_explore</md-icon>
          <md-switch
          v-model="isPauta"
           @change="setPauta" 
          class="md-primary switch">
          </md-switch>
          <md-badge :md-content="markersPauta.length" md-position="bottom" md-dense>
            <md-icon class="switchicon">dynamic_feed</md-icon><span class="switchlabel">Pauta</span>
          </md-badge>
            <!--
            <md-badge :md-content="markersPauta.length" md-position="bottom" md-dense>
            <span >
               Pauta
            </span>
              <md-icon class="switchicon">dynamic_feed</md-icon>
            </md-badge>
            -->
          </span>
        </div>
        <div class="md-layout-item col  md-medium-size-50 md-large-size-50">
          <span class="switchlabel">Mapa </span><md-icon class="switchicon">map</md-icon>
          <md-switch
          v-model="isListado"
           @change="setListado" 
          class="md-primary switch">
          </md-switch><md-icon class="switchicon">view_list</md-icon><span class="switchlabel">Lista</span>
        </div>
        <div class="md-layout-item col  md-medium-size-100 md-large-size-100 autocompletefield" v-if="!isPauta">
          <gmap-autocomplete class="autocomplete"
            @place_changed="setPlace"
            :value="search"
            :options="{
              componentRestrictions: {
                country: [
                  'mx',
                ],
              }
            }"
          >
          </gmap-autocomplete>
          <md-icon class="buscar">explore</md-icon>
        </div>
      <div class="md-layout-item" v-if="!isPauta">
        <md-field>
          <label for="movies">Tipo lona</label>
          <md-select
            v-model="selectedTipo"
            @md-selected="setTipoSelected"
            name="tipo_lona" 
            id="tipo_lona" 
            md-dense multiple>
            <md-option
              :key="index"
              v-for="(opt, index) in arr_tipo_lona"
              :value="opt"
            >
              {{opt}}
            </md-option>
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item" v-if="!isPauta">
        <md-field>
          <label for="movies">Formato</label>
          <md-select 
          v-model="selectedFormato"
          @md-selected="setFormatoSelected"
          name="formato" 
          id="formato" 
          md-dense 
          multiple>
            <md-option
              :key="index"
              v-for="(opt, index) in arr_formato"
              :value="opt"
            >
              {{opt}}
            </md-option>
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item pauta" v-if="isPauta">
        <ul>
          <li :key="index" v-for="(m, index) in filteredMarkersPauta" @click="ubicationClick(m)">
            <span class="nombre">
              {{m .direccion_comercial}}
            </span>
            <md-icon class="icon clear">clear</md-icon>
          </li>
        </ul>
      </div>
      <!--div class="md-layout-item col md-size-100">
        Total: {{total}}
      </div-->
    </div>
  </md-card-content>
  </md-card>
</div>
</template>
<script>
export default {
  name: 'VueFilter',
  props: {
    msg: String,
    infoDireccionComercial: String,
    infoFormato: String,
    infoTipoLona: String,
    centerLat: Number,
    centerLng: Number,
    parentSelectedTipo: Array,
    parentSelectedFormato: Array,
    total:Number,
    search: String,
    isList:Boolean,
    markersPauta:Array,
    filteredMarkersPauta:Array,
  },
  data:() => ({
    isListado: false,
    isPauta: false,
    tipo_lona: String,
    formato: String,
    place: null,
    arr_tipo_lona:["FRONT","MESH"],
    arr_formato:["MURO","TOTEM"],
    selectedTipo: [],
    selectedFormato: [],
  }),
  mounted: function() {
    this.selectedTipo= this.arr_tipo_lona
    this.selectedFormato= this.arr_formato
    this.setTipoSelected(this.arr_tipo_lona)
    this.setFormatoSelected(this.arr_formato)
  },
  methods: {
    ubicationClick: function (info) {
        this.$router.push("/ubicacion/" + info.id)

      },
    setPlace(place) {
      if(place.geometry){     
        this.search="Buscando..."   
        this.$emit('filterPlaceToParent', {
          centerLat:place.geometry.location.lat(),
          centerLng:place.geometry.location.lng(),
          search:""
        })
      }
    },
    setTipoSelected(value){
      this.$emit('filterTipoToParent', {
        tipo:value
      })
    },
    setFormatoSelected(value){
      this.$emit('filterFormatoToParent', {
        formato:value
      })
    },
    setListado(){
      this.$emit('listadoToParent', {
        isList:this.isListado
      })
    },
    setPauta(){
      this.$emit('pautaToParent', {
        isPauta:this.isPauta
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
.pauta {
  ol{
    margin: 0;
    padding: 0;
  }
  li{
    display: list-item;
    text-align: left;
    transition-duration: 500ms;
    padding: 5px;
    cursor: pointer;
    &:hover{
      color: #448AFF;
      background-color: #d8d6d6;
    }
    .clear{
      float: right;
      cursor: pointer;
    }
    .nombre{
      
    }
    .icon{
        &:hover{
          color: white;
          background-color: #777;
        }
    }
  }
}
a {
  color: #42b983;
}
.md-field {
  margin: 4px 0 4px;
}
.filtro{
  height: 33vh;
}
.autocomplete, .autocomplete:focus{
  outline: none;
  background-color: white;
  border: none;
  border-bottom: solid 1px grey;
  font-size: 16px;
  width: 100%;
  padding: 5px 0;
}
.autocompletefield{
  position: relative;
}
.buscar{
  position: absolute;
  right: 6px;
  top: 0;
  background-color: white;
}
.switchicon{
  transform: translateY(-7px);
}
.switchlabel {
    transform: translateY(-5px);
    display: inline-block;
    font-size: 9px;
    color: gray;
}
.switch {
    transform: translateX(10px);
    margin-top: 0;
}
.md-switch {
    width: auto;
    margin: 0 12px 0 -9px!important;
}
.botonpauta{
  background: #e1e3e4;
  border-radius: 45px;
  padding: 13px 16px;
  color: #777777;
  font-size: 11px;
  cursor: pointer;
  transition-duration: 500ms;

  &:hover{
      background: #c5c6c7;

  }
}
@media only screen and (min-width: 600px) {
  .filtro{
    border-radius: 20px;
    height: auto;
  }
}
</style>