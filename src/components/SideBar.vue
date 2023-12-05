<template>
  <div class="sidebar">
    <div class="hamburger-menu">
      <img src="../../public/icons/logo.svg"/>
    </div>
    <div>
       <Hamburger></Hamburger>
    </div>
    <div class="hamburger-menu">
      <p>[Settings]</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import { toggleLayers } from '../layers.js';
import { toggleDisplay } from '../scripts/sidebarfunctions.js';
import { sortTracks, getUniqueYears } from '../tracks.js'
import { getZonesVolume, extrudZones } from '../zones.js'

import Hamburger from "./Header/Hamburger.vue"

export default {
  name: 'Side-bar',
  components: {
    Hamburger,
  },
  data() {
    return {
      uniqueYears: [],
      window: {
        width: 0
      }
    };
  },
  methods: {
    toggleLayers,
    toggleDisplay,
    sortTracks,
    getZonesVolume,
    extrudZones,
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      console.log(this.window.width)
    }
  },
  async mounted() {
      try {
        this.uniqueYears = await getUniqueYears();
        console.log(this.uniqueYears)
      } catch (error) {
        console.error('Error fetching unique years:', error);
      }
  },
  created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
  },
};
</script>
