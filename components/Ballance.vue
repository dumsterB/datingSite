<template>
  <div class="ballance">
  <span class="back" @click="$emit('setBallance')">
       <inline-svg src="/icons/arrow-left.svg"/>
    </span>
    <h2 class="title">Ballance</h2>
    <div class="column ai-center" v-if="!isRefill">
      <span class="ballance__bill">10  <BallanceIcon/></span>
      <button class="button button__full" @click="setRefill">Top up</button>
    </div>
   <div class="ballance-card-block" v-else>
     <div class="row jc-center">
       <ProfileCard :title="1" :price="5" :activeItem="activeItem" @setCheckCard="setCheckCard" />
       <ProfileCard :title="10" :price="5" :activeItem="activeItem" @setCheckCard="setCheckCard" />
       <ProfileCard :title="50" :price="5" :activeItem="activeItem" @setCheckCard="setCheckCard" />
       <ProfileCard :title="100" :price="5" :activeItem="activeItem" @setCheckCard="setCheckCard" />
     </div>
     <button class="button button__full">Оплатить c помощью <LiqpayIcon/></button>
   </div>
  </div>
</template>

<script>
import BallanceIcon from '@/static/icons/gold.svg';
import LiqpayIcon from '@/static/icons/liqpay.svg'
import ProfileCard from '@/components/ProfileCard';

export default {
  components:{BallanceIcon,LiqpayIcon, ProfileCard},
  data(){
    return {
      isRefill: false,
      activeItem: '',
    }
  },
  methods:{
    setRefill(){
      this.isRefill = !this.isRefill;
    },
    setCheckCard(card){
      this.activeItem = card.name
    },
  }
}
</script>
