<template>
  <div class="auth-page">
    <div class="container">
      <LoginForm
        v-if="!isForgotPassword && !isSignUp && !isQrCode && !isSendVerifCode && !isVerifCode"
        :isForgotPassword="isForgotPassword"
        :isSignUp="isSignUp"
        :isQrCode="isQrCode"
        :isSendVerifCode="isSendVerifCode"
        @setForgotPassword="setForgotPassword"
        @setSignUp="setSignUp"
        @setQrCode="setQrCode"
      />
      <PasswordRecovery
        :isForgotPassword="isForgotPassword"
        @setForgotPassword="setForgotPassword"
        @recoveryPassword="recoveryPassword"
      />
      <SignUpForm :isSignUp="isSignUp" @setSignUp="setSignUp" @sendSendUp="sendSendUp"/>
      <LogInWithQrCode :isQrCode="isQrCode" @setQrCode="setQrCode"/>
      <SendVarificationCode :isSendVerifCode="isSendVerifCode" @sendVerificCode="sendVerificCode"/>
      <VeriticationCode :isVerifCode="isVerifCode"/>
    </div>
    <SentPasswordModal :modal="modals.passwordModal" @close="close"></SentPasswordModal>
  </div>
</template>

<script>
import PasswordRecovery from '@/components/PasswordRecovery';
import LoginForm from '@/components/Forms/LoginForm';
import LogInWithQrCode from '@/components/LogInWithQrCode';
import SignUpForm from '@/components/Forms/SignUpForm';
import SendVarificationCode from '@/components/SendVarificationCode';
import VeriticationCode from '@/components/VeriticationCode';
import SentPasswordModal from '@/components/modals/SentPasswordModal';

export default {
  components: {
    SignUpForm,
    PasswordRecovery,
    LoginForm,
    LogInWithQrCode,
    SendVarificationCode,
    VeriticationCode,
    SentPasswordModal
  },
  layout: 'auth',
  comments: {},
  data() {
    return {
      isForgotPassword: false,
      isSignUp: false,
      isQrCode: false,
      isSendVerifCode: false,
      isVerifCode: false,
      newUser: {},
      modals: {
        passwordModal: {
          show: false
        }
      }
    }
  },
  methods: {
    setForgotPassword() {
      this.isForgotPassword = !this.isForgotPassword;
    },
    setSignUp() {
      this.isSignUp = !this.isSignUp;
    },
    setQrCode() {
      this.isQrCode = !this.isQrCode;
    },
    recoveryPassword() {
      this.modals.passwordModal.show = true;
    },
    close() {
      this.modals.passwordModal.show = false;
      this.isForgotPassword = false;
    },
    async sendSendUp(payload) {
      this.newUser = payload;
      await this.$store.dispatch('user/register', payload)

      // this.isSignUp = !this.isSignUp;
      // this.isSendVerifCode = true;
    },
    sendVerificCode(payload) {
      console.log(payload);
      this.isSendVerifCode = false;
      this.isVerifCode = true
    }
  }
}
</script>
