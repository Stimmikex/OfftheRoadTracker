<template>
    <div class="sidebar">
      <!-- Your sidebar content goes here -->
      <div class="sidebar-header">
        <h2>Sidebar</h2>
      </div>
      <ul class="sidebar-menu">
        <li>
          <lable>Tracks</lable>
          <input type="checkbox" value="Tracker" @click="toggleDisplay(sortTracks(), 'tracks')"/>
        </li>
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

  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Sidebar',
    methods: {
        toggleLayers,
        toggleDisplay,
        sortTracks,
    },
    mounted() {
      if (window.viewer) {
        // Cesium viewer is available, you can use it here
        const viewer = window.viewer;
        console.log(viewer);
      } else {
        console.error('Cesium viewer is not available.');
      }
    },
  };
  </script>