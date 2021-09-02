<template>
  <div class="profile profile-page profile-swipe">
    <div class="content" v-if="user.profile">
      <div class="row">
        <span @click="$router.go(-1)" style="cursor: pointer">
          <inline-svg src="/icons/arrow-left.svg" />
        </span>
      </div>
      <div class="row">
        <Photos
          :photos="user && user.profile.pictures"
          :per-page-custom="[
            [2560, 6],
            [1920, 4],
            [1500, 4],
            [1440, 4],
            [1250, 3]
          ]"
        />
      </div>
      <div class="row">
        <div class="profile-page__info profile-swipe__info">
          <div class="left-block">
            <p class="name online">
              {{ user.profile.name }},
              <span class="age"> {{ user.profile.birth_date | birthday }}</span>
            </p>
            <span class="city">Odessa <span>32km</span> </span>
            <p class="profile-swipe__about">
              Lorem Lorem labore exercitation mollit magna qui amet aute elit id
              occaecat culpa velit...
            </p>
            <div class="right-block-mobile">
              <h2 class="profile-swipe__title-about">About me</h2>
              <div class="profile-swipe__general-information">
                <div class="row">
                  <span class="text">Height</span>
                  <span class="value">{{ user.profile.height }}</span>
                </div>
                <div class="row">
                  <span class="text">Weight</span>
                  <span class="value">{{ user.profile.weight }}</span>
                </div>
                <div class="row">
                  <span class="text">Job</span>
                  <span class="value">{{ user.profile.job }}</span>
                </div>
                <div class="row">
                  <span class="text">Children</span>
                  <span class="value">{{ user.profile.children }}</span>
                </div>
                <div class="row">
                  <span class="text">Physique</span>
                  <span class="value">{{ user.profile.physique }}</span>
                </div>
              </div>
              <div class="profile-swipe__additional-options">
                <div class="row">
                  <span class="button__empty">
                    <Icon name="micro" />
                  </span>
                  <span class="button__empty" @click="chatEnter">
                    <icon name="swipe-chat" />
                  </span>
                </div>
              </div>
            </div>
            <h2 class="profile-swipe__title-interests">Interests</h2>
            <InterestsList :interests="user.profile.interests" />
            <div class="profile-swipe__additional-options">
              <span @click="$store.commit('chat/setBlockModal')">
                <Icon name="block-off" />
                {{ $t("Block") }}
              </span>
              <span>
                <Icon name="complain" />
                {{ $t("Complain") }}
              </span>
            </div>
          </div>
          <div class="right-block">
            <h2 class="profile-swipe__title-about">About me</h2>
            <div class="profile-swipe__general-information">
              <div class="row">
                <span class="text">Height</span>
                <span class="value">{{ user.profile.height }}</span>
              </div>
              <div class="row">
                <span class="text">Weight</span>
                <span class="value">{{ user.profile.weight }}</span>
              </div>
              <div class="row">
                <span class="text">Job</span>
                <span class="value">{{ user.profile.job }}</span>
              </div>
              <div class="row">
                <span class="text">Children</span>
                <span class="value">{{ user.profile.children }}</span>
              </div>
              <div class="row">
                <span class="text">Physique</span>
                <span class="value">{{ user.profile.physique }}</span>
              </div>
            </div>
            <div class="profile-swipe__additional-options">
              <div class="row">
                <span class="button__empty">
                  <Icon name="micro" />
                </span>
                <span class="button__empty" @click="chatEnter">
                  <icon name="swipe-chat" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ComplainModal :modal="modals.complainModal" @close="close" @done="done" />
    <PhotosSliderModal
      v-if="user.profile"
      :photos="user.profile && user.profile.pictures"
      :edit="false"
      :per-page-custom="[
        [2560, 2],
        [1920, 2],
        [1500, 2],
        [1440, 3],
        [1250, 3]
      ]"
    />
  </div>
</template>

<script>
import Photos from "~/components/Photos";
import InterestsList from "~/components/Interests/InterestsList";
import ComplainModal from "~/components/modals/ComplainModal";
import Icon from "@/components/Icon";
import PhotosSliderModal from "@/components/modals/PhotosSliderModal";
export default {
  components: { Icon, ComplainModal, InterestsList, Photos, PhotosSliderModal },
  data() {
    return {
      modals: {
        complainModal: {
          show: false
        }
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/getSelectedUser"];
    },
    getChatId() {
      let chatId = "";
      this.$store.getters["chat/getContacts"].forEach(el => {
        if (el.initiator === this.user._id) {
          chatId = el._id;
        }
      });
      return chatId;
    }
  },
  methods: {
    close() {
      this.$store.commit("chat/setBlockModal");
    },
    done(payload) {
      console.log(payload);
      this.$store.commit("chat/setBlockModal");
      this.$router.go(-1);
    },
    chatEnter() {
      console.log(this.$store.state.chat);
      this.$router.push({
        path: `/chat/${this.user._id}`,
        query: { chat_id: this.getChatId }
      });
    }
  },
  async fetch() {
    await this.$store.dispatch("user/userById", this.$route.params.id);
  }
};
</script>
