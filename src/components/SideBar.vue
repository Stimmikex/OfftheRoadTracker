<template>
    <div class="sidebar">
      <!-- Your sidebar content goes here -->
      <div class="sidebar-header">
        <h2>Sidebar</h2>
      </div>
      <ul class="sidebar-menu">
        <li><a href="#">Peaks</a></li>
        <li><a href="#">Waterfalls</a></li>
        <li><a href="#">Different roads</a></li>
      </ul>
      <ul>
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
  import { changeLayers, toggleLayers, removeLayers } from '../layers.js' 

  export default {
    name: 'Sidebar',
    methods: {
        changeLayers,
        toggleLayers,
        removeLayers,
    }
  };
  </script>