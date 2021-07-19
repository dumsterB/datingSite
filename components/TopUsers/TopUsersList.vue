<template>
  <div class="top-users-list">
    <TopUserItem v-for="(leader, index) in leaders" :key="index" :leader="leader"/>
  </div>
</template>

<script>
import TopUserItem from "@/components/TopUsers/TopUserItem";

export default {
  components: {TopUserItem},
  props: {
    leaders: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
