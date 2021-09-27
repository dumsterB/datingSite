<template>
  <div class="password-recovery" v-if="isForgotPassword">
    <h2 class="title">
      <inline-svg src="/icons/arrow-left.svg" @click="$emit('setForgotPassword')" />
      {{$t('Password recovery')}}
    </h2>
    <form @submit.prevent="send" @keypress.enter="send">
      <div class="row jc-center">
        <input type="text" class="input-default phone-code" v-model="phoneCode">
        <input v-focus type="number" class="input-default phone-number" v-model="phoneNumber" :placeholder="$t('Phone number')" required>
      </div>
      <p class="text">{{$t('We will send you a varification code')}}</p>
      <button class="button button__full" >{{$t('Next')}}</button>
    </form>
  </div>
</template>

<script>

export default {
  props:{
    isForgotPassword: {
      type: Boolean,
      required: true
    }
  },
  data(){
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
      this.$emit('recoveryPassword', this.phone)
    }
  }
}
</script>
