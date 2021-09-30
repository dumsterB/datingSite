<template>
  <div class="filter-list">
    <div class="row jc-start">
    <span class="filter-list__back" @click="$emit('setFilters')">
       <inline-svg src="/icons/arrow-left.svg"/>
    </span>
      <h2 class="filter-list__title">{{$t('Filters')}}</h2>
    </div>
    <div class="row no-wrap">
      <FilterRange
        :title="$t('Age')"
        :subtitle="$t('Year')"
        id="RangeAge"
        :min="Number(preference.min_age)"
        :max="Number(preference.max_age)"
        :minThreshold="minThresholdAge"
        :maxThreshold="maxThresholdAge"
        @update:min="value => updateValue('min_age', value)"
        @update:max="value => updateValue('max_age', value)"
      />
      <FilterRange
        :title="$t('Height')"
        :subtitle="$t('Cm')"
        id="RangeHeight"
        :min="Number(preference.min_height)"
        :max="Number(preference.max_height)"
        :minThreshold="minThresholdHeight"
        :maxThreshold="maxThresholdHeight"
        @update:min="value => updateValue('min_height', value)"
        @update:max="value => updateValue('max_height', value)"
      />
    </div>
    <div class="row no-wrap">
      <!--FilterRange
        title="Weight"
        subtitle="Kg"
        id="RangeWeight"
        :min="Number(preference.min_weight)"
        :max="Number(preference.max_weight)"
        :minThreshold="minThresholdWeight"
        :maxThreshold="maxThresholdWeight"
        @update:min="value => updateValue('min_weight', value)"
        @update:max="value => updateValue('max_weight', value)"
      /-->
      <!--FilterRange
        title="Distance"
        subtitle="Km"
        id="RangeDistance"
        :min="Number(preference.min_distance)"
        :max="Number(maxDistance)"
        :minThreshold="minThresholdDistance"
        :maxThreshold="maxThresholdDistance"
        @update:min="value => minDistance = value"
        @update:max="value => maxDistance = value"
      /-->
    </div>
    <div class="row no-wrap">
      <FilterSelect :title="$t('Zodiac')" :select="preference.zodiac[0] ? $t(preference.zodiac[0]) : ''" :option-select="optionZodiac" @update="value => updateValue('zodiac', value)" />
      <FilterSelect :title="$t('Alcohol')" :select="preference.alcohol[0] ? $t(preference.alcohol[0]) : ''" :option-select="optionAlco" @update="value => updateValue('alcohol', value)"/>
    </div>
     <div class="row no-wrap">
      <FilterSelect :title="$t('Smokes')" :select="preference.smokes[0] ? $t(preference.smokes[0]) : ''" :option-select="optionSmokes" @update="value => updateValue('smokes', value)"/>
      <FilterSelect :title="$t('Childs')" :select="preference.children[0] ? $t(preference.children[0]) : ''" :option-select="optionChildes" @update="value => updateValue('children', value)"/>
    </div>
     <div class="row no-wrap">
      <FilterSelect :title="$t('Body type')" :select="preference.physique[0] ? $t(preference.physique[0]) : ''" :option-select="optionBodyType" @update="value => updateValue('physique', value)"/>
    </div>
    <button class="button button__full" @click="setFilters">{{$t('Search')}}</button>
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
      //optionZodiac: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],

      selectBodyType:'Athletic',
      //optionBodyType:['thin','slim','skinny','medium-build','muscular','athletic']
    }
  },
  computed : {
    optionZodiac(){
      return ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    },
    optionAlco(){
      return [
        {
          label: "Yes",
          value : "yes"
        },
        {
          label: "No",
          value : "no"
        }
      ]
    },
    optionSmokes(){
      return [
        {
          label: "Yes",
          value : "yes"
        },
        {
          label: "No",
          value : "no"
        }
      ]
    },
    optionChildes(){
      return [
        {
          label: "Yes",
          value : "yes"
        },
        {
          label: "No",
          value : "no"
        }
      ]
    },
    optionBodyType(){
      //return ['thin','slim','skinny','medium-build','muscular','athletic'];
      return [
        {
          label: "Thin",
          value : "thin"
        },
        {
          label: "Slim",
          value : "slim"
        },
        {
          label: "Skinny",
          value : "skinny"
        },
        {
          label: "Medium-build",
          value : "medium-build"
        },
        {
          label: "Muscular",
          value : "muscular"
        },
        {
          label: "Athletic",
          value : "athletic"
        },
      ]
    },
    preference() {
      return this.$store.getters["user/getUserPreference"];
    }
  },
  methods: {
    updateValue(key, val){
      let payload = {};
      let value = val;
      if(key === 'zodiac' || key === 'alcohol' || key === 'smokes' || key === 'children' || key === 'physique'){
        value = [val]
      }
      payload[key] = value;
      this.$store.commit('user/setUserPreference', payload)
    },
    setFilters(){
      this.$emit('applyFilters', this.preference);
    }
  }
}
</script>
