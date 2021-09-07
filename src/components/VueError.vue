<template>
  <md-dialog :md-active="showDialog">
    <md-toolbar class="fondo0">
      <h3 class="md-title" style="flex: 1">
        <md-icon class="icon">login</md-icon>Acceso
      </h3>
    </md-toolbar>
    <form novalidate @submit.prevent="validateUser">
      <div class="md-layoutb md-gutter">
        <div class="md-layoutb-item md-size-100">
          <md-subheader>
            <md-icon class="icon">lock</md-icon>Pauta expirada<br>
            Solicite una nueva pauta
          </md-subheader>
        </div>

      </div>
       
    </form>
    <md-dialog-actions class="fondo2">
      <a href="/ingresar/olvide-contrasena/" class="link" v-if="!authenticated">
        Olvide Contraseña <md-icon class="icon">person_search</md-icon>
      </a>
      <a href="/registrate" class="link" v-if="!authenticated">
        Registrate <md-icon class="icon">person_add</md-icon>
      </a>
    </md-dialog-actions>
  </md-dialog>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import {
    validationMixin
  } from 'vuelidate'
  import {
    required,
    email,
  } from 'vuelidate/lib/validators'

  Vue.use(VueAxios, axios)

  export default {
    name: 'VueError',
    mixins: [validationMixin],
    components: {

    },
    props: {
      zoom: Number,
      marker: String,
      markers: Array,
      authenticated: Object,
      expirado:Boolean
    },
    data: () => ({
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
      lat: 0,
      lng: 0,
      form: {
        username: '',
        password: '',
      },
      loginerror: false,
      loginwait: false
    }),
    mounted() {
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
      closeDialog: function () {
        if(Vue.localStorage.get('originUrl')){
            this.$router.push(Vue.localStorage.get('originUrl'))
        }else{
          this.$router.push("/")
        }
      },

      doLogin() {
        this.loginerror = false
        this.loginwait = true
        axios.post('https://sotmedia.com.mx/wp-json/jwt-auth/v1/token', {
          username: this.form.username,
          password: this.form.password
        }).then(response => {
          this.$emit("tokenToParent", response.data);
          this.closeDialog();
        }).catch((error) => {
          console.warn(error)
          this.loginerror = true
          this.loginwait = false
        });
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

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  form {
    padding: 1em;
  }

  .accesdialog {
    max-width: 500px;
  }

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
    .aligncenter {
    text-align: center;
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
    background: #1FAAD1!important;
    background-color: #1FAAD1!important;

    h3,
    i {
      color: white !important;
    }
  }

  .fondo1 {
    background: #1faad1;
   /* background: -moz-linear-gradient(358deg, rgba(54, 94, 104, 1) 10%, rgba(255, 255, 255, 0) 10%), -moz-linear-gradient(317deg, rgba(31, 170, 209, 1) 25%, rgba(255, 255, 255, 0) 25%), -moz-linear-gradient(65deg, rgba(247, 93, 41, 1) 29%, rgba(255, 255, 255, 0) 29%);
    background: -webkit-linear-gradient(358deg, rgba(54, 94, 104, 1) 10%, rgba(255, 255, 255, 0) 10%), -webkit-linear-gradient(317deg, rgba(31, 170, 209, 1) 25%, rgba(255, 255, 255, 0) 25%), -webkit-linear-gradient(65deg, rgba(247, 93, 41, 1) 29%, rgba(255, 255, 255, 0) 29%);
    background: linear-gradient(358deg, rgba(54, 94, 104, 1) 10%, rgba(255, 255, 255, 0) 10%), linear-gradient(317deg, rgba(31, 170, 209, 1) 25%, rgba(255, 255, 255, 0) 25%), linear-gradient(65deg, rgba(247, 93, 41, 1) 29%, rgba(255, 255, 255, 0) 29%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#365e68", endColorstr="#ffffff", GradientType=1), progid:DXImageTransform.Microsoft.gradient(startColorstr="#1faad1", endColorstr="#ffffff", GradientType=1), progid:DXImageTransform.Microsoft.gradient(startColorstr="#f75d29", endColorstr="#ffffff", GradientType=1);
  */
  }

  .fondo1b {
    background: #1faad1;
    /*background: -moz-linear-gradient(2deg, rgba(54, 94, 104, 1) 10%, rgba(255, 255, 255, 0) 10%), -moz-linear-gradient(110deg, rgba(31, 170, 209, 1) 29%, rgba(255, 255, 255, 0) 29%), -moz-linear-gradient(321deg, rgba(247, 93, 41, 1) 29%, rgba(255, 255, 255, 0) 29%);
    background: -webkit-linear-gradient(2deg, rgba(54, 94, 104, 1) 10%, rgba(255, 255, 255, 0) 10%), -webkit-linear-gradient(110deg, rgba(31, 170, 209, 1) 29%, rgba(255, 255, 255, 0) 29%), -webkit-linear-gradient(321deg, rgba(247, 93, 41, 1) 29%, rgba(255, 255, 255, 0) 29%);
    background: linear-gradient(2deg, rgba(54, 94, 104, 1) 10%, rgba(255, 255, 255, 0) 10%), linear-gradient(110deg, rgba(31, 170, 209, 1) 29%, rgba(255, 255, 255, 0) 29%), linear-gradient(321deg, rgba(247, 93, 41, 1) 29%, rgba(255, 255, 255, 0) 29%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#365e68", endColorstr="#ffffff", GradientType=1), progid:DXImageTransform.Microsoft.gradient(startColorstr="#1faad1", endColorstr="#ffffff", GradientType=1), progid:DXImageTransform.Microsoft.gradient(startColorstr="#f75d29", endColorstr="#ffffff", GradientType=1);
    */
  }

  .fondo2 {
    background: #365E68;

    a,
    i {
      color: white !important;
    }

    //background: #F75D29;
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
      font-size: 14px!important;
    }

  }
</style>