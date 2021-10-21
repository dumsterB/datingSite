<template>
  <div class="contact-list">
    <Contact v-for="(contact, index) in contacts" :key="index" :contact="contact" @getUser="getUser"/>
  </div>
</template>

<script>
import Contact from "@/components/Chat/Contact";

export default {
  components:{Contact},
  props:{
    contacts:{
      type: Array
    },
    forums:{
      type: Array
    }
  },
  methods:{
    getUser(contact){
      // this.$emit('getOpponent',contact )
    }
  }
}
</script>
