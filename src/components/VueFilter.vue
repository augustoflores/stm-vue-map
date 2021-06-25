<template>
  <div>
    <md-card class="filtro" v-if="isAdmin">
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item col md-xsmall-size-50 md-small-size-50 md-medium-size-50 md-large-size-50">
            <span v-if="markersPauta.length" class="botonpautad">
              <span class="switchlabel">Buscar </span>
              <md-icon class="switchicon md-xsmall-hide md-small-hide">travel_explore</md-icon>
              <md-switch v-model="isPauta" @change="setPauta" class="md-primary switch">
              </md-switch>
              <md-badge :md-content="markersPauta.length" md-position="bottom" md-dense>
                <md-icon class="switchicon md-xsmall-hide md-small-hide">dynamic_feed</md-icon><span class="switchlabel">Pauta</span>
              </md-badge>
            </span>
          </div>
          <div class="md-layout-item col md-xsmall-size-50 md-small-size-50 md-medium-size-50 md-large-size-50">
            <span class="switchlabel">Mapa </span>
            <md-icon class="switchicon md-xsmall-hide md-small-hide">map</md-icon>
            <md-switch v-model="isListado" @change="setListado" class="md-primary switch">
            </md-switch>
            <md-icon class="switchicon md-xsmall-hide md-small-hide">view_list</md-icon><span class="switchlabel">Lista</span>
          </div>
          <div class="md-layout-item col md-medium-size-100 md-large-size-100 autocompletefield" v-if="!isPauta">
            <gmap-autocomplete class="autocomplete" @place_changed="setPlace" :value="search" :options="{
              componentRestrictions: {
                country: [
                  'mx',
                ],
              }
            }">
            </gmap-autocomplete>
            <md-icon class="buscar">explore</md-icon>
          </div>
          <div class="md-layout-item" v-if="!isPauta">
            <md-field>
              <label for="movies">Tipo lona</label>
              <md-select v-model="selectedTipo" @md-selected="setTipoSelected" name="tipo_lona" id="tipo_lona" md-dense
                multiple>
                <md-option :key="index" v-for="(opt, index) in arr_tipo_lona" :value="opt">
                  {{opt}}
                </md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item" v-if="!isPauta">
            <md-field>
              <label for="movies">Formato</label>
              <md-select v-model="selectedFormato" @md-selected="setFormatoSelected" name="formato" id="formato"
                md-dense multiple>
                <md-option :key="index" v-for="(opt, index) in arr_formato" :value="opt">
                  {{opt}}
                </md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-size-100 md-layout-item pauta" v-if="isPauta">
            <ul>
              <li :key="index" 
              v-for="(m, index) in filteredMarkersPauta" 
              @click="zoomClick(m)">
                <span class="nombre">
                  {{m .direccion_comercial}}
                </span>
                <div class="icon" @click.stop="removePautaClick(m)">
                  &#10006;
                  <md-tooltip md-direction="right" v-if="isAdmin==true">Borrar</md-tooltip>
                </div>
              </li>
            </ul>
          </div>
          <div class="md-size-100 md-layout-item"  v-if="markersPauta.length">
            <div class="alignright">
              <div class="url">
                https://sotmedia.com.mx/mapa/#/pauta/{{this.markersPauta.join(',')}}
              </div>
              <div class="copy" 
              v-clipboard:copy="path.concat('', markersPauta.join(','))" 
              v-clipboard:success="onCopy" 
              v-clipboard:error="onError"
              v-if="!isShareable">
                Copiar
                <md-icon class="copyicon">content_copy</md-icon>
              </div>
              <navigator-share
                v-bind:on-error="onError"
                v-bind:on-success="onSuccess"
                :url="path.concat('', markersPauta.join(','))"
                v-if="isShareable"
                title="Pauta"
                text="Pauta">
              </navigator-share>   
            </div>

          </div>
        </div>

      </md-card-content>
    </md-card>        <md-snackbar md-position="center" :md-duration=3000
         :md-active.sync="showSnackbar" md-persistent>
          Pauta copiada
        </md-snackbar>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import NavigatorShare from 'vue-navigator-share'
  Vue.use(
    VueClipboard,
    NavigatorShare,
  )
  export default {
    name: 'VueFilter',
    components: {
      NavigatorShare
    },
    props: {
      msg: String,
      infoDireccionComercial: String,
      infoFormato: String,
      infoTipoLona: String,
      centerLat: Number,
      centerLng: Number,
      parentSelectedTipo: Array,
      parentSelectedFormato: Array,
      total: Number,
      search: String,
      isList: Boolean,
      markersPauta: Array,
      filteredMarkersPauta: Array,
      isAdmin:Boolean,
    },
    data: () => ({
      isListado: true,
      isPauta: false,
      isShareable: false,
      tipo_lona: String,
      formato: String,
      place: null,
      arr_tipo_lona: ["FRONT", "MESH"],
      arr_formato: ["MURO", "TOTEM"],
      selectedTipo: [],
      selectedFormato: [],
      showSnackbar: false,
      path: "https://localhost:8080/#/pauta/",
      //path: "https://sotmedia.com.mx/mapa/#/pauta/",
    }),
    mounted: function () {
      this.selectedTipo = this.arr_tipo_lona
      this.selectedFormato = this.arr_formato
      this.setTipoSelected(this.arr_tipo_lona)
      this.setFormatoSelected(this.arr_formato)
      this.isShareable==navigator.share
    },
    methods: {
      ubicationClick: function (info) {
        this.$router.push("/ubicacion/" + info.id)

      },
      setPlace(place) {
        if (place.geometry) {
          this.search = "Buscando..."
          this.$emit('filterPlaceToParent', {
            centerLat: place.geometry.location.lat(),
            centerLng: place.geometry.location.lng(),
            search: ""
          })
        }
      },
      setTipoSelected(value) {
        this.$emit('filterTipoToParent', {
          tipo: value
        })
      },
      setFormatoSelected(value) {
        this.$emit('filterFormatoToParent', {
          formato: value
        })
      },
      setListado() {
        this.$emit('listadoToParent', {
          isList: this.isListado
        })
      },
      setPauta() {
        this.$emit('pautaToParent', {
          isPauta: this.isPauta
        })
      },
      onCopy: function () {
        this.showSnackbar=true
      },
      onSuccess: function () {
        console.log("Shared");
      },
      onError: function (e) {
        console.error('Failed:',e)
      },
      removePautaClick: function (m) {
        console.log(this.markersPauta.length);
        if (this.markersPauta.length == 1) {
          this.isPauta = false
        }
        this.$emit('removePautaToParent', {
          id: m.id
        })
      },
      zoomClick: function (info) {
        //console.log("info: ",info.lat, info.lng)
        //this.$router.push("/")
        this.$emit('zoomToParent', {
          zoom: 20,
          centerLat: info.lat,
          centerLng: info.lng,
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

  .icon {
    pointer-events: initial !important;
    ;
  }

  .pauta {
    ol {
      margin: 0;
      padding: 0;
    }

    li {
      display: list-item;
      text-align: left;
      transition-duration: 500ms;
      padding: 5px 5px 5px 10px;
      cursor: pointer;
      border-radius: 20px;

      &:hover {
        color: #444444;
        background-color: #d8d6d6;
      }

      .nombre {}

      .icon {
        float: right;
        cursor: pointer;
        pointer-events: all;
        padding: 0px 5px;
        border-radius: 30px;

        &:hover {
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

  .filtro {
    //height: 33vh;
    //*FILTRO
  }

  .autocomplete,
  .autocomplete:focus {
    outline: none;
    background-color: white;
    border: none;
    border-bottom: solid 1px grey;
    font-size: 16px!important;
    width: 100%;
    padding: 5px 0;
  }

  .autocompletefield {
    position: relative;
  }

  .buscar {
    position: absolute;
    right: 6px;
    top: 0;
    background-color: white;
  }

  .switchicon {
    transform: translateY(-7px);
  }

  .switchlabel {
    transform: translateY(-5px);
    display: inline-block;
    font-size: 9px!important;
    color: gray;
  }

  .switch {
    transform: translateX(10px);
    margin-top: 0;
  }

  .md-switch {
    width: auto;
    margin: 0 12px 0 -9px !important;
  }

  .botonpauta {
    background: #e1e3e4;
    border-radius: 45px;
    padding: 13px 16px;
    color: #777777;
    font-size: 11px!important;
    cursor: pointer;
    transition-duration: 500ms;

    &:hover {
      background: #c5c6c7;

    }
  }

  .alignright {
    font-size: 8px!important;
    text-align: center;
    display: inline-block;
    transition-duration: 500ms;
    border-radius: 20px;
    padding-left: 15px;
    margin-top: 10px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 9px;
    div{
      flex-grow: 1;
    }
    .url{
        word-break: break-all;
    }
  }

  .copy {
    display: inline-block;
    background: #ccd1d4;
    color: #3F4C56;
    padding: 5px 10px;
    border-radius: 20px;
    transition-duration: 500ms;
    margin-left: 10px;
    cursor: pointer;
    min-width: 80px;
    //position: absolute;
    //top: 0;
    //right: 0;

    &:hover {
      background: #919394;
      color: white;
    }

  }

  .copyicon {
    color: white;
  }


  @media only screen and (min-width: 600px) {
    .filtro {
      border-radius: 20px;
      //height: auto;
      //*FILTRO
    }
    .alignright {
    font-size: 8px!important;
    text-align: center;
    display: flex;
    transition-duration: 500ms;
    border-radius: 20px;
    padding-left: 15px;
    margin-top: 10px;
    background: #e8eaeb;
  }
  }
</style>