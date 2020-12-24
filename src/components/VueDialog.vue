<template>
    <md-dialog :md-active="showDialog" >
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
            <span v-if="infoAltura">Altura: {{infoAltura}}<br></span>
            <span v-if="infoBase">Base: {{infoBase}}<br></span>
            <span v-if="infoSuperficie">Superficie: {{infoSuperficie}}<br></span>
          </md-tab>
          <md-tab md-label="Vista de calle">
            <gmap-street-view-panorama class="pano"
            :pov="{heading: 0, pitch: 0}"
            :position="{lat: Number(this.lat),lng: Number(this.lng)}"
            :zoom="1" >
            </gmap-street-view-panorama>
          </md-tab>
        </md-tabs>
        <md-dialog-actions>
          <md-button class="md-primary" @click="zoomClick()">Acercarse<md-icon class="icon">zoom_in</md-icon></md-button>
          <md-button class="md-primary" @click="closeDialog()">Cerrar<md-icon class="icon">close</md-icon></md-button>
        </md-dialog-actions>
    </md-dialog>
</template>
<script>
export default {
  name: 'VueDialog',
  props: {
    zoom: Number,
    marker: String,
    markers:Array
  },
  data:() => ({
    showDialog: true,
    currentUbication: {},
    infoDireccionComercial: "-",
    infoFormato: "-",
    infoTipoLona: "-",
    infoAltura: "-",
    infoBase: "-",
    infoCiudad: "-",
    infoColonia_comercial: "-",
    infoColonia_fiscal: "-",
    infoDelegacion: "-",
    infoSuperficie: "-",
    infoVista: "-",
    lat:0,
    lng:0
  }),
  mounted() {
    this.getUbication(this.$route.params.marker)
  },
   methods: {
     close () {
      this.$router.back()
      this.showDialog = false
    },      
      zoomClick:function(){
        this.$router.push("/")
        this.$emit('zoomToParent', {
          lat:this.currentUbication.lat,
          lng:this.currentUbication.lng,
        })
      },
      closeDialog:function(){
        this.$router.push("/")
      },
      getUbication:function(value){
        var ubicationArr = this.markers.filter(
          function(elem){
            if(elem.id==value){
              return true
            }
          }
        )
        this.currentUbication=ubicationArr[0] 
        this.infoDireccionComercial= this.currentUbication.direccion_comercial
        this.infoFormato= this.currentUbication.formato
        this.infoTipoLona= this.currentUbication.tipo_lona
        this.infoAltura= this.currentUbication.altura
        this.infoBase= this.currentUbication.base
        this.infoCiudad= this.currentUbication.ciudad
        this.infoColonia_comercial= this.currentUbication.colonia_comercial
        this.infoColonia_fiscal= this.currentUbication.colonia_fiscal
        this.infoDelegacion= this.currentUbication.delegacion
        this.infoSuperficie= this.currentUbication.superficie
        this.infoVista= this.currentUbication.vista
        this.lat=this.currentUbication.lat
        this.lng=this.currentUbication.lng
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
.icon{
    margin: 0 10px 0 0;
    padding: 0 0 0 0;
}
.md-subheader{
  padding: 0;
}

.pano {
  width: 100%;
  height: 50vh;
}
.dialogTitle{
  width: 70vw;
}
#dialog{
  background-color: blanchedalmond;
  z-index: 1000;
}
</style>