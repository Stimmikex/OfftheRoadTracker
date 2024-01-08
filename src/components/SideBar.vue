<template>
  <div class="sidebar">
    <div class="hamburger-menu">
      <img src="../../public/icons/logo.svg"/>
    </div>
    <Hamburger></Hamburger>
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
    };
  },
  methods: {
    toggleLayers,
    toggleDisplay,
    sortTracks,
    getZonesVolume,
    extrudZones,
  },
  async mounted() {
      try {
        this.uniqueYears = await getUniqueYears();
      } catch (error) {
        console.error('Error fetching unique years:', error);
      }
  },
};
</script>
