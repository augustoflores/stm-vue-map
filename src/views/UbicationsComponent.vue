<template>
  <!--
    <div class="md-layout md-gutter md-alignment-center ubications">
    <div class="md-layout-item col md-size-20  md-elevation-4">
          <VueFilter />
    </div>
    <div class="md-layout-item col md-size-80">
          <VueMap />
    </div>
  </div>
  -->
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Ubicaciones</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Filtros</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <VueFilter />
      </md-app-drawer>

      <md-app-content>
          <VueMap />
      </md-app-content>
    </md-app>
  </div>

</template>

<script>
// @ is an alias to /src
import VueMap from '@/components/VueMap.vue'
import VueFilter from '@/components/VueFilter.vue'

export default {
  name: 'UbicationsComponent',
  components: {
    VueMap,
    VueFilter
  },
  data: () => ({
      menuVisible: true
    }),
  methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      }
    }
}
</script>

<style lang="scss" scoped>
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>