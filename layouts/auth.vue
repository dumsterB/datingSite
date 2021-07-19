<template>
  <div class="auth-layout">
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware:['auth'],
  data () {
    return {}
  },
  created() {
    this.$store.dispatch('user/init')
  },
}

</script>


<style>

</style>
