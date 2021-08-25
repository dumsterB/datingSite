<template>
  <div class="user-marker">
    <div class="user-marker__circle">
      <div class="user-marker__avatar">
        <img :src="img" alt="" />
      </div>
    </div>
    <div class="user-marker__triangle"></div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped></style>
