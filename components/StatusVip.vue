<template>
  <div class="status-vip">
  <span class="back" @click="$emit('setStatusVip')">
       <inline-svg src="/icons/arrow-left.svg"/>
    </span>
    <h2 class="title">Status VIP</h2>
    <div class="ballance-card-block" >
      <div class="row jc-center">
        <ProfileCard :title="'1 day'" :price="5" :activeItem="activeItem" @setCheckCard="setCheckCard" :isVip="true" />
        <ProfileCard :title="'1 week'" :price="5" :activeItem="activeItem" @setCheckCard="setCheckCard" :isVip="false" />
        <ProfileCard :title="'1 mounth'" :price="5" :activeItem="activeItem" @setCheckCard="setCheckCard" :isVip="false" />
        <ProfileCard :title="'1 year'" :price="5" :activeItem="activeItem" @setCheckCard="setCheckCard" :isVip="false" />
      </div>
      <button class="button button__full">{{$t('Pay with')}} <LiqpayIcon/></button>
    </div>
  </div>
</template>

<script>
import BallanceIcon from '@/static/icons/gold.svg';
import LiqpayIcon from '@/static/icons/liqpay.svg'
import ProfileCard from '@/components/ProfileCard';
export default {
  components: {
    BallanceIcon,
    LiqpayIcon,
    ProfileCard
  },
  data(){
    return {
      activeItem:''
    }
  },
  methods:{
    setCheckCard(card){
      this.activeItem = card.name
    },
  }
}
</script>
