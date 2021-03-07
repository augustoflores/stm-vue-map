<template>
    <div class="lista">
      Aca la Lista
       <div :key="index" v-for="(m, index) in markers" :position="{lat:Number(m.lat), lng:Number(m.lng)}"
           @click="ubicationClick(m)">
            {{m.direccion_comercial}}
        </div>
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
   
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@media only screen and (min-width: 600px) {

}
</style>