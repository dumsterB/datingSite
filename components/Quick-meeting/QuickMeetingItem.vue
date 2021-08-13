<template>
  <router-link tag="div" :to="'/id/'+ people._id" class="quick-meeting-item" v-if="people">
    <img v-if="people.pic" :src="people.pic.url" class="quick-meeting-item__img">
    <img v-else :src="require('/static/img/avatar.jpg')" class="quick-meeting-item__img">
    <p class="quick-meeting-item__name">{{ people.name }}</p>
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
