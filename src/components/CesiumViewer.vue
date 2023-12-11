<template>
  <div class="cesium-scene">
    <div id="cesium" />
  </div>
</template>

<script>
import { Viewer, Ion, Terrain } from "cesium";
import "cesium/Source/Widgets/widgets.css";

const _cesium = {
  viewer: null
};

/*global viewer */

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMzA1N2Q5Yy1lNTFjLTQyZjAtOGZlOC1iNmFiMGYwNzkxYzciLCJpZCI6MTcxMzA5LCJpYXQiOjE2OTcwNjI5MDl9.qTgjMH_52CL-7MkIaEoT8OmFbTUeXezLzor_IfO_-rQ";

export default {
  data() {
    return {
      viewerObserver: null,
      viewerWidth: 0,
      viewerHeight: 0,
      default_map_setup: false,
    };
  },
  map_functions: null,
  computed: {
    _cesium() {
      return _cesium;
    }
  },
  mounted() {
    if (_cesium.viewer === null) {
      this.createViewer();
      this.observeSize();
      this.loadScene();
    }
  },
  methods: {
    createViewer() {
      _cesium.viewer = new Viewer("cesium", {
        terrain: Terrain.fromWorldTerrain(),
        baseLayerPicker: false,
        navigationHelpButton: false,
        homeButton: false,
        sceneModePicker: false,
        geocoder: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        maximumRenderTimeChange : Infinity,
        requestRenderMode : true,
        targetFrameRate: 60,
      });

      if (window) {
        window.viewer = _cesium.viewer;
      }
    },
    observeSize() {
      this.viewerObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { width, height } = entry.contentRect;
          this.viewerWidth = width;
          this.viewerWidth = height;
          this.$nextTick(() => this.onResize());
        });
      });
      this.viewerObserver.observe(this.$el);
    },
    onResize() {
      if (_cesium.viewer) {
        _cesium.viewer.resize();
      }
    },
    async loadScene() {
      console.log(`START: loadScene`);
      try {
        viewer.creditDisplay.container.style.display = "none";
        viewer.scene.debugShowFramesPerSecond = true;
        console.log(viewer)
        await import(/* @vite-ignore */ `../dataFormater.js`);
        await import(/* @vite-ignore */ `../layers.js`);
      } catch (error) {
        console.log(`ERROR: loadScene`, error);
      } finally {
        console.log(`END: loadScene`);
      }
    }
  }
};
</script>

<style scoped>
  #cesium-container {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .cesium-scene {
    height: 100%;
  }
  #cesium {
    height: 100%;
  }

</style>
