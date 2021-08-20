<template>
  <div class="overlay">
  <div class="modal quick-meeting-modal" v-once>
     <span class="close" @click="$emit('setInterests')">
      <inline-svg src="icons/close-modal.svg"/>
    </span>
    <div class="modal-body">
      <h2 class="title">Интересы</h2>
      <p class="text"></p>
      <button class="button button__full" @click="$emit('next')">Войти</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
    name:'InterestsModal',
    props:{
    
  }
}
</script>
