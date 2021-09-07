<template>
  <div id="lista" v-if="!expirado">
    <div class="md-layout md-gutter">
      <div
        class="item md-layout-item md-layout  md-gutter md-xsmall-size-100 md-small-size-100 md-medium-size-100 md-large-size-100"
        :key="index" v-for="(m, index) in markers" :position="{lat:Number(m.map_ubication.lat), lng:Number(m.map_ubication.lng)}"
        @click="ubicationClick(m)">
        <div class="md-layout-item md-medium-size-100 md-large-size-100"
         v-if="index==0 || m.ciudad!= markers[(index - 1)].ciudad"
        >
          <h3 >
            {{m.ciudad.toUpperCase()}}
          </h3>
        </div>
        <div class="md-layout-item foto md-medium-size-30 md-large-size-50">
          <img :src="getImgUrl(m.img)" v-if="m.img">
          <img src="https://sotmedia.com.mx/ubications-images/na.jpg" v-if="!m.img"  >
        </div>
        <div class="md-layout-item md-medium-size-70 md-medium-large-50">
          <b class="ubicacion">{{m .direccion_comercial}}</b><br>
          <div class="direccion">
            {{m .ciudad}},
            {{m .colonia_comercial}},
            {{m .delegacion}}<br>
            <span class="small"> ({{m.map_ubication.lat}}, {{m.map_ubication.lng}})</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import underscore from 'vue-underscore';
  Vue.use(underscore);

  export default {
    name: 'VueList',
    props: {
      markers: Array,
      expirado: Boolean
    },
    data: () => ({
      currentUbication: {},
      sortedMarkers: []
    }),
    mounted: function () {
      this.sortedMarkers = this.markers;
    },
    methods: {
      ubicationClick: function (info) {
        console.log(info);
        this.$emit('zoomToParent', {
          lat: info.lat,
          lng: info.lng,
        })
      },
      getImgUrl:function(img) {
        return 'https://sotmedia.com.mx/ubications-images/' + img
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #lista {
    position: absolute;
    top: 0;
    left: 0;
    padding: 55px 20px 36vh 20px;
    background-color: rgba($color: #fff, $alpha: .8);
    height: 100%;
    overflow-y: scroll;
    width: 100%;
  }

  .item {
    padding: 30px 15px;
    text-align: left;
  }

  .ubicacion {
    font-size: 12px!important;
    line-height: 10px!important;
  }

  .direccion {
    font-size: 10px!important;
    display: inline;
    line-height: 10px!important;
  }

  .foto {
  }

  #lista {}
  .small{
    font-size: 9px!important;
    color: gray;
  }
  h3{
    color: #D95B27!important;
    border-bottom: solid;
    padding: 0 0 8px 0;
    margin: 10px -16px;
  }

  @media only screen and (min-width: 600px) {
    #lista {
      width: 40%;
    }
  }

  @media only screen and (min-width: 1000px) {
    #lista {
      width: 30%;
    }
  }
</style>