<template>
  <main class="app">
    <div id="cesium-container">
      <CesiumViewer @viewer-initialized="handleViewerInitialized"/>
    </div>
    <div>
      <SideBar />
    </div>
  </main>
</template>

<script>
import CesiumViewer from "./components/CesiumViewer.vue";
import SideBar from "./components/SideBar.vue"

export default {
  name: "App",
  components: {
    CesiumViewer,
    SideBar,
  },
  methods: {
    handleViewerInitialized(viewer) {
      window.cesiumViewer = viewer;
    },
  },
};
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-rows: auto;
  height: 100vh;
  grid-template-columns: 90% 10%;
}
</style>