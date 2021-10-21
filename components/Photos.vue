<template>
  <carousel
    :per-page-custom="$props.perPageCustom"
    :navigationEnabled="false"
    :paginationEnabled="true"
    :navigation-next-label="navigationNext"
    :navigation-prev-label="navigationPrev"
    class="carousel"

  >
    <slide v-for="(photo, index) in  photos" :key="index" :data-key="index">
      <router-link :to="{path:'', query: { To: index }}" append >
        <div class="carousel-item" :style="{ backgroundImage: 'url(' + photo.url + ')' }" @click="openPhotoModal">
            <!--img :src="photo.url" @click="openPhotoModal"/-->
        </div>
      </router-link>
    </slide>
  </carousel>
</template>

<script>
export default {
  props:{
    photos:{
      type: Array ,
    },
    perPageCustom: {
      default: [[320, 2], [1199, 4]],
      type: Array,
      required: false
    },
    edit:{
      type: Boolean,
      required:false
    }
  },
  methods:{
    openPhotoModal(){
      this.$glob.modals.photoSliderModal.show = true
    }
  },

  computed:{
    navigationNext() {
      return ` <img src="/icons/carousel-next.svg" />`
    },
    navigationPrev() {
      return ` <img src="/icons/carousel-prev.svg" />`
    },
  }
}
</script>
