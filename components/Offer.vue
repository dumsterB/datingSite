<template>
  <div class="offer">
    <Component
      :is="require(`@/static/icons/${icon}.svg`).default"
      class="BaseIcon"
      v-bind="$attrs"
      @v-on="$listeners"
    />
    <p class="text">{{$t('Invite to the theater')}}</p>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  data(){
    return{

    }
  },
  iconShow(icon){
    return  `<inline-svg src='/icons/${icon}.svg'/>`
  }
}
</script>
