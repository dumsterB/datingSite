<template>
  <div class="overlay" v-if="modal.show">
    <div class="modal quick-meeting-message-modal" v-once>
      <div class="modal-body">
        <div class="quick-meeting-message-modal__avatar">
          <img :src="quickDatingPhotoUser" alt="" />
        </div>
        <h2 class="title">Напишите сообщение {{ text }}</h2>
        <textarea cols="20" rows="9" v-model="text"></textarea>

        <button class="button button__full" @click="$emit('nextStep')">
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modal: {
      type: Object,
      required: true
    },
    users: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      text: ""
    };
  },
  computed: {
    quickDatingPhotoUser() {
      const newArr = [];
      this.users.forEach(el => {
        if (el.want_qdate && el.pic) {
          newArr.push(el);
        }
      });
      const randomEl = Math.floor(Math.random() * newArr.length);
      return newArr[randomEl].pic.url;
    }
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
