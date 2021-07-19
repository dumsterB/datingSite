<template>
  <div class="verification-code" v-if="isVerifCode">
    <span class="back">
      <inline-svg src="/icons/arrow-left.svg"/>
    </span>
    <h2 class="title">Your Code</h2>
    <form action="">
      <div class="row jc-center">
        <input type="number" class="input-code" @keypress="maxLength" />
        <input type="number" class="input-code" @keypress="maxLength" />
        <input type="number" class="input-code" @keypress="maxLength" />
        <input type="number" class="input-code" @keypress="maxLength" />
        <input type="number" class="input-code" @keypress="maxLength" />
        <input type="number" class="input-code" @keypress="maxLength" />
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
      codes:{

      }
    }
  },
methods:{
  onlyNumber(e){
    return e.target.value.replace(/[^\d]/g,'')
  },
  maxLength(e){
    console.log(e.target.value.length)
    if (e.target.value.length >= 1) return false
  }
}
}
</script>
