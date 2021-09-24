<template>
  <div class="overlay"
       v-if="this.$glob.modals.photoSliderModal.show"
       ref="overlay"
       @click="close">
       <span class="close-gallery" @click="$glob.modals.photoSliderModal.show = false">
         <Component
            :is="require(`@/static/icons/close-modal.svg`).default"
            class="BaseIcon"
            v-bind="$attrs"
            @v-on="$listeners"
          />
       </span>
    <div class="modal photo-slider-modal">
      
      <vue-slick-carousel
        v-bind="settings"
        ref="carousel"
        class="carousel"
      >
        <div v-for="(photo, index) in  photos" :key="index" :data-key="index">
          <div class="row jc-center" v-if="edit">
           <span class="icons-row" @click="setMainPhoto(index)">
              <Component
                :is="require(`@/static/icons/make-main.svg`).default"
                class="BaseIcon"
                v-bind="$attrs"
                @v-on="$listeners"
              />
             {{$t('Make the main')}}
           </span>
            <span class="icons-row" @click="deletePhoto(index)">
              <Component
                :is="require(`@/static/icons/delete.svg`).default"
                class="BaseIcon"
                v-bind="$attrs"
                @v-on="$listeners"
              />
            {{$t('Delete')}}
           </span>
          </div>
          <div class="carousel-item">
            <img :src="photo.url" alt=""/>
          </div>
        </div>
      </vue-slick-carousel>
      <div class="photo-slider-modal__button">
        <span class="photo-slider-modal__button-left" @click="handlingArrow('prev')">
           <inline-svg src="/icons/carousel-prev.svg"/>`
        </span>
        <span class="photo-slider-modal__button-right" @click="handlingArrow('next')">
          <inline-svg src="/icons/carousel-next.svg"/>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    photos: {
      type: Array,
      required: true
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
  data() {
    return {
      settings: {
        'centerMode': true,
        'centerPadding': '70px',
        'focusOnSelect': true,
        'slidesToShow': 1,
        'slidesToScroll': 1,
        'variableWidth': true,
        'waitForAnimate': false,
        // "draggable": true,
        'swipeToSlide': false,
        'lazyLoad': 'ondemand',
        // "adaptiveHeight": true,
        'speed': 700,
        'arrow': false,
        'dots': false,
        'infinite': false,
        // "cssEase": 'linear',
        'responsive': []
      }
    }
  },
  watch: {
    '$route.query'() {
      this.goToo();
    }
  },
  created: function() {
    document.addEventListener('keyup', this.myMethod);
  },
  methods: {
    goToo() {
      let carousel = this.$refs.carousel;
      Number(this.$route.query.To) && carousel.goTo(Number(this.$route.query.To))
    },
    handlingArrow(state) {
      setTimeout(() => {
        switch (state) {
          case 'prev':
            return this.$refs.carousel.prev();
          case 'next':
            return this.$refs.carousel.next();
          default:
        }
      }, 100)
    },
    close(e) {
      let container = this.$refs.overlay;
      if (container === e.target) {
        this.$glob.modals.photoSliderModal.show = false
      }
    },
    deletePhoto(inx){
      this.$store.dispatch('user/removeProfilePhoto', {index: inx})
    },
    setMainPhoto(inx){
      this.$store.dispatch('user/makeProfilePhotoMain', {index: inx})
    }
  },
  computed: {
    navigationNext() {
      return ` <img src="/icons/carousel-next.svg" />`
    },
    navigationPrev() {
      return ` <img src="/icons/carousel-prev.svg" />`
    },
  }
}
</script>


<style lang="scss">
.VueCarousel-navigation-prev {
  left: 50% !important;
  transform: translateY(-50%) translateX(-100%);
}

.VueCarousel-navigation-next {
  right: 50% !important;
  transform: translateY(-50%) translateX(-100%);
}
.close-gallery{
    position: absolute;
    z-index: 9999;
    right: 10px;
    top: 10px;
}
</style>
