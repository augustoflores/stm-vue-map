<template>
  <div>
    Lista
  </div>
</template>
<script>
export default {
  name: 'ListComponent',
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

@media only screen and (min-width: 600px) {

}
</style>