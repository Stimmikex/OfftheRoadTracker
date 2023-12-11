<template>
    <div class="hamburger-menu">
      <div class="hamburger" @click="toggleMenu">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <div v-if="isMenuOpen" class="sidebar-container">
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
            <SideBarMenuItem :type="'Points'" :data="sortPointsOfIntrest('peak')" :name="'Peaks'"></SideBarMenuItem>
            <div>
              <label>Waterfalls</label>
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
  