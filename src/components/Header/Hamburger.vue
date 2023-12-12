<template>
    <div class="hamburger-menu">
      <div class="hamburger" @click="toggleMenu">
        <div :class="{ 'bar': true, 'cross-bar1': isMenuOpen }"></div>
        <div :class="{ 'bar': true, 'cross-bar2': isMenuOpen }"></div>
        <div :class="{ 'bar': true, 'cross-bar3': isMenuOpen }"></div>
      </div>
      <div v-if="isMenuOpen" class="sidebar-container">
        <ul class="sidebar-menu">
          <div>
            <h2>Tracks</h2>
            <div v-if="uniqueYears && uniqueYears.length > 0">
              <SideBarMenuItem :year="'All'" :data="sortTracks('All')" :name="'All'" :type="'Tracks'"></SideBarMenuItem>
              <div v-for="year in uniqueYears" :key="year">
                <SideBarMenuItem :type="'Tracks'" :data="sortTracks(year)" :name="year" :subtype="year"></SideBarMenuItem>
              </div>
            </div>
          </div>
          <div>
            <h2>Locations</h2>
            <SideBarMenuItem :type="'Points'" :data="sortPointsOfIntrest('natural', 'peak')" :name="'Peaks'" :subtype="'peak'"></SideBarMenuItem>
            <SideBarMenuItem :type="'Points'" :data="sortPointsOfIntrest('waterway', 'waterfall')" :name="'Waterfall'" :subtype="'waterfall'"></SideBarMenuItem>
          </div>
          <div>
            <div>
              <h2>Zones</h2>
              <SideBarMenuItem :type="'Zones'" :data="extrudZones()" :name="'Extruded'"></SideBarMenuItem>
              <SideBarMenuItem :type="'Zones'" :data="getZonesVolume()" :name="'All'"></SideBarMenuItem>
            </div>
          </div>
          <li class="rastarMap"><button @click="toggleLayers">Change Rastermap</button></li>
        </ul>
      </div>
    </div>
  </template>
  
  <style lang="scss" scoped>
  </style>
  
  <script>
  import { toggleLayers } from '../../layers.js';
  import { toggleDisplay } from '../../scripts/sidebarfunctions.js';
  import { sortTracks, getUniqueYears } from '../../tracks.js'
  import { getZonesVolume, extrudZones } from '../../zones.js'
  import { sortPointsOfIntrest } from '../../points.js'
  
  import SideBarMenuItem from "../SideBarMenuItem.vue"
  
  export default {
    name: 'Side-bar',
    components: {
      SideBarMenuItem,
    },
    data() {
      return {
        isMenuOpen: false,
        uniqueYears: [],
      };
    },
    methods: {
      toggleLayers,
      toggleDisplay,
      sortTracks,
      getZonesVolume,
      extrudZones,
      sortPointsOfIntrest,
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
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
  