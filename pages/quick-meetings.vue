<template>
  <div class="quick-meetings">
    <div class="content">
      <div class="quick-meetings__map-block">
        <button class="button button__full quick-meetings__button">Stop Quick dating</button>
        <div class="quick-meetings__map">
          <GmapMap
            :center="map"
            :zoom="13"
            style="width: 100%; height: 434px"
            :icon="{ url: require('../static/img/avatar.jpg')}"
          >
            <gmap-marker
              :key="index"
              v-for="(m, index) in quickMeetingsPeoples"
              :position="{lat: m.geo[0], lng: m.geo[1]}"
              :clickable="true"
              :draggable="false"
              :icon="{ 
                url: m.pic ? m.pic.url : require('../static/img/avatar.jpg'),
                size: {width: 100, height: 100, f: 'px', b: 'px',},
                scaledSize: {width: 100, height: 100, f: 'px', b: 'px',},
                }"
            ></gmap-marker>
          </GmapMap>



        </div>
      </div>
      <QuickMeetingList :quickMeetingsPeoples="quickMeetingsPeoples"/>
    </div>
    <QuickMeetingsModal :modal="modals.QuickMeetingsModal" @close="close" @next="next"/>
    <QuickMeetingsMessageModal :modal="modals.QuickMeetingsMessageModal" @close="close" @nextStep="nextStep"/>
  </div>
</template>

<script>
import QuickMeetingList from "@/components/Quick-meeting/QuickMeetingList";
import QuickMeetingsModal from "@/components/modals/QuickMeetingsModal";
import QuickMeetingsMessageModal from "@/components/modals/QuickMeetingsMessageModal";

export default {
  components: {QuickMeetingsModal, QuickMeetingList, QuickMeetingsMessageModal},
  data() {
    return {
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
      markers: [{
        position: {lat: 46.4814079999, lng: 30.70033}
      }, {
        position: {lat: 46.4814079922, lng: 30.70033}
      }]
    }
  },
 async mounted() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((position) => {
        console.log(position.coords)
        this.map.lat = position.coords.latitude
        this.map.lng = position.coords.longitude
         this.$store.dispatch('quick-dating/fetchAllQuickMeetingsPeoples', `${this.map.lat},${this.map.lng}`)
      });
    } else {
      /* местоположение НЕ доступно */
    }
  },
    computed:{
      quickMeetingsPeoples(){
        return this.$store.getters['quick-dating/getQuickMeetingsPeoples']
      }
    },
  methods: {
    close() {
      this.modals.QuickMeetingsModal.show = false
    },
    next() {
      this.modals.QuickMeetingsModal.show = false;
      this.modals.QuickMeetingsMessageModal.show = true
    },
    nextStep() {
      this.modals.QuickMeetingsMessageModal.show = false
    }
  }
}
</script>

<style scoped>

</style>
