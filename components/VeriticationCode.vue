<template>
  <div class="verification-code" v-if="isVerifCode">
    <span class="back" @click="$emit('setVerificCode')">
      <inline-svg src="/icons/arrow-left.svg"/>
    </span>
    <h2 class="title">Your Code</h2>
    <form action="">
      <div class="row jc-center">
        <input v-focus type="text" class="input-code" @keyup="onKeyup" maxlength="1"/>
        <input type="number" class="input-code" @keyup="onKeyup" min="0" max="9"/>
        <input type="number" class="input-code" @keyup="onKeyup" min="0" max="9"/>
        <input type="number" class="input-code" @keyup="onKeyup" min="0" max="9"/>
        <input type="number" class="input-code" @keyup="onKeyup" min="0" max="9"/>
        <input type="number" class="input-code" @keyup="onKeyup" min="0" max="9"/>
      </div>
      <span class="text">Didn’t get a code? <span class="send-again">Send again</span></span>
    </form>
  </div>
</template>


<script>
export default {
  props:{
    isVerifCode:{
      type: Boolean,
      required: true
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
        await this.$emit('confirmVerificCode', {mobile: '+380637058924', password: 'Realemil777'})
        return
      }
      event.target.nextElementSibling.focus()
    }
    return
  }
}
}
</script>
