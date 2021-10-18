<template>
  <div class="settings-list">
    <div class="settings-list-title">
      <span class="back" @click="$emit('setSupport')">
        <inline-svg src="/icons/arrow-left.svg" />
      </span>
      <h2 class="title">{{$t('Support')}}</h2>
    </div>
    <div class="settings-list__content" @click="redirect">
        <div class="button button__empty" style="max-width:400px!important">
            <img src="/icons/telegram.svg" alt="">
            <span>
                {{$t('Contact support')}}
            </span>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  components: { },
  data() {
    return {

    };
  },
  methods: {
      redirect(){
          window.location.href = 'https://t.me/alanica_support_bot?start=Web'
      }
  }
};
</script>
