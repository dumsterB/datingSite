<template>
  <div class="user-marker">
    <div class="user-marker__circle">
      <div class="user-marker__avatar">
        <router-link tag="div" :to="`/id/${peopleId}`">
          <img :src="img" alt="" />
        </router-link>
      </div>
    </div>
    <div class="user-marker__triangle"></div>
    <div v-if="textMessage" class="user-marker__message">
      <p class="user-marker__message_text">
        {{ textMessage }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ""
    },
    peopleId: {
      type: String,
      default: ""
    },
    textMessage: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped></style>
