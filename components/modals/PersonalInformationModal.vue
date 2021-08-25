<template>
  <div class="overlay">
  <div class="modal personal-information-modal">
     <span class="close" @click="$emit('setPersonalInformation')">
      <inline-svg src="icons/close-modal.svg"/>
    </span>
    <div class="modal-body">
      <h2 class="title">{{ $t('Personal information') }}</h2>
      <div class="personal-information-modal__content">
        <div :ref="`item-${el.id}`" class="personal-information-modal__item" v-for="el in arr" v-bind:key="el.id">
          <div class="item-title" @click="toggleList(el.id)">
            <i>
              <inline-svg :src="`/icons/${el.icon}.svg`"/>
            </i>
            <span>
              {{el.title}}
              <span class="item-title__subtext">{{userData[el.title]}}</span>
            </span>
            <i>
              <ArrowRight/>
            </i>
          </div>
          <div class="item-list">
            <span v-for="item in el.items" v-bind:key="item.value" @click="pickInfo(el.title, item.value, el.id)">{{item.text}}</span>
          </div>
        </div>
      </div>
      <button class="button button__full" @click="save">{{$t('Save')}}</button>
    </div>
  </div>
  </div>
</template>

<script>
import ArrowRight from '@/static/icons/arrow-right-rounded.svg';

export default {
    components: {ArrowRight},
    name:'PersonalInformationModal',
    props:{
    
  },
  data(){
    return {
      arr : [
        {
          id : 1,
          icon : 'arrow-right-rounded',
          title : 'smokes',
          items : [
            {
              value: 'all_times',
              text: 'Употребляю',
            },
            {
              value: 'never',
              text: 'Не употребляю',
            },
            {
              value: 'sometimes',
              text: 'Иногда употребляю',
            }
          ]
        },
        {
          id : 2,
          icon : 'arrow-right-rounded',
          title : 'children',
          items : [
            {
              value: 'have',
              text: 'Есть дети',
            },
            {
              value: 'dont_have',
              text: 'Нет детей',
            },
          ]
        },
        {
          id : 3,
          icon : 'arrow-right-rounded',
          title : 'zodiac',
          items : [
            {
              value: 'Lion',
              text: 'Лев',
            },
            {
              value: 'Scorpio',
              text: 'Скорпион',
            },
            {
              value: 'Fish',
              text: 'Рыбы',
            },
            {
              value: 'Twins',
              text: 'Близнецы',
            }
          ]
        },
        {
          id : 4,
          icon : 'arrow-right-rounded',
          title : 'living',
          items : [
            {
              value: 'own',
              text: 'Свое жилье',
            },
            {
              value: 'rent',
              text: 'Арендую',
            },
          ]
        },
      ]
    }
  },
  computed: {
    userData(){
      return this.$store.state.user.user.profile
    }
  },
  methods:{
    toggleList(id){
      this.$refs[`item-${id}`][0].classList.toggle("opened")
    },
    pickInfo(key,value,id){
      const payload = {};
      payload[key] = value;
      this.toggleList(id);
      this.$store.commit('user/setProfileField', payload);
    },
    save(){
      this.$parent.$emit('updateProfile');
      this.$emit('setPersonalInformation');
    }
  }
}
</script>
