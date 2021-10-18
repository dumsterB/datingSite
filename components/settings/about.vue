<template>
  <div class="settings-list">
    <div class="settings-list-title">
      <span class="back" @click="$emit('setAbout')">
        <inline-svg src="/icons/arrow-left.svg" />
      </span>
      <h2 class="title">{{$t('About app')}}</h2>
    </div>
    <div class="settings-list__content" @click="redirect">
        <p>
            Copyright 2021 Alanica
        </p>
        <p>
            All rights reserved
        </p>
        <p>
            Details on https://alanicadates.com/
        </p>
    </div>
  </div>
</template>

<script>

export default {
  components: { },
  data() {
    return {

    };
  }
};
</script>
