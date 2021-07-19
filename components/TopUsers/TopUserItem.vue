<template>
  <div class="top-user-item">
    <img :src="leader.user.pic.url" class="top-user-item__img">
    <h3 class="top-user-item__title">{{ leader.user.name }}, 25</h3>
    <span class="top-user-item__location">Moskow</span>
    <span class="top-user-item__description">{{ leader.text }}</span>
  </div>
</template>

<script>
export default {
  props:{
    leader:{
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
