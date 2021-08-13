<template>
  <div class="empty-page">
    <div class="logo">
      <inline-svg src="/icons/logo.svg"/>
    </div>
    <div class="">
      <ProfileDeleted></ProfileDeleted>
    </div>
  </div>
</template>

<script>
import ProfileDeleted from "@/components/modals/ProfileDeletedModal";

export default {
  components: {
    ProfileDeleted,
  },
  layout: 'empty',
  data() {
    return {
      
    }
  },
  methods: {
  
  }
}
</script>
