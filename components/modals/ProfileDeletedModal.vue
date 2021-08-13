<template>
  <div class="overlay" @click.self="redirect">
  <div class="modal confirm-profile-delete-modal">
     <span class="close" @click="redirect">
      <inline-svg src="icons/close-modal.svg"/>
    </span>
    <div class="modal-body">
      <h2 class="title">{{$t('Your account has been successfully deleted!')}}</h2>
    </div>
  </div>
  </div>
</template>

<script>
export default {
    name:'ConfirmProfileDeleteModal',
    methods: {
        redirect(){
            this.$router.push(this.localePath('/'))
        }
    }
}
</script>

