<template>
  <router-link tag="div" :to="'/id/'+ people.user._id" class="quick-meeting-item" v-if="people">
    <img v-if="people.user.pic" :src="people.user.pic.url" class="quick-meeting-item__img">
    <p class="quick-meeting-item__name">{{ people.user.name }}</p>
  </router-link>
</template>

<script>
export default {
props:{
  people: {
    type: Object
  }
}
}
</script>

<style scoped>

</style>
