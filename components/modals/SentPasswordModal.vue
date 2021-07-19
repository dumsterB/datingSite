<template>
  <div class="modal send-password-modal" v-if="modal.show"  v-once>
     <span class="close" @click="$emit('close')">
      <inline-svg src="icons/close-modal.svg"/>
    </span>
    <div class="modal-body">
      <h2 class="title">Done!</h2>
      <p class="text">A new password has been sent to your email</p>
      <span class="password-alright">
       <inline-svg src="icons/sent-password-alright.svg"/>
     </span>
      <button class="button button__full" @click="$emit('close')">Super</button>
    </div>
  </div>
</template>

<script>
export default {
  name:'SentPasswordModal',
  props:{
    modal:{
      type: Object,
      required: true
    }
  }
}
</script>


<style>
[v-cloak] {
  display: none;
}
</style>
