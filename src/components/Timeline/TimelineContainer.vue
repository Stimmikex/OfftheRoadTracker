<template>
    <div>
        <SliderBar :values="uniqueDates" v-model="selectedValue"></SliderBar>
    </div>
</template>
  
<style lang="scss" scoped>
</style>
  
<script>
  import { getTimelineOfTracks } from '../../tracks.js'
  import SliderBar from './SliderBar.vue'
  
  export default {
    name: 'Slide-bar',
    components: {
        SliderBar,
    },
    data() {
      return {
        uniqueDates: [],
      };
    },
    methods: {
        getTimelineOfTracks
    },
    async mounted() {
        try {
          this.uniqueDates = await getTimelineOfTracks();
        } catch (error) {
          console.error('Error fetching TimeLineOfTracks:', error);
        }
    },
  };
</script>
  