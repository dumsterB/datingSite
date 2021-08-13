<template>
  <div class="overlay" @click.self="$emit('setConfirmProfleDelete')">
  <div class="modal confirm-profile-delete-modal" v-once>
     <span class="close" @click="$emit('setConfirmProfleDelete')">
      <inline-svg src="icons/close-modal.svg"/>
    </span>
    <div class="modal-body">
      <h2 class="title">{{$t('Are you sure you want to delete your account?')}}</h2>
      <div class="delete-options">
          <button class="button button__full" @click="deleteProfile">{{$t('Yes')}}</button>
          <button class="button button__empty" @click="$emit('setConfirmProfleDelete')">{{$t('No')}}</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
    name:'ConfirmProfileDeleteModal',
    methods: {
        deleteProfile(){
            this.$store.dispatch('user/logout');
            this.$router.push(this.localePath('/empty'))
        }
    }
}
</script>

