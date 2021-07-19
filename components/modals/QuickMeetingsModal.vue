<template>
  <div class="overlay" v-if="modal.show">
  <div class="modal quick-meeting-modal" v-once>
     <span class="close" @click="$emit('close')">
      <inline-svg src="icons/close-modal.svg"/>
    </span>
    <div class="modal-body">
      <h2 class="title">Быстрые свидания</h2>
      <p class="text">Назначай встречу прямо сейчас.</p>
      <span class="quick-meeting-modal__icon">
       <inline-svg src="icons/quick-meetings-modal.svg"/>
     </span>
      <p class="quick-meeting-modal__description">Общайся с пользователями, которые готовы к знакомству вживую.</p>
      <button class="button button__full" @click="$emit('next')">Войти  </button>
    </div>
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
