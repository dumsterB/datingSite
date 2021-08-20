<template>
  <div class="overlay">
  <div class="modal personal-information-modal" v-once>
     <span class="close" @click="$emit('setPersonalInformation')">
      <inline-svg src="icons/close-modal.svg"/>
    </span>
    <div class="modal-body">
      <h2 class="title">{{ $t('Personal information') }}</h2>
      <div class="personal-information-modal__content">
      </div>
      <button class="button button__full" @click="$emit('next')">Войти</button>
    </div>
  </div>
  </div>
</template>

<script>
import ArrowRight from '@/static/icons/arrow-right-rounded.svg';

export default {
    components: {ArrowRight},
    name:'PersonalInformationModal',
    props:{
    
  }
}
</script>
