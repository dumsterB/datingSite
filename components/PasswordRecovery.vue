<template>
  <div class="password-recovery" v-if="isForgotPassword">
    <h2 class="title">
      <inline-svg src="/icons/arrow-left.svg" @click="$emit('setForgotPassword')" />
      Восстановление пароля
    </h2>
   <div class="column ai-center ">
     <form @submit.prevent="send" class="column ai-center w-100">
       <input type="email" placeholder="Email" class="input-default" v-model="email"/>
       <button class="button button__full">Send</button>
     </form>
   </div>
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
      email: ''
    }
  },
  methods:{
    send(){
      console.log(this.email);
      this.$emit('recoveryPassword')
    }
  }
}
</script>
