<template>
  <div class="sidebar">
    <div>
      <p>[Image here]</p>
    </div>
    <div>
       <Hamburger></Hamburger>
    </div>
    <div>
      <p>[Settings]</p>
    </div>
    <!-- Your sidebar content goes here -->
    <div class="sidebar-header">
      <h2>Sidebar</h2>
    </div>
    <div>
      <p> {{ window.width }}</p>
      <ul class="sidebar-menu">
        <li>
          <p>Tracks</p>
          <SideBarMenuItem :year="'All'" :type="'Tracks'"></SideBarMenuItem>
          <div v-if="uniqueYears && uniqueYears.length > 0">
            <div v-for="year in uniqueYears" :key="year">
              <SideBarMenuItem :year="year" :type="'Tracks'"></SideBarMenuItem>
            </div>
          </div>
        </li>
        <li>
          <p>Locations</p>
          <div>
            <label>Waterfalls</label>
            <input type="checkbox" value="Tracker" />
          </div>
          <div>
            <label>Peaks</label>
            <input type="checkbox" value="Tracker" />
          </div>
        </li>
        <li>
          <div>
            <p>Zones</p>
            <SideBarMenuItem :type="'Zones'" :data="extrudZones()" :name="'Extruded'"></SideBarMenuItem>
            <SideBarMenuItem :type="'Zones'" :data="getZonesVolume()" :name="'All'"></SideBarMenuItem>
          </div>
        </li>
        <li><button @click="toggleLayers">Change Rastermap</button></li>
      </ul>
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

import SideBarMenuItem from "./SideBarMenuItem.vue"
import Hamburger from "./Header/Hamburger.vue"

export default {
  name: 'Side-bar',
  components: {
    SideBarMenuItem,
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
