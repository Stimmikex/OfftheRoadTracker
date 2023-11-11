<template>
  <div class="cesium-scene">
    <div id="cesium" />
  </div>
</template>

<script>
  import { Viewer, Ion } from "cesium"
  import "cesium/Source/Widgets/widgets.css";

  const viewer = new Viewer("app");
  viewer.scene.debugShowFramesPerSecond = true;
  const _cesium = {
    viewer: null
  };

  Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMzA1N2Q5Yy1lNTFjLTQyZjAtOGZlOC1iNmFiMGYwNzkxYzciLCJpZCI6MTcxMzA5LCJpYXQiOjE2OTcwNjI5MDl9.qTgjMH_52CL-7MkIaEoT8OmFbTUeXezLzor_IfO_-rQ";

  export default {
    data() {
      return {
        viewerObserver: null,
        viewerWidth: 0,
        viewerHeight: 0
      };
    },
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
        homeButton: false,
        navigationHelpButton: false,
        sceneModePicker: false,
        geocoder: false,
      });


      if (window) {
        window.viewer = _cesium.viewer;
      }

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
        
        // try {
        //   await import(/* @vite-ignore */ `../cesium.js`);
        // } catch (error) {
        //   console.log(`ERROR: loadScene`, error);
        // } finally {
        //   console.log(`END: loadScene`);
        // }
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#cesium-container {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>