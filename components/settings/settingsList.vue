<template>
  <div class="settings-list">
    <template v-if="!isSupport && !isAbout && !isPrivacy && !isLanguage">
        <div class="settings-list-title">
        <span class="back" @click="$emit('setSettings')">
            <inline-svg src="/icons/arrow-left.svg" />
        </span>
        <h2 class="title">{{$t('Settings')}}</h2>
        </div>
        <div class="settings-list__content">
            <div class="settings-list__item" @click="$emit('setSettings')">
              <div class="item-title">
                  <span>
                    {{$t('Account')}}
                  </span>
              </div>
            </div>
            <div class="settings-list__item" @click="setAbout">
            <div class="item-title">
                <span>
                {{$t('About app')}}
                </span>
            </div>
            </div>
            <div class="settings-list__item" @click="setPrivacy">
            <div class="item-title">
                <span>
                {{$t('Privacy policy')}}
                </span>
            </div>
            </div>
            <div class="settings-list__item" @click="setLanguage">
              <div class="item-title">
                  <span>
                    {{$t('Language')}}
                  </span>
              </div>
            </div>
            <div class="settings-list__item" @click="setSupport">
            <div class="item-title">
                <span>
                {{$t('Support')}}
                </span>
            </div>
            </div>
            <!--div class="settings-list__item">
              <div class="item-title">
                  <span>
                    {{$t('Log out')}}
                  </span>
              </div>
            </div-->
        </div>
    </template>
    <Support @setSupport="setSupport" v-if="isSupport"/>
    <About @setAbout="setAbout" v-if="isAbout"/>
    <Privacy @setPrivacy="setPrivacy" v-if="isPrivacy"/>
    <Language @setLanguage="setLanguage" v-if="isLanguage"/>
  </div>
</template>

<script>

import Support from '@/components/settings/support';
import About from '@/components/settings/about';
import Privacy from '@/components/settings/privacy';
import Language from '@/components/settings/language';

export default {
  components: { Support, About, Privacy, Language },
  data() {
    return {
        isSupport : false,
        isAbout : false,
        isPrivacy : false,
        isLanguage : false
    };
  },
  methods: {
    setSupport() {
      this.isSupport = !this.isSupport;
    },
    setAbout() {
      this.isAbout = !this.isAbout;
    },
    setPrivacy() {
      this.isPrivacy = !this.isPrivacy;
    },
    setLanguage() {
      this.isLanguage = !this.isLanguage;
    },
  }
};
</script>
