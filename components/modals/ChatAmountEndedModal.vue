<template>
  <div class="overlay" v-show="show">
    <div class="modal quick-meeting-message-modal">
        <span class="close" @click="$emit('close')">
      <inline-svg src="/icons/close-modal.svg"/>
    </span>
      <div class="modal__body">
        <template>
          <h2 class="title">{{$t('Дневной лимит новых чатов исчерпан')}}</h2>
        <div class="row no-wrap">
          <button class="button button__empty" @click="$emit('close')">{{$t('Close')}}</button>
        </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
    }
  },
  data() {
    return {
    }
  },
  methods:{
    blockUser(){
      this.isBlock = true
    },
  }
}
</script>


<style lang="scss"></style>
