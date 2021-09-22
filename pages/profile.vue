<template>
  <div class="profile-page" v-if="user">
    <div class="content">
      <template v-if="!isBallance && !isStatusVip && !isProfileSettings">
        <div class="row">
          <label for="file-upload" class="button button__full">+ Добавьте фото</label>
          <input id="file-upload" type="file" @change="change"
                 style="display:none;">
          <div class="settings-block">
            <i @click="setProfileSettings">
              <SettingsIcon/>
            </i>
            <!--i>
              <EditIcon/>
            </i-->
          </div>
        </div>
        <div class="row" v-if="user.profile">
          <Photos :photos="user.profile && user.profile.pictures" edit
                  :per-page-custom="[[2560,6],[1920,4],[1500, 4], [1440,4], [1250,3] ]"/>
        </div>
        <div class="row">
          <div class="profile-page__info online">
            <p class="name" v-if="user.profile">{{ user.profile.name }}, <span class="age"> {{ user.profile.birth_date | birthday }} </span></p>
          </div>
        </div>
        <div class="row">
<!--          <button class="button button__empty">-->
<!--            <i>-->
<!--              <label class="switch">-->
<!--                <input type="checkbox">-->
<!--                <span class="slider round"></span>-->
<!--              </label>-->
<!--            </i>-->
<!--            <span>Are you ready to meet today?</span>-->
<!--          </button>-->
          <button class="button button__empty" @click="setBallance">
            <i>
              <BallanceIcon/>
            </i>
            <span>Ballance</span>
          </button>
<!--          <button class="button button__empty" @click="setStatusVip">-->
<!--            <i>-->
<!--              <VipIcon/>-->
<!--            </i>-->
<!--            <span>Become a VIP</span>-->
<!--          </button>-->
<!--          <button class="button button__empty">-->
<!--            <i>-->
<!--              <DailyIcon/>-->
<!--            </i>-->
<!--            <span>Daily rewords</span>-->
<!--          </button>-->
<!--          <button class="button button__empty" @click="modals.verificationModal.show = true">-->
<!--            <i>-->
<!--              <VerificationIcon/>-->
<!--            </i>-->
<!--            <span>Verification</span>-->
<!--          </button>-->
<!--          <button class="button button__empty">-->
<!--            <i>-->
<!--              <GuestIcon/>-->
<!--            </i>-->
<!--            <span>Guest</span>-->
<!--          </button>-->
        </div>
      </template>
      <Ballance @setBallance="setBallance" v-if="isBallance"/>
      <StatusVip @setStatusVip="setStatusVip" v-if="isStatusVip"/>
      <ProfileSettings :user="user" @setProfileSettings="setProfileSettings" @updateProfile="updateProfile" v-if="isProfileSettings"/>


    </div>
    <VerificationModal :modal="modals.verificationModal" @close="close"/>
    <PhotosSliderModal
      v-if="user.profile"
      :photos="user.profile && user.profile.pictures"
      :edit="edit"
      :per-page-custom="[[2560,2],[1920,2],[1500,2], [1440,3], [1250,3] ]"
    />
  </div>
</template>

<script>
import Photos from '@/components/Photos';
import Ballance from '@/components/Ballance';
import VerificationModal from '@/components/modals/VerificationModal';
import SettingsIcon from '@/static/icons/settings.svg';
import EditIcon from '@/static/icons/edit.svg';
import VerificationIcon from '@/static/icons/verification.svg';
import BallanceIcon from '@/static/icons/gold.svg';
import VipIcon from '@/static/icons/vip.svg';
import DailyIcon from '@/static/icons/daily.svg';
import GuestIcon from '@/static/icons/guest.svg';
import StatusVip from '@/components/StatusVip';
import PhotosSliderModal from '@/components/modals/PhotosSliderModal';
import ProfileSettings from '@/components/ProfileSettings';

export default {
  components: {
    StatusVip,
    Photos,
    VerificationModal,
    Ballance,
    SettingsIcon,
    EditIcon,
    VerificationIcon,
    VipIcon,
    DailyIcon,
    BallanceIcon,
    GuestIcon,
    PhotosSliderModal,
    ProfileSettings
  },
  data() {
    return {
      isBallance: false,
      isStatusVip: false,
      isProfileSettings: false,
      modals: {
        verificationModal: {
          show: false
        }
      },
      photos: [],
      edit: true,
      image: '',
    }
  },
  methods: {
    setBallance() {
      this.isBallance = !this.isBallance;
    },
    setStatusVip() {
      this.isStatusVip = !this.isStatusVip;
    },
    setProfileSettings() {
      this.isProfileSettings = !this.isProfileSettings;
    },
    async updateProfile() {
      await this.$store.dispatch('user/updateProfile', this.$store.state.user.user.profile).then(data => {
          console.log('update res', data)
        }).catch(e => {
          console.log(e)
          this.loading = false
        })
    },
    close() {
      this.modals.verificationModal.show = false
    },
    async change(event) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      const res = await this.$store.dispatch('media/uploadImage', event.target.files[0])
      const data = await res.json();
      console.log(data, this.$store.state.user.user.profile.pictures.length+1);

      await this.$store.dispatch('user/addProfilePhoto', {file:data._id, index: this.$store.state.user.user.profile.pictures.length+1})
    },
    async uploadImage(file) {

    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  },
  mounted() {

  },
  async fetch() {
  }
}
</script>


<style lang="scss">
.VueCarousel-navigation-next {
  bottom: -109px;
  right: 100px !important;
  top: auto !important;
  outline: none;

  button {
    outline: none;
  }
}

.VueCarousel-navigation-prev {
  bottom: -109px;
  right: 90px !important;
  top: auto !important;
  left: auto !important;
  outline: none;

  button {
    outline: none;
  }
}
</style>
