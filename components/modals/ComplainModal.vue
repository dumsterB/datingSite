<template>
  <div class="overlay" v-if="show">
    <div class="modal complain-modal">
        <span class="close" @click="$emit('close')">
      <inline-svg src="/icons/close-modal.svg"/>
    </span>
      <div class="modal__body">
        <template v-if="!isBlock">
          <h2 class="title">{{(reportType==='complain') ? $t('Complain about') : $t('Block')}} {{user.profile.name}}?</h2>
          <div class="complain-modal__block">
            <img :src="user.profile.pictures[0] ? user.profile.pictures[0].url : '/img/avatar.jpg'" alt="">
          </div>
        <div class="row no-wrap">
          <button class="button button__empty" @click="blockUser">{{$t('Yes')}}</button>
          <button class="button button__empty" @click="$emit('close')">{{$t('Cancel')}}</button>
        </div>
        </template>
        <template v-else>
          <h2 class="title">{{(reportType==='complain') ? $t('The user is complained!') : $t('The user is blocked!')}}</h2>
          <p class="subtitle">{{$t('Please tell me the reason')}}</p>
          <v-select class="select-block" v-model="select" :options="optionSelect">
            <template #open-indicator="{ attributes }">
              <Component
                :is="require(`@/static/icons/arrow-dwn.svg`).default"
                class="BaseIcon"
                v-bind="$attrs"
                @v-on="$listeners"
              />
            </template>
          </v-select>
          <input type="text" placeholder="Comment" v-model="comment" class="input input-default"/>
          <button class="button button__full white-text" @click="send">{{$t('Send')}}</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ShieldIcon from '@/static/icons/shield.svg';

export default {
  props: {
    modal: {
      type: Object,
    },
    reportType: {
      type: String,
    }
  },
  data() {
    return {
      isBlock: false,
      select: this.$t('Spam'),
      optionSelect:[
        this.$t('Spam'), 
        this.$t('Fraud'), 
        this.$t('Abuse'),
        this.$t('Distribution of pornographic materials'),
        this.$t('Threat'),
        this.$t('Alien photo'),
        this.$t('No 18 years old'), 
        this.$t('Other')
        ],
      comment:'',
    }
  },
  computed:{
    show () {
      return this.$store.state.chat.blockModal
    },
    user(){
      return this.$store.state.user.selectedUser
    }
  },
  methods:{
    blockUser(){
      this.isBlock = true
    },
    async send(){
      const payload = {
        comment: this.comment,
        select: this.select,
        user: this.user._id
      }
      this.isBlock = false;
      if(this.reportType === 'complain'){
        await this.$store.dispatch('chat/complainUser', payload)
      } else {
        await this.$store.dispatch('chat/blockUser', payload)
      }
      this.$emit('done', payload)
    }
  }
}
</script>


<style lang="scss">


.modal {
  .button {
    max-width: 159px;
  }
}
</style>
