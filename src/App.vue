<template>
  <main class="app">
    <div id="cesium-container">
      <div class="cesium-container__sidebar">
        <SideBar />
      </div>
      <CesiumViewer @viewer-initialized="handleViewerInitialized" class="cesium-container__cesium"/>
      <div class="sidePop__legend" @click="toggleLegend">
        <label>Legend</label>
        <img src="../public/icons/tale.png">
      </div>
      <div class="sidePop__timeline" @click="toggleTimeline">
        <label>TimeLine</label>
        <img src="../public/icons/timeline.png">
      </div>
      <div class="sidePop" v-if="isLegendOpen">
        <LegendContainer></LegendContainer>
      </div>
      <div class="sidePop" v-if="isTimelineOpen">
        <TimelineContainer></TimelineContainer>
      </div>
      <ImportContainer></ImportContainer>
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
import ImportContainer from './components/Imprint.vue';

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
      isTimelineOpen: false,
      default_map_setup: false,
    };
  },
  map_functions: null,
  components: {
    CesiumViewer,
    SideBar,
    TimelineContainer,
    LegendContainer,
    ImportContainer,
  },
  methods: {
    handleViewerInitialized(viewer) {
      window.cesiumViewer = viewer;
    },
    toggleTimeline() {
        this.isLegendOpen = false;
        this.isTimelineOpen = !this.isTimelineOpen;
      },
    toggleLegend() {
        this.isTimelineOpen = false;
        this.isLegendOpen = !this.isLegendOpen;
      },
  },
};
</script>

<style lang="scss">
</style>