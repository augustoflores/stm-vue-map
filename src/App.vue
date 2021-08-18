<template>
    <div id="app">
        <router-view
          v-on:fullscreenToParent="toggle"
        />
    </div>
</template>
<script>
  import Vue from 'vue'
  import fullscreen from 'vue-fullscreen'
  Vue.use(fullscreen)
  export default {
    name: 'App',
    components: {
    },
    data: function () {
      return {
        fullscreen: false,
      }
    },
    methods: {
      toggle() {
        this.$fullscreen.toggle(document.body,{fullscreenClass:"fullscreen", wrap: false})
      },
      fullscreenChange(fullscreen) {
        this.fullscreen = fullscreen
      }
    }
  }
</script>
<style lang="scss">
*{
  font-size: 14px!important;
  line-height: 1.3!important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.md-overlay {
    z-index: 10!important;
}
</style>