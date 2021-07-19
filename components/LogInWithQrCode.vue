<template>
  <div class="login-qr" v-if="isQrCode">
    <span class="back" @click="$emit('setQrCode')">
         <inline-svg src="/icons/arrow-left.svg"/>
    </span>
    <div class="logo">
      <inline-svg src="/icons/logo.svg"/>
    </div>
    <div class="qr-block">
      <img src="../static/img/qr-code.jpg" alt="">
      <p class="text">Login with QR code</p>
    </div>
    <button class="button button__full">Next</button>
  </div>
</template>

<script>
export default {
  props: {
    isQrCode: {
      type: Boolean,
      required: true
    }
  }
}
</script>
