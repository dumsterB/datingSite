<template>
  <div class="settings-list">
    <div class="settings-list-title">
      <span class="back" @click="$emit('setLanguage')">
        <inline-svg src="/icons/arrow-left.svg" />
      </span>
      <h2 class="title">{{$t('Choose language')}}</h2>
    </div>
    <div class="row">
        <button class="button button__empty" :class="$i18n.locale=='en' ? 'active' : ''" @click="changeLocale('en')">
            <span>English</span>
        </button>
        <button class="button button__empty" :class="$i18n.locale=='ru' ? 'active' : ''" @click="changeLocale('ru')">
            <span>Русский</span>
        </button>
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
  methods : {
    changeLocale(value) { 
        this.$i18n.setLocale(value);
    }
  }
};
</script>
