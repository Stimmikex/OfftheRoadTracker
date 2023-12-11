<template>
  <div class="sidePop__sliderContainer">
    <h2>Timelaps</h2>
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
    <button @click="stop">Stop</button>
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
    stop() {
      this.isPlaying = false;
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
      }, 1000);
    },
  },
};
</script>

<style>

.slider {
  width: 80%;
  margin-top: 10px;
}

.selected-value {
  margin-top: 10px;
  font-weight: bold;
}
</style>
