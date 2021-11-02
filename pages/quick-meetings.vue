<template>

  <div class="quick-meetings" v-if="user.profile && map">
    <!-- app -->
    <div id="app" class="modal-vue">

      <!-- button show -->

      <!-- overlay -->
      <div class="overlay" v-if="errorModal"></div>

<!--      &lt;!&ndash; modal &ndash;&gt;-->
<!--      <div class="modal" v-if="showModal">-->
<!--        <button class="button close" @click="showModal = false">Пожалуйста,включите GPS</button>-->
<!--      </div>-->

      <!-- modal -->
      <div class="modal" v-if="errorModal">
        <button class="button close" @click="getLocation">{{errorMessage}}</button>
      </div>

    </div>
    <button class="button  button__full quick-meetings__button changeState d-flex" v-if="!isVisable"
            @click="changeState">
      Пройти обучение
    </button>
    <button class="button  button__full quick-meetings__button changeState d-flex" v-if="isVisable" @click="skipLesson">
      Пропустить
    </button>
    <div class="content" style="width: 100%">
      <div class="tutorial" :class="isVisable ? '' :'isVisable'">
        <img v-if="isMobile" :src="`/img/mob_step_${currentSlide}.png`"/>
        <img v-else :src="`/img/step_${currentSlide}.png`"/>
        <div class="tooltip" :class="`tooltip__step__${currentSlide}`">
          <div class="row">
            <span>{{ currentSlide }}.</span>
            <p>{{ $t(currentText) }}</p>
          </div>
          <div class="next" @click="next">{{ $t("Next") }}</div>
        </div>
      </div>
      <div class="quick-meetings__map-block">
        <button class="button button__full quick-meetings__button endDating d-flex">
          <router-link :to="{path: '/profile' }">
            {{ $t('End dating') }}
          </router-link>
        </button>
        <div class="quick-meetings__map">
          <GmapMap :center="map" :zoom="16" style="flex:1">
            <GmapCustomMarker
              v-for="(m, i) in quickMeetingsPeoples"
              :key="i"
              :marker="{ lat: m.geo[1], lng: m.geo[0] }"
            >
              <UserMarker
                :img="m.pic ? m.pic.url : require('../static/img/avatar.jpg')"
                :peopleId="m._id"
                :textMessage="textMessage"
              />
            </GmapCustomMarker>
            <GmapCustomMarker
              :marker="{ lat: map.lat, lng: map.lng }"
              v-if="map.lat && map.lng"
            >
              <UserMarker
                :img="(user.profile.pictures[0]) ? user.profile.pictures[0].url : require('../static/img/avatar.jpg')"
                :peopleId="user._id"
              />
            </GmapCustomMarker>
          </GmapMap>

        </div>
        <QuickMeetingList :quickMeetingsPeoples="quickMeetingsPeoples"/>
      </div>
    </div>
    <QuickMeetingsModal
      v-show="showModal"
      :modal="modals.QuickMeetingsModal"
      @close="close"
      @next="nextS"
    />
    <QuickMeetingsMessageModal
      :modal="modals.QuickMeetingsMessageModal"
      :users="quickMeetingsPeoples"
      @close="close"
      @nextStep="nextStep"
    />
  </div>
</template>

<script>
import QuickMeetingList from "@/components/Quick-meeting/QuickMeetingList";
import QuickMeetingsModal from "@/components/modals/QuickMeetingsModal";
import QuickMeetingsMessageModal from "@/components/modals/QuickMeetingsMessageModal";
import GmapCustomMarker from "vue2-gmap-custom-marker";
import UserMarker from "@/components/UserMarker.vue";
import Tutorial from '../components/settings/tutorial'

export default {
  components: {
    QuickMeetingsModal,
    QuickMeetingList,
    QuickMeetingsMessageModal,
    GmapCustomMarker,
    UserMarker,
    Tutorial
  },
  data() {
    return {
      textMessage:
        "Et ipsum reprehenderit minim fugiat adipisicing. Laborum esse incididunt irure eiusmod pariatur. Incididunt ea aute",
      modals: {
        QuickMeetingsModal: {
          show: true
        },
        QuickMeetingsMessageModal: {
          show: false
        }
      },
      errorModal: false,
      errorMessage: '',
      map: {
        lat: null,
        lng: null
      },
      markers: [
        {
          position: {lat: 46.4814079999, lng: 30.70033}
        },
        {
          position: {lat: 46.4814079922, lng: 30.70033}
        }
      ],
      currentSlide: 1,
      isVisable: false,
      currentText: "Get more attention. Choose your location",
      windowWidth: window.innerWidth,
      isMobile: false
    };
  },
  mounted() {
    this.getLocation()
    this.checkMobile();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  computed: {
    quickMeetingsPeoples() {
      return this.$store.getters["quick-dating/getQuickMeetingsPeoples"];
    },
    user() {
      return this.$store.getters["user/user"];
    },
    slides() {
      return [
        {
          id: 1,
          text: "Get more attention. Choose your location"
        },
        {
          id: 2,
          text: "Chat with those who are ready for meetings"
        },
        {
          id: 3,
          text: "And attach SMS so that users can see it"
        },
        {
          id: 4,
          text: "Going into fast dates, you get on the list of ready to meet"
        },
        {
          id: 5,
          text: "Any plans for the evening? Click \"End Dating\""
        }
      ];
    }
  },
  methods: {
    getLocation() {
      this.errorModal = false;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          this.map.lat = position.coords.latitude;
          this.map.lng = position.coords.longitude;
          this.$store.dispatch(
            "quick-dating/fetchAllQuickMeetingsPeoples",
            `${this.map.lat},${this.map.lng}`
          );
        }, function (error) {
          this.errorModal = true
          switch (error.code) {
            case 1:
              this.errorMessage = 'Turn on geolocation and try again'
              break
            case 2:
              this.errorMessage = 'We can not find you, try later'
              break
            case 3:
              this.errorMessage = 'Try again, that took too much time'
              break
          }
          console.log(error)
        }.bind(this), {timeout: 10000});
      } else {
        this.errorModal = true
        this.errorMessage = 'Your browser does not support geolocation'
        /* местоположение НЕ доступно */
        console.log('местоположение НЕ доступно')
      }
    },
    skipLesson() {
      this.isVisable = !this.isVisable
    },
    changeState() {
      this.isVisable = !this.isVisable
      this.currentSlide = 1
    },
    checkMobile() {
      if (this.windowWidth < 500) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      this.checkMobile();
    },
    next() {
      if (this.currentSlide === 5) {
        this.$parent.$emit("setPadding");
        this.$emit("setTutorial");
        this.isVisable = false
      } else {
        const id = this.currentSlide + 1;
        const nextSlide = this.slides.find(el => el.id === id);
        this.currentSlide = nextSlide.id;
        this.currentText = nextSlide.text;
      }
    },
    close() {
      this.modals.QuickMeetingsModal.show = false;
    },
    nextS() {
      this.modals.QuickMeetingsModal.show = false;
      this.modals.QuickMeetingsMessageModal.show = true;
    },
    nextStep() {
      this.modals.QuickMeetingsMessageModal.show = false;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
<style scoped>

@media (max-width: 1200px) {
  .modal {
    width: 350px;
  }

  .content {
    margin-top: 52px;
  }

  .changeState {
    margin-top: 60px;
    position: fixed;
  }

  .modal-vue .modal {
    z-index: 9999;
    margin-left: 1px !important;
    justify-content: center;
    display: flex;
    background: none;
  }

  .modal .button {
    max-width: 100px !important;
  }
}

.modal-vue .overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
}

.modal-vue .modal {
  z-index: 9999;
  margin-left: 200px;
  justify-content: center;
  display: flex;
  background: none;
}

.modal-vue .close {
  position: absolute;
  justify-content: center;
  display: flex;
  align-content: center;
}

.close {
  background: linear-gradient(94deg, #133983 -12.18%, #71BC6F 134.71%);
  color: white;
  box-shadow: none;
  border-radius: 50px;
}

.modal .close {
  position: absolute;
  top: 1px !important;
  left: 20px !important;
  margin-top: 25px;
  width: 500px !important;
  cursor: pointer;
}

.modal .button {
  max-width: 300px !important;
}
.endDating{
  opacity: 0.6!important;
}

</style>
