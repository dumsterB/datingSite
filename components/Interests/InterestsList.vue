<template>
  <div class="interests-list">
    <Interest v-for="(interest, index) in interests" :key="index" :interest="interest"/>
  </div>
</template>

<script>
import Interest from "~/components/Interests/Interest";
export default {
  components:{Interest},
  props:{
    interests:{
      type:Array
    }
  }
}
</script>
