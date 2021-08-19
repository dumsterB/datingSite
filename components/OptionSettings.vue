<template>
  <div class="option-settings" ref="options">
    <p @click="deleteItem"><Icon name="delete" /> Удалить</p>
    <p @click="complain"><Icon name="complain" /> Пожаловаться</p>
    <p @click="block"><Icon name="block-off" /> Заблокировать</p>
    <p @click="notificationsOff"><Icon name="notification-off" /> Выключить уведомления</p>
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
      console.log('complain');
      this.$emit('closeOptions')
    },
    block(){
      console.log('block');
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

