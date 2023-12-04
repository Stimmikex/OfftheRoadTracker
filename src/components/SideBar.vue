<template>
  <div class="sidebar">
    <!-- Your sidebar content goes here -->
    <div class="sidebar-header">
      <h2>Sidebar</h2>
    </div>
    <ul class="sidebar-menu">
      <ul class="sidebar-menu">
        <p>Tracks</p>
        <SideBarMenuItem :year="All"></SideBarMenuItem>
        <div v-if="uniqueYears && uniqueYears.length > 0">
          <div v-for="year in uniqueYears" :key="year">
            <SideBarMenuItem :year="year"></SideBarMenuItem>
          </div>
        </div>
      </ul>
      <li>
        <label>Waterfalls</label>
        <input type="checkbox" value="Tracker" />
      </li>
      <li>
        <label>Peaks</label>
        <input type="checkbox" value="Tracker" />
      </li>
    </ul>
    <ul class="sidebar-menu">
      <p>Zones</p>
      <li>
        <label>ExtrudZones</label>
        <input type="checkbox" value="Tracker" @click="toggleDisplay(extrudZones(), 'Zones')"/>
      </li>
      <li>
        <label>All</label>
        <input type="checkbox" value="Tracker" @click="toggleDisplay(getZonesVolume(), 'Zones')"/>
      </li>
      <li>
        <label>F208</label>
        <input type="checkbox" value="Tracker"/>
      </li>
      <li>
        <label>F225</label>
        <input type="checkbox" value="Tracker" />
      </li>
      <li>
        <label>Other</label>
        <input type="checkbox" value="Tracker" />
      </li>
    </ul>
    <ul class="sidebar-menu">
      <li><button @click="toggleLayers">Change Rastermap</button></li>
    </ul>
    <div v-if="uniqueYears && uniqueYears.length > 0">
      <div v-for="year in uniqueYears" :key="year">
        <SideBarMenuItem :year="year"></SideBarMenuItem>
      </div>
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

export default {
  name: 'Side-bar',
  components: {
    SideBarMenuItem,
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
        console.log(this.uniqueYears)
      } catch (error) {
        console.error('Error fetching unique years:', error);
      }
  },
};
</script>
