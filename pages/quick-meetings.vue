<template>
  <div class="quick-meetings">
    <div class="content">
      <div class="quick-meetings__map-block">
        <button class="button button__full quick-meetings__button">
          <router-link :to="{path: '/profile' }">
            {{$t('End dating')}}
          </router-link>
        </button>
        <div class="quick-meetings__map">
          <GmapMap :center="map" :zoom="12" style="flex:1">
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
          </GmapMap>
        </div>
        <QuickMeetingList :quickMeetingsPeoples="quickMeetingsPeoples" />
      </div>
    </div>
    <QuickMeetingsModal
      v-show="showModal"
      :modal="modals.QuickMeetingsModal"
      @close="close"
      @next="next"
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

export default {
  components: {
    QuickMeetingsModal,
    QuickMeetingList,
    QuickMeetingsMessageModal,
    GmapCustomMarker,
    UserMarker
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
      map: {
        lat: 0,
        lng: 0
      },
      markers: [
        {
          position: { lat: 46.4814079999, lng: 30.70033 }
        },
        {
          position: { lat: 46.4814079922, lng: 30.70033 }
        }
      ]
    };
  },
  async mounted() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.map.lat = position.coords.latitude;
        this.map.lng = position.coords.longitude;
        this.$store.dispatch(
          "quick-dating/fetchAllQuickMeetingsPeoples",
          `${this.map.lat},${this.map.lng}`
        );
      });
    } else {
      /* местоположение НЕ доступно */
    }
  },
  computed: {
    quickMeetingsPeoples() {
      return this.$store.getters["quick-dating/getQuickMeetingsPeoples"];
    },
    user() {
      return this.$store.getters["user/user"];
    },
    showModal(){
      if(this.user.profile){
        return this.user.profile.gender === 'male' ? true : false;
      }
    }
  },
  methods: {
    close() {
      this.modals.QuickMeetingsModal.show = false;
    },
    next() {
      this.modals.QuickMeetingsModal.show = false;
      this.modals.QuickMeetingsMessageModal.show = true;
    },
    nextStep() {
      this.modals.QuickMeetingsMessageModal.show = false;
    }
  }
};
</script>

<style scoped></style>
