<template>
  <div class="overlay">
    <div class="modal interests-modal">
      <span class="close" @click="$emit('setInterests')">
        <inline-svg src="icons/close-modal.svg"/>
      </span>
      <div class="modal-body">
        <h2 class="title">{{ $t("Interests") }}</h2>

        <p class="text">
          <input type="text" :placeholder="$t('I\'m interested in...')" v-model="newInterest">
          <span class="icon-add">
            <Component
              :is="require(`@/static/icons/plus.svg`).default"
              class="BaseIcon"
              v-bind="$attrs"
              @v-on="$listeners"
              @click="addInterest(newInterest)"
            />
          </span>
        </p>

        <div class="interests-list">
          <div v-for="(interest, index) in userInterests" :key="index" class="interest">
            <p @click="deleteInterest(interest)">{{ interest }}</p>
          </div>
        </div>
        <p class="interests-popular">{{ $t("Popular") }}</p>
        <div class="interests-list">
          <div v-for="(interest, index) in popularInterests" :key="index" class="interest">
            <p @click="addInterest(interest)">{{ interest }}</p>
          </div>
        </div>
        <div class="controls">
          <button type="button" @click="close" class="button button__cancel">
            {{ $t("Cancel") }}
          </button>
          <button type="button" @click="save" class="button button__control">
            {{ $t("Save") }}
          </button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import InterestsList from "~/components/Interests/InterestsList";

export default {
    name:'InterestsModal',
    components:{InterestsList},
    data(){
    return {
      newInterest : '',
      popularInterests : ['Swimming', 'Soccer', 'Tennis', 'Sport', 'Sleep']
    }
  },
  computed: {
    userInterests(){
      return new Set([...this.$store.state.user.user.profile.interests]);
    }
  },
  methods:{
    addInterest(interest){
      if(interest.length > 0){
        this.userInterests.add(interest);
        this.$store.commit('user/setProfileField', {interests: [...this.userInterests]});
        this.newInterest = '';
      }
    },
    deleteInterest(interest){
      this.userInterests.delete(interest);
      this.$store.commit('user/setProfileField', {interests: [...this.userInterests]});
    },
    save(){
      this.$parent.$emit('updateProfile');
      this.$emit('setInterests');
    },
    close(){
      this.newInterest = '';
      this.$emit('setInterests');
    }
  }
}
</script>
