<template>
<div>
 <md-card class="filtro">
    <md-card-content>
      <div class="md-layout md-gutter">
        <div class="md-layout-item col  md-medium-size-100 md-large-size-100 autocompletefield">
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
      <div class="md-layout-item">
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
      <div class="md-layout-item">
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
  },
  data:() => ({
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
.md-field {
  margin: 4px 0 4px;
}
.filtro{
  height: 25vh;
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
@media only screen and (min-width: 600px) {
  .filtro{
    border-radius: 20px;
      height: auto;
  }
}
</style>