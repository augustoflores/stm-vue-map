<template>
  <div>
    <md-dialog :md-active="showDialog">
      <md-toolbar class="fondo0">
        <h3 class="md-title" style="flex: 1">
          <md-icon class="icon">room</md-icon>{{infoDireccionComercial}}
          <md-chip class="md-accent chip" @click="zoomClick()">
            <md-icon class="icon">zoom_in</md-icon>
            <md-tooltip md-direction="top">Acercar en el mapa</md-tooltip>
          </md-chip>

        </h3>
        <md-button class="md-icon-button" @click="closeDialog()">
          <md-icon>close</md-icon>
        </md-button>
      </md-toolbar>
      <md-tabs md-dynamic-height class="md-primary">
        <md-tab md-label="Información" class="contentScroll fondo1" md-icon="description">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-xsmall-size-100 md-size-40">
              <img class="fotoubicacion" :src="getImgUrl(img)" v-if="img">
              <img class="fotoubicacion" src="/ubications-images/na.jpg" v-if="!img">
            </div>
            <div class="md-layout md-xsmall-size-100 md-layout-item md-size-60 ">
              <div class="md-layout-item md-xsmall-size-100 md-size-30 ">
                <md-subheader>
                  <md-icon class="icon">map</md-icon>Ubicacion
                </md-subheader>
                <b>Edo.:</b> {{infoCiudad}} <br class=" md-xsmall-hide md-small-show">
                <b>Col.:</b> {{infoColonia_comercial}} <br class="">
                <b>Del. o Mpo.:</b> {{infoDelegacion}}
              </div>
              <div class="md-layout-item md-xsmall-size-100 md-size-30 ">
                <md-subheader>
                  <md-icon class="icon">assignment</md-icon>Especificaciones
                </md-subheader>
                <b>Formato:</b> {{infoFormato}} <br class=" md-xsmall-hide md-small-show">
                <b>Tipo de lona:</b> {{infoTipoLona}} <br class="">
                <b>Vista:</b> {{infoVista}}
                <md-divider class="smshow"></md-divider>
              </div>
              <div class="md-layout-item md-xsmall-size-100 md-size-30 ">
                <md-subheader>
                  <md-icon class="icon">aspect_ratio</md-icon>Medidas
                </md-subheader>
                <span v-if="infoAltura"><b>Altura:</b> {{infoAltura}}</span> <br class=" md-xsmall-hide md-small-show">
                <span v-if="infoBase"><b>Base:</b> {{infoBase}}</span> <br class=" md-xsmall-hide md-small-show">
                <span v-if="infoSuperficie"><b>Superficie:</b> {{infoSuperficie}}</span>
              </div>

              <div class="md-layout-item md-xsmall-size-100 md-size-30 " v-if="infoImpactos">
                <md-subheader>
                  <md-icon class="icon">insights</md-icon>Estadisticas
                </md-subheader>
                <span v-if="infoImpactos"><b>Impactos:</b> {{infoImpactos}}</span> <br
                  class=" md-xsmall-hide md-small-show">
                <span v-if="infoAlcance"><b>Alcance:</b> {{infoAlcance}}</span> <br
                  class=" md-xsmall-hide md-small-show">
                <span v-if="infoHombres"><b>Hombres:</b> {{infoHombres}}</span><br
                  class=" md-xsmall-hide md-small-show">
                <span v-if="infoMujeres"><b>Mujeres:</b> {{infoMujeres}}</span>
              </div>

              <div class="md-layout-item md-xsmall-size-100 md-size-30 " v-if="infoNse_a">
                <md-subheader>
                  <md-icon class="icon">pie_chart</md-icon>Porcentajes Nse
                </md-subheader>
                <VuePie :labels="['A','B','C','D','E']" :arrvalues="[
                    infoNse_a.replace('%',''),
                    infoNse_b.replace('%',''),
                    infoNse_c.replace('%',''),
                    infoNse_d.replace('%',''),
                    infoNse_e.replace('%','')
                  ]" v-if="loaded" />

                <!--span v-if="infoNse_a"><b>Nse A:</b> {{infoNse_a.replace('%','')}}</span> <br class=" md-xsmall-hide md-small-show">
                <span v-if="infoNse_b"><b>Nse B:</b> {{infoNse_b}}</span> <br class=" md-xsmall-hide md-small-show">
                <span v-if="infoNse_c"><b>Nse C:</b> {{infoNse_c}}</span> <br class=" md-xsmall-hide md-small-show">
                <span v-if="infoNse_d"><b>Nse D:</b> {{infoNse_d}}</span> <br class=" md-xsmall-hide md-small-show">
                <span v-if="infoNse_e"><b>Nse E:</b> {{infoNse_e}}</span-->
              </div>

              <div class="md-layout-item md-xsmall-size-100 md-size-30 " v-if="infoEdad_13_17">
                <md-subheader>
                  <md-icon class="icon">groups</md-icon>Edades
                </md-subheader>
                <VuePie :labels="['13-17','18-25','26-40','41-55','55+']" :arrvalues="[
                    infoEdad_13_17.replace('%',''),
                    infoEdad_18_25.replace('%',''),
                    infoEdad_26_40.replace('%',''),
                    infoEdad_41_55.replace('%',''),
                    infoEdad_55_mas.replace('%','')
                  ]" v-if="loaded" />
                <!--span v-if="infoEdad_13_17"><b>Edad 13-17:</b> {{infoEdad_13_17}}</span> <br
                  class=" md-xsmall-hide md-small-show">
                <span v-if="infoEdad_18_25"><b>Edad 18-25:</b> {{infoEdad_18_25}}</span> <br
                  class=" md-xsmall-hide md-small-show">
                <span v-if="infoEdad_26_40"><b>Edad 26-40:</b> {{infoEdad_26_40}}</span> <br
                  class=" md-xsmall-hide md-small-show">
                <span v-if="infoEdad_41_55"><b>Edad 41-55:</b> {{infoEdad_41_55}}</span> <br
                  class=" md-xsmall-hide md-small-show">
                <span v-if="infoEdad_55_mas"><b>Edad 55 mas:</b> {{infoEdad_55_mas}}</span-->
              </div>


            </div>
          </div>


          <!--form novalidate  @submit.prevent="validateUser">
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
        </form-->
          <!--div v-if="!authenticated" class="md-layout">
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
        </div-->

        </md-tab>

        <md-tab md-label="Galeria" class="contentScroll" md-icon="collections" v-if="galeria">
          <div class="contenedorgaleria">
            <carousel-3d :controls-visible="true" v-if="loaded" :autoplay="true" :autoplayTimeout="4000" :autoplayHoverPause="true">
              <slide :key="i" v-for="(id, i) in galeria" :index="i">
                <img :src="getAttachmentUrl(id)" width="400" height="300">
              </slide>
            </carousel-3d>
          </div>
        </md-tab>



        <md-tab md-label="Vista de calle" class="contentScroll fondo1b" md-icon="streetview">
          <gmap-street-view-panorama class="pano" :pov="{heading: 0, pitch: 0}"
            :position="{lat: Number(this.lat),lng: Number(this.lng)}" :zoom="1">
          </gmap-street-view-panorama>
        </md-tab>

        <md-tab md-label="Video" class="contentScroll fondo1b" md-icon="video_camera_back" v-if="video">
          <div id="video">
            <video controls width="400" height="280">
              <source :src="getAttachmentUrl(video)" type="video/mp4">
              Su navegador no permite videos
            </video>
          </div>
        </md-tab>

      </md-tabs>

      <md-dialog-actions class="fondo2">
        <a href="/ingresar/olvide-contrasena/" class="link" v-if="!authenticated">
          Olvide Contraseña <md-icon class="icon">person_search</md-icon>
        </a>
        <a href="/registrate" class="link" v-if="!authenticated">
          Registrate <md-icon class="icon">person_add</md-icon>
        </a>
        <md-button @click="addPauta()" v-if="isAdmin==true" class="md-raised  md-primary">Agregar a pauta<md-icon
            class="icon">add_location_alt</md-icon>
        </md-button>

        <md-button @click="downloadPDF()" v-if="authenticated" class="md-raised  md-accent">Descarga Ficha<md-icon
            class="icon">picture_as_pdf</md-icon>
        </md-button>

      </md-dialog-actions>
    </md-dialog>
    <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :paginate-elements-by-height="1400"
      filename="ficha" :pdf-quality="2" :manual-pagination="false" pdf-format="letter"
      :html-to-pdf-options={margin:20,filename:infoDireccionComercial} pdf-orientation="portrait"
      pdf-content-width="800px" ref="html2Pdf" v-if="authenticated">
      <section slot="pdf-content">
        <div class="md-layout">

          <div class="md-layout-item md-size-100">
            <img src="../assets/sotmedia.png" width="100">
          </div>

          <div class="md-layout-item md-size-100" style="tex-align:right;">
            <center>
              <img :src="getImgUrlLocal(img)" width="400">
            </center>
          </div>

          <div class="md-layout-item md-size-100">
            <h3 class="md-title">
              <md-icon class="icon">room</md-icon>{{infoDireccionComercial}}
            </h3>
          </div>

          <div class="md-layout-item md-size-33">
            <md-subheader>
              <md-icon class="icon">map</md-icon>Ubicacion
            </md-subheader>
            <b>Edo.:</b> {{infoCiudad}} <br>
            <b>Col.:</b> {{infoColonia_comercial}} <br>
            <b>Del. o Mpo.:</b> {{infoDelegacion}}
          </div>
          <div class="md-layout-item md-size-33">
            <md-subheader>
              <md-icon class="icon">assignment</md-icon>Especificaciones
            </md-subheader>
            <b>Formato:</b> {{infoFormato}} <br>
            <b>Tipo de lona:</b> {{infoTipoLona}} <br>
            <b>Vista:</b> {{infoVista}}
          </div>
          <div class="md-layout-item md-size-33">
            <md-subheader>
              <md-icon class="icon">aspect_ratio</md-icon>Medidas
            </md-subheader>
            <span v-if="infoAltura"><b>Altura:</b> {{infoAltura}}</span> <br>
            <span v-if="infoBase"><b>Base:</b> {{infoBase}}</span> <br>
            <span v-if="infoSuperficie"><b>Superficie:</b> {{infoSuperficie}}</span>
          </div>

          <div class="md-layout-item md-size-33" v-if="infoImpactos">
            <md-subheader>
              <md-icon class="icon">insights</md-icon>Estadisticas
            </md-subheader>
            <span v-if="infoImpactos"><b>Impactos:</b> {{infoImpactos}}</span> <br
              class=" md-xsmall-hide md-small-show">
            <span v-if="infoAlcance"><b>Alcance:</b> {{infoAlcance}}</span> <br class=" md-xsmall-hide md-small-show">
            <span v-if="infoHombres"><b>Hombres:</b> {{infoHombres}}</span><br class=" md-xsmall-hide md-small-show">
            <span v-if="infoMujeres"><b>Mujeres:</b> {{infoMujeres}}</span>
          </div>

          <div class="md-layout-item md-size-33" v-if="infoNse_a">
            <md-subheader>
              <md-icon class="icon">pie_chart</md-icon>Porcentajes
            </md-subheader>
            <span v-if="infoNse_a"><b>Nse A:</b> {{infoNse_a}}</span> <br class=" md-xsmall-hide md-small-show">
            <span v-if="infoNse_b"><b>Nse B:</b> {{infoNse_b}}</span> <br class=" md-xsmall-hide md-small-show">
            <span v-if="infoNse_c"><b>Nse C:</b> {{infoNse_c}}</span> <br class=" md-xsmall-hide md-small-show">
            <span v-if="infoNse_d"><b>Nse D:</b> {{infoNse_d}}</span> <br class=" md-xsmall-hide md-small-show">
            <span v-if="infoNse_e"><b>Nse E:</b> {{infoNse_e}}</span>
          </div>

          <div class="md-layout-item md-size-33" v-if="infoEdad_13_17">
            <md-subheader>
              <md-icon class="icon">groups</md-icon>Edades
            </md-subheader>

            <span v-if="infoEdad_13_17"><b>Edad 13-17:</b> {{infoEdad_13_17}}</span> <br
              class=" md-xsmall-hide md-small-show">
            <span v-if="infoEdad_18_25"><b>Edad 18-25:</b> {{infoEdad_18_25}}</span> <br
              class=" md-xsmall-hide md-small-show">
            <span v-if="infoEdad_26_40"><b>Edad 26-40:</b> {{infoEdad_26_40}}</span> <br
              class=" md-xsmall-hide md-small-show">
            <span v-if="infoEdad_41_55"><b>Edad 41-55:</b> {{infoEdad_41_55}}</span> <br
              class=" md-xsmall-hide md-small-show">
            <span v-if="infoEdad_55_mas"><b>Edad 55 mas:</b> {{infoEdad_55_mas}}</span>
          </div>

          <div class="md-layout-item md-size-100" v-if="img">
            <p>
            </p>
          </div>

          <div class="md-layout-item md-size-100">
            <p>

              <vue-qrcode :value="'sotmedia.com.mx/mapa/#/'+currentUbication.id" :width="100" />
              <a :href="'https://sotmedia.com.mx/mapa/#/ubicacion/'+currentUbication.id">
                https://sotmedia.com.mx/mapa/#/{{currentUbication.id}}
              </a>
            </p>
          </div>
        </div>
      </section>
    </vue-html2pdf>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import VueHtml2pdf from 'vue-html2pdf'
  import VueQrcode from 'vue-qrcode'
  import VuePie from "./VuePie.vue";
  import {
    Carousel3d,
    Slide
  } from 'vue-carousel-3d';

  import {
    validationMixin
  } from 'vuelidate'
  import {
    required,
    email,
  } from 'vuelidate/lib/validators'

  Vue.use(VueAxios, axios, VueHtml2pdf, VueQrcode, VuePie, Carousel3d)

  export default {
    name: 'VueDialog',
    mixins: [validationMixin],
    components: {
      VueHtml2pdf,
      VueQrcode,
      VuePie,
      Carousel3d,
      Slide,
    },
    props: {
      zoom: Number,
      marker: String,
      markers: Array,
      authenticated: Object,
      isAdmin: Boolean,
    },
    data: () => ({
      loaded: false,
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
      infoImpactos: "-",
      infoAlcance: "-",
      infoHombres: "-",
      infoMujeres: "-",
      infoNse_a: "-",
      infoNse_b: "-",
      infoNse_c: "-",
      infoNse_d: "-",
      infoNse_e: "-",
      infoEdad_13_17: "-",
      infoEdad_18_25: "-",
      infoEdad_26_40: "-",
      infoEdad_41_55: "-",
      infoEdad_55_mas: "-",
      lat: 0,
      lng: 0,
      img: '',
      video: "",
      galeria: [],
      form: {
        username: '',
        password: '',
      },
      loginerror: false,
      loginwait: false,
    }),
    mounted() {
      this.getUbication(this.$route.params.marker)
      this.loaded = true
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
      close() {
        this.$router.back()
        this.showDialog = false
      },
      zoomClick: function () {
        this.$router.push("/")
        this.$emit('zoomToParent', {
          lat: this.currentUbication.map_ubication.lat,
          lng: this.currentUbication.map_ubication.lng,
        })
      },
      closeDialog: function () {
        this.$router.push("/")
      },
      getUbication: function (value) {
        var ubicationArr = this.markers.filter(
          function (elem) {
            if (elem.id == value) {
              console.log(elem);
              return true
            }
          }
        )
        this.currentUbication = ubicationArr[0]
        this.infoDireccionComercial = this.currentUbication.direccion_comercial
        this.infoFormato = this.currentUbication.formato
        this.infoTipoLona = this.currentUbication.tipo_lona
        this.infoAltura = this.currentUbication.altura
        this.infoBase = this.currentUbication.base
        this.infoCiudad = this.currentUbication.ciudad
        this.infoColonia_comercial = this.currentUbication.colonia_comercial
        this.infoColonia_fiscal = this.currentUbication.colonia_fiscal
        this.infoDelegacion = this.currentUbication.delegacion
        this.infoSuperficie = this.currentUbication.superficie
        this.infoVista = this.currentUbication.vista
        this.infoImpactos = this.currentUbication.impactos
        this.infoAlcance = this.currentUbication.alcance
        this.infoHombres = this.currentUbication.hombres
        this.infoMujeres = this.currentUbication.mujeres
        this.infoNse_a = this.currentUbication.nse_a
        this.infoNse_b = this.currentUbication.nse_b
        this.infoNse_c = this.currentUbication.nse_c
        this.infoNse_d = this.currentUbication.nse_d
        this.infoNse_e = this.currentUbication.nse_e
        this.infoEdad_13_17 = this.currentUbication["edad_13-17"]
        this.infoEdad_18_25 = this.currentUbication["edad_18-25"]
        this.infoEdad_26_40 = this.currentUbication["edad_26-40"]
        this.infoEdad_41_55 = this.currentUbication["edad_41-55"]
        this.infoEdad_55_mas = this.currentUbication.edad_55_mas
        this.lat = this.currentUbication.map_ubication.lat
        this.lng = this.currentUbication.map_ubication.lng
        this.img = this.currentUbication.img
        this.video = this.currentUbication.video
        this.galeria = this.currentUbication.galeria

        if (this.currentUbication.featured_media != "0") {
          this.img = this.currentUbication._embedded["wp:featuredmedia"][0].link
        }

      },
      doLogin() {
        this.loginerror = false
        this.loginwait = true
        axios.post('https://sotmedia.com.mx/wp-json/jwt-auth/v1/token', {
          username: this.form.username,
          password: this.form.password
        }).then(response => {
          this.$emit("tokenToParent", this.authenticated = response.data.token);
        }).catch((error) => {
          console.warn(error)
          this.loginerror = true
          this.loginwait = false
        });
      },
      downloadPDF() {
        this.$refs.html2Pdf.generatePdf()
      },
      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      validateUser() {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.doLogin()
        }
      },
      addPauta() {
        this.$emit('addPautaToParent', {
          id: this.currentUbication.id
        })
      },
      getImgUrl: function (img) {
        //http://sotmedia.com.mx/?attachment_id=1470
        if (img.indexOf("sotmedia") > -1) {
          return img
        }
        return '/ubications-images/' + img
      },
      getImgUrlLocal: function (img) {
        return '/ubications-images/' + img
      },
      getAttachmentUrl: function (id) {
        return "https://sotmedia.com.mx/?attachment_id=" + id
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

  .alignright {
    text-align: right;
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

  .pano {
    width: 100%;
    height: 50vh;
  }

  .dialogTitle {
    width: 70vw;
  }

  #dialog {
    background-color: white;
    z-index: 1000;
  }

  .contentScroll {
    overflow-x: visible;
  }

  .md-tabs-navigation .md-icon {
    display: none !important;
  }

  .smshow {
    display: none;
  }

  .dialogTitle {
    width: 100%;
  }

  .chip {
    margin-left: 10px;

    i {
      color: white !important;
      margin: 0 !important;
    }
  }

  .link:hover {
    text-decoration: none;
  }

  .md-theme-default {
    //background-color: unset!important;
  }

  .md-tabs-navigation {
    background-color: #ff44f6 !important;
  }

  .fondo0 {
    background: #1FAAD1 !important;

    h3,
    i {
      color: white !important;
    }
  }

  .fondo1 {
    background: url(/img/bg.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom right;
    /*
    background: #1faad1;
    background: -moz-linear-gradient(358deg, rgba(54, 94, 104, 1) 10%, rgba(255, 255, 255, 0) 10%), -moz-linear-gradient(317deg, rgba(31, 170, 209, 1) 25%, rgba(255, 255, 255, 0) 25%), -moz-linear-gradient(65deg, rgba(247, 93, 41, 1) 29%, rgba(255, 255, 255, 0) 29%);
    background: -webkit-linear-gradient(358deg, rgba(54, 94, 104, 1) 10%, rgba(255, 255, 255, 0) 10%), -webkit-linear-gradient(317deg, rgba(31, 170, 209, 1) 25%, rgba(255, 255, 255, 0) 25%), -webkit-linear-gradient(65deg, rgba(247, 93, 41, 1) 29%, rgba(255, 255, 255, 0) 29%);
    background: linear-gradient(358deg, rgba(54, 94, 104, 1) 10%, rgba(255, 255, 255, 0) 10%), linear-gradient(317deg, rgba(31, 170, 209, 1) 25%, rgba(255, 255, 255, 0) 25%), linear-gradient(65deg, rgba(247, 93, 41, 1) 29%, rgba(255, 255, 255, 0) 29%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#365e68", endColorstr="#ffffff", GradientType=1), progid:DXImageTransform.Microsoft.gradient(startColorstr="#1faad1", endColorstr="#ffffff", GradientType=1), progid:DXImageTransform.Microsoft.gradient(startColorstr="#f75d29", endColorstr="#ffffff", GradientType=1);
  */
  }

  .fondo1b- {
    background: #1faad1;
    /*
    background: -moz-linear-gradient(2deg, rgba(54, 94, 104, 1) 10%, rgba(255, 255, 255, 0) 10%), -moz-linear-gradient(110deg, rgba(31, 170, 209, 1) 29%, rgba(255, 255, 255, 0) 29%), -moz-linear-gradient(321deg, rgba(247, 93, 41, 1) 29%, rgba(255, 255, 255, 0) 29%);
    background: -webkit-linear-gradient(2deg, rgba(54, 94, 104, 1) 10%, rgba(255, 255, 255, 0) 10%), -webkit-linear-gradient(110deg, rgba(31, 170, 209, 1) 29%, rgba(255, 255, 255, 0) 29%), -webkit-linear-gradient(321deg, rgba(247, 93, 41, 1) 29%, rgba(255, 255, 255, 0) 29%);
    background: linear-gradient(2deg, rgba(54, 94, 104, 1) 10%, rgba(255, 255, 255, 0) 10%), linear-gradient(110deg, rgba(31, 170, 209, 1) 29%, rgba(255, 255, 255, 0) 29%), linear-gradient(321deg, rgba(247, 93, 41, 1) 29%, rgba(255, 255, 255, 0) 29%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#365e68", endColorstr="#ffffff", GradientType=1), progid:DXImageTransform.Microsoft.gradient(startColorstr="#1faad1", endColorstr="#ffffff", GradientType=1), progid:DXImageTransform.Microsoft.gradient(startColorstr="#f75d29", endColorstr="#ffffff", GradientType=1);
    */
  }

  .fotoubicacion {
    max-height: 340px;
  }

  .fondo2 {
    background: #365E68;

    a,
    i {
      color: white !important;
    }

    //background: #F75D29;
  }

  .contenedorgaleria {
    min-height: 300px;
  }
  #video{
    text-align: center;
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
      display: block !important;
    }

    .dialogTitle {
      font-size: 14px !important;
    }

  }
</style>