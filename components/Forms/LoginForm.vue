<template>
  <div class="login-form">
    <div class="logo">
      <inline-svg src="/icons/logo.svg" />
    </div>
    <form @submit.prevent="send">
      <div class="jc-center">
        <input type="text" class="input-default phone-code" v-model="phoneCode">
        <input v-focus type="number" class="input-default phone-number" v-model="phoneNumber" :placeholder="$t('Phone number')" required>
      </div>
      <span v-if="loginError" class="error-message login">Неверный логин или пароль</span>
      <div class="password-block">
        <input type="password" :placeholder="$t('Password')" class="input-default"
               :class="{ '_error-input': loginError }" required
               v-model="form.password" />
        <span to="/" class="forgot-password"
              @click="$emit('setForgotPassword')">{{
            $t("Forgot password?")
          }}</span>
      </div>
      <span v-if="loginError" class="error-message password">Неверный логин или пароль</span>
      <button id="login" class="login-btn">{{ $t("Continue") }}</button>
<!--      <button @click="$emit('sendMobileLoginCode')" type="button"-->
<!--              class="button button__empty">{{ $t("Login with Phone") }}-->
<!--      </button>-->
      <!--div class="row no-wrap">
        <a href="#" class="social-link">
          <inline-svg src="/icons/google.svg" />
        </a>
        <a href="#" class="social-link">
          <inline-svg src="/icons/facebook.svg" />
        </a>
      </div-->
      <div class="sign-up">
        <p @click="$emit('setSignUp')">{{ $t("Not with us?") }}
          <span>{{ $t("Sign Up") }}</span></p>
        <p @click="$emit('setQrCode')">{{ $t("Log in with QR code") }}</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    loginError: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      phoneCode: '+380',
      phoneNumber:'',
      form: {
        login: "",
        password: "",
      },
    };
  },
  computed:{
    phone(){
      return this.phoneCode.trim() + this.phoneNumber.trim();
    }
  },
  methods: {
    async send() {
      if (this.phone && this.form.password.trim()) {
        const payload = {
          mobile: this.phone,
          password: this.form.password,
        };
        this.$emit("login", payload);
      }
    },
  },
};
</script>
