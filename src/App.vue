<template>
  <main class="app">
    <div>
      <SideBar />
    </div>
    <div id="cesium-container">
      <CesiumViewer />
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
  grid-template-columns: 10% 90%;
}
</style>