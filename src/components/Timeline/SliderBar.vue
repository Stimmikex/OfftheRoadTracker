<template>
  <div class="slider-container">
    <input
      type="range"
      v-model="selectedIndex"
      :min="0"
      :max="values.length - 1"
      :step="1"
      class="slider"
    />
    <!-- {{ console.log(selectedValue) }} -->
    <div class="selected-value">{{ selectedValue }}</div>
    <button @click="play">Play</button>
  </div>
</template>

<script>
import { getTracksByDate } from '../../tracks.js'
import { extrudZonesByDate } from '../../zones.js'
import { changeDisplay } from '../../scripts/sidebarfunctions'

export default {
  props: {
    values: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedIndex: 0,
      isPlaying: false,
    };
  },
  computed: {
    getTracksByDate,
    extrudZonesByDate,
    selectedValue() {
      return this.values[this.selectedIndex];
    },
  },
  watch: {
    async selectedIndex(newValue) {
      this.$emit('input', this.values[newValue]);
      // console.log(await getTracksByDate(this.values[newValue]))
      // console.log(await extrudZonesByDate(getTracksByDate(this.values[newValue])));
      await changeDisplay(extrudZonesByDate(getTracksByDate(this.values[newValue])), 'Zones')
    },
    isPlaying(newValue) {
      if (newValue) {
        this.playSlider();
      }
    },
  },
  methods: {
    play() {
      this.isPlaying = true;
    },
    playSlider() {
      const lastIndex = this.values.length - 1;
      let currentIndex = this.selectedIndex;
      const interval = setInterval(() => {
        currentIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
        this.selectedIndex = currentIndex;
        if (!this.isPlaying) {
          clearInterval(interval);
        }
      }, 3000); // Adjust the interval as needed (e.g., 1000 milliseconds = 1 second)
    },
  },
};
</script>

<style>
.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  width: 20em;
  padding: 1em;
  position: absolute;
  bottom: 0;
  right: 0;
  justify-content: flex-end;
  background: cadetblue;
  border-radius: 1em;
}

.slider {
  width: 80%;
  margin-top: 10px;
}

.selected-value {
  margin-top: 10px;
  font-weight: bold;
}
</style>
