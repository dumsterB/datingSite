<template>
 <div class="filter-container">
   <div class="row ">
     <div class="filter-title">{{ title }}</div>
     <div class="filter-subtitle">{{ subtitle }}</div>
   </div>
   <div :id="id"
        :se-min="minThreshold"
        :se-step="step"
        :se-min-value="min"
        :se-max-value="max"
        :se-max="maxThreshold"
        class="slider">
     <div class="slider-touch-left">
       <span></span>
       <i class="counter-value">
         {{min}}
       </i>
     </div>
     <div class="slider-touch-right">
       <span></span>
       <i class="counter-value">
         {{max}}
       </i>
     </div>
     <div class="slider-line">
       <span></span>
     </div>
   </div>
 </div>
</template>

<script>
 import ZbRangeSlider from '../../plugins/ZbRangeSLider.js'

export default {
  props: {
    id:{
      type: String,
      required: true
    },
    title:{
      type: String,
      required: true
    },
    subtitle:{
      type: String,
      required: true
    },
    minThreshold: {
      type: Number,
      required: true
    },
    maxThreshold: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      instance: undefined
    }
  },
  mounted: function () {
    this.instance = new ZbRangeSlider(`${this.id}`)
    this.instance.onChange = (min, max) => this.updateValues(min, max)
  },
  methods: {
    updateValues: function (min, max) {
      this.$emit('update:min', min)
      this.$emit('update:max', max)
    }
  }
}
</script>

<style scoped>

</style>
