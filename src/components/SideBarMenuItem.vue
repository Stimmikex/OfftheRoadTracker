<template>
    <li v-if="type == 'Tracks'">
      <label>{{ year }}</label>
      <input type="checkbox" value="Tracker" @click="toggleDisplay(sortTracks(year), 'Tracks', year)"/>
    </li>
    <li v-else-if="type == 'Zones'">
      <label>{{ name }}</label>
      <input type="checkbox" value="Tracker" @click="toggleDisplay(data, 'Zones')"/>
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
    props: ['year', 'type', 'data', 'name'],
    methods: {
      toggleLayers,
      toggleDisplay,
      sortTracks,
      getZonesVolume,
      extrudZones,
    },
    mounted() {
        this.year;
        this.type;
        this.name;
        this.data;
    }
  };
  </script>
  