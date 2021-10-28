<template>
  <div class="send-verification-code" v-if="isSendVerifCode">
    <span class="back" @click="$emit('setSendVerificCode')">
      <inline-svg src="/icons/arrow-left.svg"/>
    </span>
    <h2 class="title">{{$t('Enter phone')}}</h2>
    <form @submit.prevent="send" @keypress.enter="send">
      <div class="row jc-center">
        <input type="text" class="input-default phone-code" v-model="phoneCode">
        <input v-focus type="number" class="input-default phone-number" v-model="phoneNumber" :placeholder="$t('Phone number')" required>
      </div>
      <p v-if="sendSMSError" class="text text__error">{{$t('Number is using')}}</p>
      <p v-else class="text">{{$t('We will send you a varification code')}}</p>
      <button class="button button__full" >{{$t('Next')}}</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    isSendVerifCode: {
      type: Boolean,
      required: true
    },
    sendSMSError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      phoneCode: '+380',
      phoneNumber:''
    }
  },
  computed:{
    phone(){
      return this.phoneCode.trim() + this.phoneNumber.trim();
    }
  },
  methods:{
    send(){
      this.$emit('sendVerificCode', this.phone)
      //console.log(1, this.phone)
    }
  }
}
</script>
