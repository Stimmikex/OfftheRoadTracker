<template>
  <main class="app">
    <div id="cesium-container">
      <div class="cesium-container__sidebar">
        <SideBar />
      </div>
      <CesiumViewer @viewer-initialized="handleViewerInitialized" class="cesium-container__cesium"/>
      <TimelineContainer></TimelineContainer>
    </div>
  </main>
</template>

<script>
import CesiumViewer from "./components/CesiumViewer.vue";
import SideBar from "./components/SideBar.vue"
import TimelineContainer from "./components/Timeline/TimelineContainer.vue";

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
      default_map_setup: false,
    };
  },
  map_functions: null,
  components: {
    CesiumViewer,
    SideBar,
    TimelineContainer,
  },
  methods: {
    handleViewerInitialized(viewer) {
      window.cesiumViewer = viewer;
    },
  },
};
</script>

<style lang="scss">
</style>