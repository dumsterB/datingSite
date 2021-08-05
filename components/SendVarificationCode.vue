<template>
  <div class="send-verification-code" v-if="isSendVerifCode">
    <span class="back" @click="$emit('setSendVerificCode')">
      <inline-svg src="/icons/arrow-left.svg"/>
    </span>
    <h2 class="title">Phone</h2>
    <form @submit.prevent="send" @keypress.enter="send">
      <div class="row jc-center">
        <input type="text" class="input-default phone-code" v-model="phoneCode">
        <input v-focus type="text" class="input-default phone-number" v-model="phoneNumber" placeholder="Phone Number" required>
      </div>
      <p class="text">We will send you a varification code</p>
      <button class="button button__full" >Next</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    isSendVerifCode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      phoneCode: '+380',
      phoneNumber:''
    }
  },
  methods:{
    send(){
      this.$emit('sendVerificCode', this.phoneNumber)
      console.log(1)
    }
  }
}
</script>
