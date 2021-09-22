<template>
  <div class="auth-page">
    <div class="container">
      <Loader v-if="loading"/>
      <LoginForm
        v-if="!isForgotPassword && !isSignUp && !isQrCode && !isSendVerifCode && !isVerifCode && !isRegisterPhoto"
        :isForgotPassword="isForgotPassword"
        :isSignUp="isSignUp"
        :isQrCode="isQrCode"
        :isSendVerifCode="isSendVerifCode"
        :authType="'login'"
        :loginError="loginError"
        @setForgotPassword="setForgotPassword"
        @setSignUp="setSignUp"
        @setQrCode="setQrCode"
        @sendMobileLoginCode="sendMobileLoginCode"
        @login="login"
      />
      <PasswordRecovery
        :isForgotPassword="isForgotPassword"
        @setForgotPassword="setForgotPassword"
        @recoveryPassword="recoveryPassword"
      />
      <SignUpForm :isSignUp="isSignUp" :authType="'register'" @setSignUp="setSignUp" @sendSendUp="sendSendUp"/>
      <LogInWithQrCode :isQrCode="isQrCode" @setQrCode="setQrCode"/>
      <SendVarificationCode :authType="authType" :isSendVerifCode="isSendVerifCode" @setSendVerificCode="setSendVerificCode" @sendVerificCode="sendVerificCode"/>
      <VeriticationCode :verifySMSError="verifySMSError" :isVerifCode="isVerifCode" @setVerificCode="setVerificCode" @confirmVerificCode="confirmVerificCode"/>
      <RegisterPhoto :isRegisterPhoto="isRegisterPhoto" @setRegisterPhoto="setRegisterPhoto" @getRegisterPhoto="getRegisterPhoto"/>
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
import RegisterPhoto from '@/components/RegisterPhoto';
import Loader from "@/components/Loader";

export default {
  components: {
    SignUpForm,
    PasswordRecovery,
    LoginForm,
    LogInWithQrCode,
    SendVarificationCode,
    VeriticationCode,
    SentPasswordModal,
    RegisterPhoto,
    Loader
  },
  layout: 'auth',
  middleware: "auth",
  comments: {},
  data() {
    return {
      isForgotPassword: false,
      isSignUp: false,
      isQrCode: false,
      isSendVerifCode: false,
      isVerifCode: false,
      isRegisterPhoto: false,
      authType: null,
      newUser: {},
      modals: {
        passwordModal: {
          show: false
        }
      },
      loading: false,
      loginError: false,
      verifySMSError: false,
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
    setSendVerificCode() {
      if(this.authType==='register'){
        this.isSignUp = !this.isSignUp;
      }
      this.isSendVerifCode = !this.isSendVerifCode;
    },
    setVerificCode() {
      this.isSendVerifCode = !this.isSendVerifCode;
      this.isVerifCode = !this.isVerifCode;
    },
    setRegisterPhoto() {
      this.isRegisterPhoto = !this.isRegisterPhoto;
      this.isVerifCode = !this.isVerifCode;
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
      //await this.$store.dispatch('user/register', payload)

      this.authType = 'register';
      this.isSignUp = !this.isSignUp;
      this.isSendVerifCode = true;
    },
    async login(payload, verifySMS) {
      this.loading = true
      await this.$store.dispatch('user/login', payload).then(data => {
          setTimeout(() => {
            this.$router.push(this.localePath('/profile'))
          })
          this.loading = false
        }).catch(e => {
          if (e && verifySMS) {
            this.verifySMSError = true
          } else if (e) {
            this.loginError = true;
          } else {
            this.verifySMSError = false;
            this.loginError = false;
          }
          this.loading = false
        })
    },
    async sendVerificCode(payload) {
      this.newUser.mobile = payload;
      await this.$store.dispatch('user/register', this.newUser)
      this.isSendVerifCode = false;
      this.isVerifCode = true
    },
    async confirmVerificCode(payload) {
      //this.newUser.code = payload;
      const verifyPayload = {
        mobile : this.newUser.mobile,
        code : payload
      }
      const loginPayload = {
        mobile : this.newUser.mobile,
        password : this.newUser.password
      }

      if(this.authType==='register'){
        await this.$store.dispatch('user/verifySMS', verifyPayload).then(async data => {
          setTimeout(async () => {
            await this.$store.dispatch('user/login', loginPayload)
            this.isVerifCode = false;
            this.isRegisterPhoto = true
          })
          this.loading = false
        }).catch(e => {
          this.loading = false
        })
      } else {
        const verifySMS = true;
        await this.login(this.newUser, verifySMS);
      }
    },
    async getRegisterPhoto(payload) {
      this.newUser.file = payload;
      this.loading = true

      const reader = new FileReader();
      reader.readAsDataURL(payload);

      const res = await this.$store.dispatch('media/uploadImage', payload)
      const data = await res.json();

      await this.$store.dispatch('user/addProfilePhoto', {file:data._id, index: 0}).then(data => {
        setTimeout(() => {
          this.$router.push(this.localePath('/profile'))
        })
        this.loading = false
      }).catch(e => {
        console.log(e)
        this.loading = false
      })
    },
    sendMobileLoginCode(){
      this.authType = 'login';
      this.isSendVerifCode = true;
    }
  }
}
</script>
