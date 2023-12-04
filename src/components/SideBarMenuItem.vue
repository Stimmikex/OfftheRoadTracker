<template>
    <li>
        <label>{{ year }}</label>
        <input type="checkbox" value="Tracker" @click="toggleDisplay(sortTracks(year), 'Tracks', year)"/>
    </li>
</template>
  
  <style lang="scss" scoped>
  </style>
  
  <script>
  import { toggleLayers } from '../layers.js';
  import { toggleDisplay } from '../scripts/sidebarfunctions.js';
  import { sortTracks } from '../tracks.js'
  import { getZonesVolume, extrudZones } from '../zones.js'
  
  export default {
    name: 'Side-bar',
    props: ['year'],
    data() {
      return {
        countResult: null,
      };
    },
    methods: {
      toggleLayers,
      toggleDisplay,
      sortTracks,
      getZonesVolume,
      extrudZones,
    },
    mounted() {
        console.log('Year prop in mounted hook:', this.year);
    }
  };
  </script>
  