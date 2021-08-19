<template>
  <div class="option-settings" ref="options">
    <p @click="deleteItem"><Icon name="delete" /> {{$t('Delete')}}</p>
    <p @click="complain"><Icon name="complain" /> {{$t('Complain')}}</p>
    <p @click="block"><Icon name="block-off" /> {{$t('Block')}}</p>
    <p @click="notificationsOff"><Icon name="notification-off" /> {{$t('Mute notifications')}}</p>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {Icon},
  props:{
    show:{
      type: Boolean
    }
  },
  data(){
    return {

    }
  },
  methods:{
    deleteItem(){
      console.log('deleted');
      this.$emit('closeOptions')
    },
    complain(){
      this.$store.commit('chat/setBlockModal')
      this.$emit('closeOptions')
    },
    block(){
      this.$store.commit('chat/setBlockModal')
      this.$emit('closeOptions')
    },
    notificationsOff(){
      console.log('notificationsOff');
      this.$emit('closeOptions')
    },
    /*close(e) {
      let container = this.$refs.options;
      console.log(container)
      if (container !== e.target) {
       this.$emit('closeOptions')
      }
    },*/
  }
}
</script>

