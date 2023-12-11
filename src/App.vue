<template>
  <main class="app">
    <div id="cesium-container">
      <div class="cesium-container__sidebar">
        <SideBar />
      </div>
      <CesiumViewer @viewer-initialized="handleViewerInitialized" class="cesium-container__cesium"/>
      <div class="sidePop__button" @click="toggleLegend">
        <img src="../public/icons/tale.png">
      </div>
      <div class="sidePop" v-if="isLegendOpen">
        <TimelineContainer></TimelineContainer>
        <LegendContainer></LegendContainer>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
</style>

<script>
import CesiumViewer from "./components/CesiumViewer.vue";
import SideBar from "./components/SideBar.vue"
import TimelineContainer from "./components/Timeline/TimelineContainer.vue";
import LegendContainer from './components/Legend/LegendContainer.vue';

if(import.meta.hot) {
  import.meta.hot.on("vite;beforeUpdate", (e) => {
    const updatePaths = e.updates.map((update) => update.path);
    if (updatePaths.includes("/src/App.vue")) location.reload();
  })
}

export default {
  name: "App",
  data() {
    return {
      isLegendOpen: false,
      default_map_setup: false,
    };
  },
  map_functions: null,
  components: {
    CesiumViewer,
    SideBar,
    TimelineContainer,
    LegendContainer,
  },
  methods: {
    handleViewerInitialized(viewer) {
      window.cesiumViewer = viewer;
    },
    toggleLegend() {
        this.isLegendOpen = !this.isLegendOpen;
      },
  },
};
</script>

<style lang="scss">
</style>