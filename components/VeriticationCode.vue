<template>
  <div class="verification-code" v-if="isVerifCode">
    <span class="back" @click="$emit('setVerificCode')">
      <inline-svg src="/icons/arrow-left.svg"/>
    </span>
    <h2 class="title">{{$t('Confirm code')}}</h2>
    <form action="">
      <div class="row jc-center">
        <input v-focus type="number" class="input-code" :class="{ '_sms-error': verifySMSError }" @keyup="onKeyup" min="0" max="9"/>
        <input type="number" class="input-code" :class="{ '_sms-error': verifySMSError }" @keyup="onKeyup" min="0" max="9"/>
        <input type="number" class="input-code" :class="{ '_sms-error': verifySMSError }" @keyup="onKeyup" min="0" max="9"/>
        <input type="number" class="input-code" :class="{ '_sms-error': verifySMSError }" @keyup="onKeyup" min="0" max="9"/>
        <input type="number" class="input-code" :class="{ '_sms-error': verifySMSError }" @keyup="onKeyup" min="0" max="9"/>
        <input type="number" class="input-code" :class="{ '_sms-error': verifySMSError }" @keyup="onKeyup" min="0" max="9"/>
      </div>
      <span v-if="verifySMSError" class="text-error-message">Неправильный код</span>
      <span class="text">{{$t('Didn’t get a code?')}} <span class="send-again">{{$t('Send again')}}</span></span>
      <div class="row jc-center">
        <button type="button" class="button button__full" @click="sendCode">{{$t('Next')}}</button>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  props:{
    isVerifCode:{
      type: Boolean,
      required: true
    },
    verifySMSError: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      codes: []
    }
  },
methods:{
  onlyNumber(e){
    return e.target.value.replace(/[^\d]/g,'')
  },
  maxLength(e){
    console.log(e.target.value.length)
    if (e.target.value.length >= 1) return false
  },
  async onKeyup(event){
    const char = event.target.value.match(/[0-9]/g);
    if(!char){
      event.target.value = event.target.value.replace(/[^0-9]/g,'')
    } else {
      this.codes.push(event.target.value)
      const next = event.target.nextElementSibling
      if(next === null){
        //console.log('code', this.codes.join(''))
        if(this.codes.join('').length === 6){
          await this.$emit('confirmVerificCode', this.codes.join(''))
        } else {
          console.log(this.codes.join(''));
        }
        return
      }
      event.target.nextElementSibling.focus()
    }
    return
  },
  async sendCode(){
    if(this.codes.join('').length === 6){
      await this.$emit('confirmVerificCode', this.codes.join(''))
    } else {
      console.log(this.codes.join(''));
    }
    
  }
}
}
</script>
