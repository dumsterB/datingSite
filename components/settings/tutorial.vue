<template>
  <div class="tutorial">
    <!--div class="tutorial__slide" :style="{ backgroundImage: 'url(' + '/img/step_1.png' + ')' }" @click="redirect">
        1
    </div-->
    <img :src="`/img/step_${currentSlide}.png`">
    <div class="tooltip" :class="`tooltip__step__${currentSlide}`">
        <div class="row">
            <span>{{currentSlide}}.</span>
            <p>{{ $t(currentText)}}</p>
        </div>
        <div class="next" @click="next">{{$t('Next')}}</div>
    </div>
  </div>
</template>

<script>

export default {
  components: { },
  data() {
    return {
        currentSlide : 1,
        currentText : 'Get more attention. Choose your location',
        //currentImage : '/img/step_1.png'
    };
  },
  computed : {
      slides(){
          return [
              {
                  id : 1,
                  text : 'Get more attention. Choose your location',
                  image : '/img/step_1.png'
              },
              {
                  id : 2,
                  text : 'Chat with those who are ready for meetings',
                  image : 'src'
              },
              {
                  id : 3,
                  text : 'And attach SMS so that users can see it',
                  image : 'src'
              },
              {
                  id : 4,
                  text : 'Going into fast dates, you get on the list of ready to meet',
                  image : 'src'
              }
          ]
      }
  },
  methods: {
      redirect(){
          this.$emit('setTutorial')
      },
      next(){
        if(this.currentSlide === 4){
            this.$parent.$emit('setPadding')
            this.$emit('setTutorial')
        } else {
            const id = this.currentSlide + 1
            const nextSlide = this.slides.find(el => el.id === id)
            
            this.currentSlide = nextSlide.id;
            this.currentText = nextSlide.text;
            //this.currentImage = nextSlide.image
        }
          
      }
  }
};
</script>
