<template>
  <div class="filter-container">
    <div class="filter-select">
      <p class="filter-select__title">{{title}}</p>
      <v-select class="select-block" v-model="select" :options="optionSelect" return-object>
        <template #open-indicator="{ attributes }">
          <Component
            :is="require(`@/static/icons/filter-arrow-dwn.svg`).default"
            class="BaseIcon"
            v-bind="$attrs"
            @v-on="$listeners"
          />
        </template>
      </v-select>
    </div>
  </div>

</template>

<script>
export default {
  props:{
    title:{
      type: String,
      required: true
    },
    select:{
      type: String,
      required: true
    },
    optionSelect:{
      type: Array,
      required: true
    }
  },
  data(){
    return{

    }
  },
  updated: function () {
    if(this.select.value) this.$emit('update', this.select.value)
  },
}
</script>
