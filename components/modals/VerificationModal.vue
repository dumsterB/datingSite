<template>
  <div class="overlay" v-if="modal.show">
    <div class="modal">
        <span class="close" @click="$emit('close')">
      <inline-svg src="icons/close-modal.svg"/>
    </span>
      <div class="modal__body">
        <h2 class="title">Verification in progress</h2>
<!--        <div class="circle-row">-->
<!--          <ShieldIcon/>-->
<!--        </div>-->
        <span class="verificationIcon">
          <VerificationSuccessIcon/>
<!--          <VerificationErrorIcon/>-->
        </span>
        <button class="button button__full">Enter</button>
      </div>
    </div>
  </div>
</template>

<script>
import ShieldIcon from '@/static/icons/shield.svg';
import CircleRowIcon from '@/static/icons/sircle-row.svg';
import VerificationSuccessIcon from '@/static/icons/verification-success.svg'
import VerificationErrorIcon from '@/static/icons/verification-error.svg'

export default {
  components:{ShieldIcon, CircleRowIcon, VerificationSuccessIcon, VerificationErrorIcon},
  props:{
    modal:{
      type: Object,
    }
  },

}
</script>


<style lang="scss">
.circle-row {
  position: relative;
  width: 202px;
  height: 216.43px;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  margin-top: 70px;
  margin-bottom: 70px;

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }


  &:after {
    content:'';
    width: 202px;
    height: 216.43px;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    background: url("/icons/sircle-row.svg") no-repeat;
    background-size: contain;
    animation:spin 2s ease-in-out;
    animation-iteration-count: infinite;
  }
}

@keyframes spin {
  100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); }
}

.modal {
  .verificationIcon {
    width: 100%;
    height: 100%;

    svg {
      margin: 0 auto;
      margin-top: 48px;
      margin-bottom: 35px;
      display: block;
    }
  }
  .button {
    max-width: 159px;

  }
}
</style>
