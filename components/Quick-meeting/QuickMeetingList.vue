<template>
  <div class="quick-meeting-list">
    <QuickMeetingItem v-for="people in quickMeetingsPeoples" :key="people.id" :people="people"/>

  </div>
</template>

<script>
import QuickMeetingItem from "@/components/Quick-meeting/QuickMeetingItem";
export default {
components:{QuickMeetingItem},
  props:{
    quickMeetingsPeoples:{
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
