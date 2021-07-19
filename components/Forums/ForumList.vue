<template>
  <div class="contact-list">
    <Forum v-for="(forum, index) in forums" :key="index" :forum="forum" @getUser="getUser"/>
  </div>
</template>

<script>
import Forum from "@/components/Forums/Forum";
export default {
  components:{Forum},
  props:{
    forums:{
      type: Array
    }
  },
  methods:{
    getUser(contact){
      this.$emit('getOpponent',contact )
    }
  }
}
</script>
