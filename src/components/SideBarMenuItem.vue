<template>
    <li v-if="type == 'Tracks'">
      <label>{{ year }}</label>
      <input type="checkbox" value="Tracker" @click="toggleDisplay(sortTracks(year), 'Tracks', year)"/>
    </li>
    <li v-else-if="type == 'Zones'">
      <label>{{ name }}</label>
      <input type="checkbox" value="Tracker" @click="toggleDisplay(data, 'Zones')"/>
    </li>
    <li v-else-if="type == 'Points'">
      {{ console.log(isChecked) }}
      <label>{{ name }}</label>
      <input type="checkbox" value="Tracker" :checked="isChecked" @click="toggleDisplay(data, type, subtype)"/>
    </li>
</template>
  
  <style lang="scss" scoped>
  </style>
  
  <script>
  import { toggleLayers } from '../layers.js';
  import { toggleDisplay, checkIfDataSource } from '../scripts/sidebarfunctions.js';
  import { sortTracks } from '../tracks.js'
  import { getZonesVolume, extrudZones } from '../zones.js'
  
  export default {
    name: 'Side-bar',
    props: ['year', 'type', 'data', 'name', 'subtype'],
    data() {
      return {
        isChecked: false,
      };
    },
    methods: {
      toggleLayers,
      toggleDisplay,
      checkIfDataSource,
      async initialize() {
        this.isChecked = await this.checkIfDataSource(this.type, this.subtype);
      },
      sortTracks,
      getZonesVolume,
      extrudZones,
    },
    async mounted() {
        this.year;
        this.type;
        this.name;
        this.data;
        this.subtype;
        await this.initialize();
    }
  };
  </script>
  