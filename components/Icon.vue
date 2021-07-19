<template>
  <Component
    :is="require(`@/static/icons/${name}.svg`).default"
    class="BaseIcon"
    v-bind="$attrs"
    @v-on="$listeners"
  />
</template>

<script>
export default {
  props:{
    name:{
      type: String,
      required: true
    }
  }
}
</script>

