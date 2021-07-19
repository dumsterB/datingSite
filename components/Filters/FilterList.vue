<template>
  <div class="filter-list">
    <div class="row jc-start">
    <span class="filter-list__back" @click="$emit('setFilter')">
       <inline-svg src="/icons/arrow-left.svg"/>
    </span>
      <h2 class="filter-list__title">Filters</h2>
    </div>
    <div class="row no-wrap">
      <FilterRange
        title="Age"
        subtitle="Year"
        id="RangeAge"
        :min="Number(minAge)"
        :max="Number(maxAge)"
        :minThreshold="minThresholdAge"
        :maxThreshold="maxThresholdAge"
        @update:min="value => minAge = value"
        @update:max="value => maxAge = value"
      />
      <FilterRange
        title="Height"
        subtitle="Cm"
        id="RangeHeight"
        :min="Number(minHeight)"
        :max="Number(maxHeight)"
        :minThreshold="minThresholdHeight"
        :maxThreshold="maxThresholdHeight"
        @update:min="value => minHeight = value"
        @update:max="value => maxHeight = value"
      />
    </div>
    <div class="row no-wrap">
      <FilterRange
        title="Weight"
        subtitle="Kg"
        id="RangeWeight"
        :min="Number(minWeight)"
        :max="Number(maxWeight)"
        :minThreshold="minThresholdWeight"
        :maxThreshold="maxThresholdWeight"
        @update:min="value => minWeight = value"
        @update:max="value => maxWeight = value"
      />
      <FilterRange
        title="Distance"
        subtitle="Km"
        id="RangeDistance"
        :min="Number(minDistance)"
        :max="Number(maxDistance)"
        :minThreshold="minThresholdDistance"
        :maxThreshold="maxThresholdDistance"
        @update:min="value => minDistance = value"
        @update:max="value => maxDistance = value"
      />
    </div>
    <div class="row no-wrap">
      <FilterSelect title="Zodiac" :select="selectZodiac" :option-select="optionZodiac"/>
      <FilterSelect title="Body type" :select="selectBodyType" :option-select="optionBodyType"/>
    </div>
  <button class="button button__full">Apply</button>
  </div>
</template>

<script>
import FilterRange from './FilterRange'
import FilterSelect from './FilterSelect'

export default {
  components: {
    FilterRange,
    FilterSelect
  },
  data() {
    return {
      minAge: 16,
      maxAge: 70,
      minThresholdAge: 16,
      maxThresholdAge: 70,

      minHeight: 150,
      maxHeight: 200,
      minThresholdHeight: 150,
      maxThresholdHeight: 200,

      minWeight: 30,
      maxWeight: 120,
      minThresholdWeight: 30,
      maxThresholdWeight: 120,

      minDistance: 30,
      maxDistance: 120,
      minThresholdDistance: 30,
      maxThresholdDistance: 120,

      selectZodiac: 'Virgin',
      optionZodiac: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],

      selectBodyType:'Athletic',
      optionBodyType:['thin','slim','skinny','medium-build','muscular','athletic']
    }
  }
}
</script>
