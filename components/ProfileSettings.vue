<template>
  <div class="profile-settings">
    <div class="row">
      <label for="file-upload" class="button button__full">+ {{$t('Add photo')}}</label>
      <input id="file-upload" type="file" style="visibility:hidden;width:0.1px"/>
      <div class="settings-block">
        <button @click="$emit('setProfileSettings')" class="button button__empty">
          {{$t('Cancel')}}
        </button>
        <button @click="$emit('updateProfile')" class="button button__full">
          {{$t('Save')}}
        </button>
      </div>
    </div>
    <div class="row" v-if="user.profile">
          <Photos :photos="user.profile && user.profile.pictures" edit
                  :per-page-custom="[[2560,6],[1920,4],[1500, 4], [1440,4], [1250,3] ]"/>
    </div>
    <div class="row">
        <div class="profile-page__info online">
        <p class="name" v-if="user.profile">{{ user.profile.name }}, <span class="age"> {{ user.profile.birth_date | birthday }}</span></p>
        </div>
    </div>
    <div class="row">
        <div ref="info" class="button button__empty">
            <div class="settings-item" @click="showBlock('info')">
                <span class="heading">{{ user.profile.name }}, {{ user.profile.birth_date | birthday }}</span>
                <span class="text">{{ gender }}, {{ city }}</span>
                <div class="expanded">
                    <div class="sex-block">
                        <span class="sex-block__title">{{$t('Sex')}}:</span>
                        <div class="sex-block__radio">
                            <span>
                                <input type="radio" id="mail" value="male" v-model="gender">
                                <label for="mail">{{$t('Male')}}</label>
                            </span>
                            <span>
                                <input type="radio" id="female" value="female" v-model="gender">
                                <label for="female">{{$t('Female')}}</label>
                            </span>
                        </div>
                    </div>
                    <div class="city-block">
                        <span class="sex-block__title">{{$t('City')}} :</span>
                        <input type="text" name="city" v-model="city" class="input-default">
                    </div>
                </div>
            </div>
            <div class="back" @click="hideBlock('info')">
                <inline-svg src="/icons/arrow-right.svg"/>
            </div>
        </div>

        <div class="button button__empty" @click="setPersonalInformation">
            <div class="settings-item">
                <span class="heading">{{ $t('Personal information') }}</span>
                <span class="text">Tell best things happened to you</span>
            </div>
            <span class="back">
                <inline-svg src="/icons/arrow-right.svg"/>
            </span>
        </div>
        <PersonalInformation v-if="isPersonalInformation" @setPersonalInformation="setPersonalInformation"></PersonalInformation>

        <div ref="job" class="button button__empty">
            <div class="settings-item" @click="showBlock('job')">
                <span class="heading">{{ $t('Job') }}</span>
                <span class="text">{{ user.profile.job }}</span>
                <div class="expanded">
                    <span>
                        <input type="text" name="job" v-model="job" class="input-default">
                    </span>
                </div>
            </div>
            <span class="back" @click="hideBlock('job')">
                <inline-svg src="/icons/arrow-right.svg"/>
            </span>
        </div>

        <div class="button button__empty" @click="setInterests">
            <div class="settings-item">
                <span class="heading">{{ $t('Interests') }}</span>
                <span class="text">Tell best things happened to you</span>
            </div>
            <span class="back">
                <inline-svg src="/icons/arrow-right.svg"/>
            </span>
        </div>
        <Interests v-if="isInterests" @setInterests="setInterests"></Interests>

        <div ref="short" class="button button__empty">
            <div class="settings-item" @click="showBlock('short')">
                <span class="heading">{{ $t('Shortly about myself') }}</span>
                <span class="text">{{description}}</span>
                <div class="expanded">
                    <span>
                        <input type="text" name="" v-model="description" class="input-default">
                    </span>
                </div>
            </div>
            <span class="back" @click="hideBlock('short')">
                <inline-svg src="/icons/arrow-right.svg"/>
            </span>
        </div>

        <div class="button button__empty">
            <div class="settings-item">
                <span class="heading">{{ $t('Phone number') }}</span>
                <span class="text">{{user.mobile}}</span>
            </div>
            <span class="back">
                <inline-svg src="/icons/arrow-right.svg"/>
            </span>
        </div>
    </div>
    <div class="row">
        <span class="delete" @click="setConfirmProfleDelete">
            <inline-svg src="/icons/trash.svg"/>
            {{$t('Delete account')}}
        </span>
    </div>
    <ConfirmProfileDelete v-if="isConfirmProfleDelete" @setConfirmProfleDelete="setConfirmProfleDelete"></ConfirmProfileDelete>
  </div>
</template>

<script>
import PersonalInformation from "@/components/modals/PersonalInformationModal";
import Interests from "@/components/modals/InterestsModal";
import ConfirmProfileDelete from "@/components/modals/ConfirmProfileDeleteModal";

export default {
  components: { PersonalInformation, Interests, ConfirmProfileDelete },
  props : ['user'],
  data() {
    return {
      isPersonalInformation: false,
      isInterests: false,
      isConfirmProfleDelete: false
    };
  },
  computed: {
        gender: {
            get () {
                return this.$store.state.user.user.profile.gender
            },
            set(value) {
                this.$store.commit('user/setProfileField', {gender : value})
            }
        },
        city: {
            get () {
                return this.$store.state.user.user.profile.city
            },
            set(value) {
                this.$store.commit('user/setProfileField', {city : value})
            }
        },
        job: {
            get () {
                return this.$store.state.user.user.profile.job
            },
            set(value) {
                this.$store.commit('user/setProfileField', {job : value})
            }
        },
        description: {
            get () {
                return this.$store.state.user.user.profile.description
            },
            set(value) {
                this.$store.commit('user/setProfileField', {description : value})
            }
        },
  },
  methods: {
    setPersonalInformation(){
        this.isPersonalInformation = !this.isPersonalInformation;
    },
    setInterests(){
        this.isInterests = !this.isInterests;
    },
    setConfirmProfleDelete(){
        this.isConfirmProfleDelete = !this.isConfirmProfleDelete;
    },
    showBlock(id){
      this.$refs[id].classList.add('opened')
    },
    hideBlock(id) {
      this.$refs[id].classList.remove('opened')
    },
    deleteProfile(){
        alert('Deleting')
    }
  }
};
</script>
