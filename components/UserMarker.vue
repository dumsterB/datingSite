<template>
  <div class="user-marker">
    <div class="user-marker__circle">
      <div class="user-marker__avatar">
        <div @click="openProfile">
          <img :src="img" alt="" />
        </div>
      </div>
    </div>
    <div class="user-marker__triangle" ></div>
    <div v-if="textMessageShow" class="user-marker__message">
      <p class="user-marker__message_text">
        {{ textMessage }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ""
    },
    peopleId: {
      type: String,
      default: ""
    },
    textMessage: {
      type: String,
      default: ""
    }
  },
  data(){
    return{
      textMessageShow:false
    }
  },
  methods:{
    openProfile(){
      if(this.textMessageShow===false){
        this.textMessageShow=true
      }else{
        this.$router.push(`/id/${this.peopleId}`)
      }
    }
  }
};
</script>

<style scoped>
@media (max-width: 1200px) {
  .user-marker__avatar img {
    width: 58px;
    height: 59px;
    border-radius: 50%;
  }
  .user-marker__circle {
    width: 67px;
    height: 68px;
    position: relative;
    background-clip: padding-box;
    border: 5px solid transparent;
    border-radius: 50%;
    z-index: 2;
  }
  .positionChange{
   top:-10px;
   left:-5px
  }
}
</style>
