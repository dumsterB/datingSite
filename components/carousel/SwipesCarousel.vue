<template>
  <div class="swipes-carousel">
    <div class="swipes-carousel__card">
      <div class="photos-block">
        <vue-slick-carousel
          v-bind="settings"
          ref="carousel"
          class="carousel-swipes"
        >
          <div v-for="people in peoples" :key="people.id">
            <img :src="require(`/static/img/${people.photo.name}.jpg`)" alt=""/>
          </div>
        </vue-slick-carousel>
        <div class="swipes-carousel__button">
        <span class="swipes-carousel__button-left" @click="handlingArrow('prev')">
           <inline-svg src="/icons/carousel-prev.svg" />`
        </span>
          <span class="swipes-carousel__button-right" @click="handlingArrow('next')">
          <inline-svg src="/icons/carousel-next.svg" />
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    peoples: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      settings: {
        'centerMode': true,
        'centerPadding': '0',
        'focusOnSelect': true,
        'slidesToShow':3,
        'slidesToScroll': 1,
        'waitForAnimate': false,
        'initialSlide': 0,
        'variableWidth': true,
        // "draggable": true,
        // "swipeToSlide":true,
        'lazyLoad': 'ondemand',
        // "adaptiveHeight": true,
        'speed': 600,
        'arrow': false,
        'dots': false,
        'infinite': false,
        // "cssEase": 'linear',
        'responsive': [
          {
            'breakpoint': 1025,
            'settings': {
              'slidesToShow': 3,
              'slidesToScroll': 1,
            }
          },
          {
            'breakpoint': 769,
            'settings': {
              'slidesToShow': 1,
              'slidesToScroll': 1,
            }
          },
          {
            'breakpoint': 350,
            'settings': {
              'slidesToShow': 1,
              'slidesToScroll': 1,
            }
          }
        ]
      }
    }
  },
  methods:{
    handlingArrow(state){
      setTimeout(()=> {
        if (state === 'prev'){
          this.$refs.carousel.prev();
        } else {
          this.$refs.carousel.next();
        }
      }, 300)
    },
  }
}
</script>
