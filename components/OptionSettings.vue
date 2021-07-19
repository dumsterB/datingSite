<template>
  <div class="option-settings" v-if="show" ref="options" @click="close">
    <p><Icon name="delete" @click="deleteItem"/> Удалить</p>
    <p><Icon name="complain" @click="complain"/> Пожаловаться</p>
    <p><Icon name="block-off" @click="block"/> Заблокировать</p>
    <p><Icon name="notification-off" @click="notificationsOff"/> Выключить уведомления</p>
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

    },
    complain(){

    },
    block(){

    },
    notificationsOff(){

    },
    close(e) {
      let container = this.$refs.options;
      console.log(container)
      if (container !== e.target) {
       this.$emit('closeOptions')
      }
    },
  }
}
</script>

