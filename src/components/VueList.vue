<template>
  <div id="lista">
    <div class="md-layout md-gutter">
      <div class="item md-layout-item md-layout  md-gutter md-xsmall-size-100 md-small-size-100 md-medium-size-50 md-large-size-50" :key="index" v-for="(m, index) in markers"
        :position="{lat:Number(m.lat), lng:Number(m.lng)}" @click="ubicationClick(m)">
        <div class="md-layout-item foto md-medium-size-30 md-large-size-20">

        </div>
        <div class="md-layout-item md-medium-size-70 md-medium-large-80">
          <b class="ubicacion">{{m .direccion_comercial}}</b><br>
          <div class="direccion">
            {{m .ciudad}},
            {{m .colonia_comercial}},
            {{m .delegacion}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'VueList',
    props: {
      markers: Array
    },
    data: () => ({}),
    mounted: function () {

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
  #lista {
    position: absolute;
    top: 0;
    right: 0;
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
  .ubicacion{
    font-size: 12px;
    line-height: 10px;
  }
  .direccion{
    font-size: 10px;
    display: inline;
    line-height: 10px;
  }
  .foto{
    background: grey;
  }
  #lista{
  }
  @media only screen and (min-width: 600px) {
      #lista {
        width: 50%;
      }
  }
  @media only screen and (min-width: 1000px) {
      #lista {
        width: 60%;
      }
  }

</style>