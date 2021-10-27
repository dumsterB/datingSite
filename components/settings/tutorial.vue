<template>
  <div class="tutorial">
    <img v-if="isMobile" :src="`/img/mob_step_${currentSlide}.png`" />
    <img v-else :src="`/img/step_${currentSlide}.png`" />
    <div class="tooltip" :class="`tooltip__step__${currentSlide}`">
      <div class="row">
        <span>{{ currentSlide }}.</span>
        <p>{{ $t(currentText) }}</p>
      </div>
      <div class="next" @click="next">{{ $t("Next") }}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      currentSlide: 1,
      currentText: "Get more attention. Choose your location",
      windowWidth: window.innerWidth,
      isMobile: false
    };
  },
  computed: {
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
  mounted() {
    this.checkMobile();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    checkMobile(){
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
      } else {
        const id = this.currentSlide + 1;
        const nextSlide = this.slides.find(el => el.id === id);
        this.currentSlide = nextSlide.id;
        this.currentText = nextSlide.text;
      }
    }
  }
};
</script>
