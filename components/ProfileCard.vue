<template>
  <div class="profile-card"
       @click.prevent="$emit('setCheckCard', {title, name: title + $t('gold')})"
       :class="{ 'active': activeItem == title + 'gold'}" >
    <div class="row ai-center">
     <div class="row ">
       <BallanceIcon v-if="!isVip"/>
       <VipIcon v-else/>
       <div class="column">
         <span class="profile-card__gold"> {{isVip ? title : title + ' ' + $t('gold')}}</span>
         <div class="profile-card__price">{{ price }} USD</div>
       </div>
     </div>
      <div class="vip-block" v-if="isVip">
        <span>+1 day</span>
      </div>
    </div>
  </div>
</template>

<script>
import BallanceIcon from '@/static/icons/gold.svg';
import VipIcon from '@/static/icons/vip.svg'

export default {
  components:{BallanceIcon, VipIcon},
  props:{
    title:{
      type: Number,
      required: true,
    },
    price:{
      type: Number,
      required: true
    },
    isVip:{
      type: Boolean,
      required:false,
    },
    activeItem:{
      type: String,
      required: true
    }
  }
}
</script>
