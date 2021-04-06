<template>
  <div id="lista">
    <router-view name="ficha" :authenticated="authenticated" :markers="markers" :marker="marker" v-on:zoomToParent="onZoomEvent"  v-on:tokenToParent="onTokenToParent"/>
    <ul class="lista">
       <li :key="index" v-for="(m, index) in markers" :position="{lat:Number(m.lat), lng:Number(m.lng)}"
           @click="ubicationClick(m)">
            <b>{{m .direccion_comercial}}</b><br>
            <b>Edo.:</b> {{m .ciudad}} <br class=" md-xsmall-hide md-small-show">
            <b>Col.:</b> {{m .colonia_comercial}} <br class="">
            <b>Del. o Mpo.:</b> {{m .delegacion}}
        </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'VueList',
  props: {
    markers: Array
  },
  data:() => ({
  }),
  mounted: function() {
    
  },
  methods: {
    ubicationClick: function (info) {
        this.$router.push("/ubicacion/" + info.id)

      },
   
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#lista{
  position: absolute;
  top:0;
  right: 0;
  padding: 20px 120px 20px 20px;
  background-color:rgba($color: #fff, $alpha: .8);
  height: 100%;
  overflow-y: scroll;
}
@media only screen and (min-width: 600px) {

}
</style>