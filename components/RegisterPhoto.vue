<template>
  <div class="register-photo" v-if="isRegisterPhoto">
    <span class="back" @click="$emit('setRegisterPhoto')">
      <inline-svg src="/icons/arrow-left.svg"/>
    </span>
    <h2 class="title">Add photo</h2>
    <div class="row jc-center">
      <inline-svg src="icons/register-photo.svg"/>
    </div>
    <form @submit.prevent="send" @keypress.enter="send">
      <div class="row jc-center">
        <!--input type="file" class="input-default"-->
      </div>
      <p class="text text__important">One step left</p>
      <p class="text">Add one or more photos</p>
      <!--button class="button button__full" >Complete registration</button-->
      <button type="button" class="button button__full" >Upload photo</button>
    </form>
  </div>
</template>


<script>
export default {
  props: {
    isRegisterPhoto: {
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
