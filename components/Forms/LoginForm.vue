<template>
  <div class="login-form">
    <div class="logo">
      <inline-svg src="/icons/logo.svg"/>
    </div>
    <Loader v-if="loading"/>
    <form @submit.prevent="send">
      <input type="text" placeholder="Login" class="input-default" required v-model="form.login"/>
      <div class="password-block">
        <input type="password" placeholder="Password" class="input-default" required v-model="form.password"/>
        <span to="/" class="forgot-password" @click="$emit('setForgotPassword')">Forgot password?</span>
      </div>
      <button class="button button__full">Continue</button>
      <button class="button button__empty">Login with Phone</button>
      <div class="row no-wrap">
        <a href="#" class="social-link">
          <inline-svg src="/icons/google.svg"/>
        </a>
        <a href="#" class="social-link">
          <inline-svg src="/icons/facebook.svg"/>
        </a>
      </div>
      <div class="sign-up">
        <p @click="$emit('setSignUp')">Not with us? <span>Sign Up</span></p>
        <p @click="$emit('setQrCode')">Log in with QR code</p>
      </div>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
export default {
  props: {},
  components:{Loader},
  data() {
    return {
      form: {
        login: '+380637058924',
        password: 'Realemil777'
      },
      loading: false
    }
  },
  methods: {
    async send() {
      if (this.form.login.trim() && this.form.password.trim()) {
        const payload = {
          mobile: this.form.login,
          password: this.form.password
        }
        this.loading = true
        await this.$store.dispatch('user/login', payload).then(data => {
          console.log(data)
          setTimeout(() => {
            this.$router.push('/profile')
          })
          this.loading = false
        }).catch(e => {
          console.log(e)
          this.loading = false
        })
      }
    }
  }
}
</script>
