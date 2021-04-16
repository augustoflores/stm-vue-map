<template>
<div>
  <md-dialog :md-active="showDialog">
    <md-toolbar>
      <h3 class="md-title" style="flex: 1"><md-icon class="icon">dynamic_feed</md-icon>Pauta</h3>
      <md-button class="md-icon-button"  @click="closeDialog()">
        <md-icon>close</md-icon>
      </md-button>
    </md-toolbar>
    <md-tabs md-dynamic-height>
      <md-tab md-label="Información" class="contentScroll" md-icon="description">
        <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <md-subheader>
                <md-icon class="icon">map</md-icon>Ubicacion 
                <md-chip class="md-primary chip"  @click="zoomClick()">
                  <md-icon class="icon">zoom_in</md-icon>
                  <md-tooltip md-direction="top">Acercar en el mapa</md-tooltip>
                </md-chip>
              </md-subheader>
              <b>Edo.:</b> {{infoCiudad}} <br class=" md-xsmall-hide md-small-show">
              <b>Col.:</b> {{infoColonia_comercial}} <br class="">
              <b>Del. o Mpo.:</b> {{infoDelegacion}}
              <md-divider></md-divider>
            </div>
            <div v-if="authenticated" class="md-layout-item md-xsmall-size-100 md-small-size-50">
              <md-subheader><md-icon class="icon">assignment</md-icon>Especificaciones</md-subheader>
              <b>Formato:</b> {{infoFormato}} <br class=" md-xsmall-hide md-small-show">
              <b>Tipo de lona:</b> {{infoTipoLona}} <br class="">
              <b>Vista:</b> {{infoVista}}
              <md-divider class="smshow"></md-divider>
            </div>
            <div v-if="authenticated" class="md-layout-item md-xsmall-size-100 md-small-size-50">
              <md-subheader><md-icon class="icon">aspect_ratio</md-icon>Medidas</md-subheader>
              <span v-if="infoAltura"><b>Altura:</b> {{infoAltura}}</span> <br class=" md-xsmall-hide md-small-show">
              <span v-if="infoBase"><b>Base:</b> {{infoBase}}</span> <br class=" md-xsmall-hide md-small-show">
              <span v-if="infoSuperficie"><b>Superficie:</b> {{infoSuperficie}}</span>
            </div>
        </div>
        <form novalidate  @submit.prevent="validateUser">
          <div v-if="!authenticated" class="md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <md-subheader><md-icon class="icon">lock</md-icon>Ingresar<br>
                (Accede o registrate para ver mas detalles)
                </md-subheader>
              </div>
              <div class="md-layout-item md-xsmall-size-100 md-small-size-50">
                <md-field :class="getValidationClass('username')">
                  <label>Correo</label>
                  <md-input v-model="form.username"></md-input>
                  <span class="md-error" v-if="!$v.form.username.required">Introduce tu correo</span>
                  <span class="md-error" v-else-if="!$v.form.username.email">Introduzca un correo valido</span>
                </md-field>
              </div>
              <div class="md-layout-item md-xsmall-size-100 md-small-size-50">
                <md-field :class="getValidationClass('password')">
                  <label>Contraseña</label>
                  <md-input v-model="form.password" type="password" @keyup.enter="validateUser()"></md-input>
                  <span class="md-error" v-if="!$v.form.password.required">Introduce tu contraseña</span>
                </md-field>
              </div>
          </div>
        </form>
        <div v-if="!authenticated" class="md-layout">
            <div class="md-layout-item md-size-100 alignright">
              <md-button :disabled="loginwait" class="md-raised md-primary" @click="validateUser()">Ingresar
                <md-icon class="icon" v-if="!loginwait">login</md-icon>
              <md-progress-spinner v-if="loginwait" class="md-accent" :md-diameter="15" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
              </md-button>
            </div>
            <div class="md-layout-item md-size-100 alignright">
              <md-chip class="md-accent" v-if="loginerror">
                Error de autenticacion <md-icon>error</md-icon>
              </md-chip>
            </div>
        </div>
        
      </md-tab>
      <md-tab md-label="Vista de calle" class="contentScroll" md-icon="streetview">
        <gmap-street-view-panorama class="pano"
        :pov="{heading: 0, pitch: 0}"
        :position="{lat: Number(this.lat),lng: Number(this.lng)}"
        :zoom="1" >
        </gmap-street-view-panorama>
      </md-tab>
    </md-tabs>
    <md-dialog-actions>
      <a href="/ingresar/olvide-contrasena/"  class="link"  v-if="!authenticated">
        Olvide Contraseña <md-icon class="icon">person_search</md-icon>
      </a> 
      <a href="/registrate" class="link" v-if="!authenticated">
        Registrate <md-icon class="icon">person_add</md-icon>
      </a>
      
      <md-button @click="addPauta()" v-if="authenticated" class="md-raised  md-primary">Agregar a pauta<md-icon class="icon">add_location_alt</md-icon></md-button>

      <md-button @click="downloadPDF()" v-if="authenticated" class="md-raised  md-accent">Descarga Ficha<md-icon class="icon">picture_as_pdf</md-icon></md-button>

    </md-dialog-actions>
  </md-dialog>

</div>
</template>
<script>

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { validationMixin } from 'vuelidate'
import {
    required,
    email,
} from 'vuelidate/lib/validators'

Vue.use(VueAxios, axios)

export default {
  name: 'VuePauta',
  mixins: [validationMixin],
  components: {
  },
  props: {
    zoom: Number,
    marker: String,
    markers:Array,
    authenticated: Object
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
    lng:0,
    form:{
      username:'',
      password:'',
    },
    loginerror:false,
    loginwait: false
  }),
  mounted() {
    this.getUbication(this.$route.params.marker)
  },
  validations: {
      form: {
        username: {
          required,
          email
        },
        password: {
          required,
        },
      }
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
      },
      doLogin() {
        this.loginerror=false
        this.loginwait=true
        axios.post('https://devel.sotmedia.com.mx/wp-json/jwt-auth/v1/token', {
          username: this.form.username,
          password: this.form.password
        }).then(response => {
          this.$emit("tokenToParent", this.authenticated=response.data.token) ;
        }).catch((error) => {
          console.warn(error)
          this.loginerror=true
          this.loginwait=false
        });
      },
      downloadPDF() {
        this.$refs.html2Pdf.generatePdf()
      },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.doLogin()
        }
      },
      addPauta(){
        this.$emit('addPautaToParent', {
          id:this.currentUbication.id
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
.alignright{
  text-align: right;
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
  background-color: white;
  z-index: 1000;
}
.contentScroll {
    overflow-x:visible;
}
.md-tabs-navigation .md-icon{
    display: none!important;
}
.smshow {
  display: none;
}
.dialogTitle {
    width: 100%;
}
.chip{
  margin-left: 10px;

  i{
    color: white!important;
    margin: 0!important;
  }
}
.link:hover{
  text-decoration: none;
}
@media only screen and (min-width: 600px) {
  .pano {
    height: 40vh;
  }
}
@media only screen and (max-width: 600px) {
  .smhide {
    display: none;
  }
  .smshow {
    display: block!important;
  }
  .dialogTitle{
    font-size: 14px;
  }

}
</style>