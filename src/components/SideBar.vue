<template>
    <div class="sidebar">
      <!-- Your sidebar content goes here -->
      <div class="sidebar-header">
        <h2>Sidebar</h2>
      </div>
      <ul class="sidebar-menu">
        <ul class="sidebar-menu">
          <p>Tracks</p>
          <li>
            <lable>All</lable>
            <input type="checkbox" value="Tracker" @click="toggleDisplay(sortTracks(), 'Tracks')"/>
          </li>
          <li>
            <lable>2021</lable>
            <input type="checkbox" value="Tracker" />
          </li>
          <li>
            <lable>2022</lable>
            <input type="checkbox" value="Tracker" />
          </li>
          <li>
            <lable>2023</lable>
            <input type="checkbox" value="Tracker" />
          </li>
        </ul>
        <li>
          <lable>Waterfalls</lable>
          <input type="checkbox" value="Tracker" />
        </li>
        <li>
          <lable>Peaks</lable>
          <input type="checkbox" value="Tracker" />
        </li>
      </ul>
      <ul class="sidebar-menu">
        <p>Zones</p>
        <li>
          <lable>All</lable>
          <input type="checkbox" value="Tracker" @click="toggleDisplay(getZonesVolume(), 'Zones')"/>
        </li>
        <li>
          <lable>F208</lable>
          <input type="checkbox" value="Tracker" @click="toggleDisplay(extrudZones(), 'Zones')"/>
        </li>
        <li>
          <lable>F225</lable>
          <input type="checkbox" value="Tracker" />
        </li>
        <li>
          <lable>Other</lable>
          <input type="checkbox" value="Tracker" />
        </li>
      </ul>
      <ul class="sidebar-menu">
        <li><button @click="toggleLayers">Change Rastermap</button></li>
      </ul>
    </div>
  </template>
  
  <style scoped>
  .sidebar {
    height: 100%;
    background-color: #333;
    color: #fff;
    padding: 20px;
  }
  
  .sidebar-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .sidebar-menu {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar-menu li {
    margin-bottom: 10px;
  }
  
  .sidebar-menu a {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
  }
  
  .sidebar-menu a:hover {
    text-decoration: underline;
  }
  </style>
  
  <script>
  import { toggleLayers } from '../layers.js';
  import { toggleDisplay } from '../scripts/sidebarfunctions.js';
  import { sortTracks } from '../tracks.js'
  import { getZonesVolume, extrudZones } from '../zones.js'

  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Sidebar',
    methods: {
        toggleLayers,
        toggleDisplay,
        sortTracks,
        getZonesVolume,
        extrudZones,
    },
  };
  </script>