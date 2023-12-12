<template>
    <div class="sidePop__legendContainer">
        <h2>Legend</h2>
        <div class="sidePop__legendContainer__icons">
            <div class="sidePop__legendContainer__icons__years">
                <img v-bind:src="'./icons/All.png '"/>
                <img v-bind:src="'./icons/2021.png '"/>
                <img v-bind:src="'./icons/2022.png '"/>
                <img v-bind:src="'./icons/2023.png '"/>
            </div>
            <div class="sidePop__legendContainer__icons__points">
                <img v-bind:src="'./icons/peak.png '"/>
                <img v-bind:src="'./icons/waterfall.png '"/>
            </div>
        </div>
        <p>Roads</p>
        <div class="sidePop__legendContainer__roads">
            <div class="roadContainer">
                <p>Main Roads</p>
                <div :style="{ background: `${getRoadMainColor().toCssColorString()}`}" class="roadColor"></div>
            </div>
            <div class="roadContainer">
                <p>Side Roads</p>
                <div :style="{ background: `${getRoadSecondColor().toCssColorString()}`}" class="roadColor"></div>
            </div>
        </div>
        <div>
            <p>Color Changes - Based on the amount of tracks</p>
            <div :style="{ background: `linear-gradient(to right, ${getColorGradian()[0]}, ${getColorGradian()[1]})`}" class="sidePop__legendContainer__gradianColor">
                <p>0</p>
                <p>46</p>
            </div>
        </div>
    </div>
</template>
  
<style lang="scss" scoped>
</style>
  
<script>

import { getColorGradian } from '../../zones.js'
import { getRoadMainColor, getRoadSecondColor } from '../../scripts/utilityValues.js'
  
  export default {
    name: 'Legend-Container',
    components: {
    },
    data() {
      return {
        uniqueDates: [],
      };
    },
    methods: {
        getColorGradian,
        getRoadMainColor,
        getRoadSecondColor,
    },
    async mounted() {
    },
  };
</script>
  