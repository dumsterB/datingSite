<template>
  <div class="settings-list">
    <div class="settings-list-title">
      <span class="back" @click="$emit('setPrivacy')">
        <inline-svg src="/icons/arrow-left.svg" />
      </span>
      <h2 class="title">{{$t('Privacy policy')}}</h2>
    </div>
    <div class="settings-list__content" >
        <PrivacyRu v-if="$i18n.locale==='ru'"/>
        <PrivacyEn v-if="$i18n.locale==='en'"/>
    </div>
  </div>
</template>

<script>
import PrivacyRu from '@/components/settings/privacy_ru';
import PrivacyEn from '@/components/settings/privacy_en';

export default {
  components: { PrivacyRu, PrivacyEn },
  data() {
    return {

    };
  },
};
</script>
