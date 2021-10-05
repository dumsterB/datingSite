<template>
  <div class="modal send-password-modal" v-if="modal.show">
     <span class="close" @click="$emit('close')">
      <inline-svg src="icons/close-modal.svg"/>
    </span>
    <div class="modal-body">
      <h2 class="title">{{$t('Done!')}}</h2>
      <p class="text">{{$t('A new password has been sent to your phone')}}</p>
      <form @submit.prevent="send">
        <h2 class="title">{{phone}}</h2>
        <!--input type="text" placeholder="Phone" class="input-default" required v-model="phone" /-->
        <!--div class="password-block">
          <input type="text" placeholder="Code" class="input-default" required v-model="form.code" />
        </div-->
        <div class="row jc-center codes">
          <input v-focus type="number" class="input-code" @keyup="onKeyup" min="0" max="9" autocomplete="none"/>
          <input type="number" class="input-code" @keyup="onKeyup" min="0" max="9" autocomplete="none"/>
          <input type="number" class="input-code" @keyup="onKeyup" min="0" max="9" autocomplete="none"/>
          <input type="number" class="input-code" @keyup="onKeyup" min="0" max="9" autocomplete="none"/>
          <input type="number" class="input-code" @keyup="onKeyup" min="0" max="9" autocomplete="none"/>
          <input type="number" class="input-code" @keyup="onKeyup" min="0" max="9" autocomplete="none"/>
        </div>
        <p class="text">{{$t('Enter new password from SMS')}}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name:'SentPasswordModal',
  props:{
    modal:{
      type: Object,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      form: {
        phone: "",
        code: ""
      },
      codes: []
    }
  },
  methods: {
    onlyNumber(e){
      return e.target.value.replace(/[^\d]/g,'')
    },
    maxLength(e){
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
          this.send();
          return
        }
        event.target.nextElementSibling.focus()
      }
      return
    },
    send(){
      const payload = {
        phone: this.phone,
        code : this.codes.join('')
      }
      this.$emit('submitRecoveryPassword', payload)
    }
  }
}
</script>


<style>
/* .title{
  margin-top: 10px;
} */
.codes{
  margin: 10px auto;
}
</style>
