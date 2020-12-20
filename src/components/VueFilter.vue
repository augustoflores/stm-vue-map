<template>
<div>
 <md-card class="filtro">
    <md-card-content>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <gmap-autocomplete
            @place_changed="setPlace"
          >
              
          </gmap-autocomplete>
        </div>
      <!--div class="md-layout-item">
        <md-field>
          <md-select v-model="tipo_lona" name="tipo_lona" id="tipo_lona" placeholder="Tipo lona" md-dense multiple>
            <md-option value="FRONT">Front</md-option>
            <md-option value="MESH">Mesh</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-field>
          <md-select v-model="formato" name="formato" id="formato" placeholder="Formato" md-dense multiple>
            <md-option value="MURO">Muro</md-option>
            <md-option value="TOTEM">Totem</md-option>
          </md-select>
        </md-field>
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
  },
  data:() => ({
    tipo_lona: String,
    formato: String,
    place: null,
  }),
  methods: {
    setPlace(place) {
      if(place.geometry.location.lat()&&place.geometry.location.lng()){        
        this.$emit('filterToParent', {
          centerLat:place.geometry.location.lat(),
          centerLng:place.geometry.location.lng()
        })
      }
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
.filtro{
  //height: 30vh;
}
@media only screen and (min-width: 600px) {
  .filtro{
    border-radius: 20px;
  }
}
</style>
