<template>
  <div class="overlay" v-if="qDateOff">
  <div class="modal quick-meeting-modal">
     <span class="close" @click="$router.push('/profile')">
      <inline-svg src="icons/close-modal.svg"/>
    </span>

    <div v-if="topUp">
      <form
        class="ballance-card-block"
        method="POST"
        accept-charset="utf-8"
        action="https://www.liqpay.ua/api/3/checkout"
      >
        <input type="hidden" name="data" :value="quickMeetingsLiqpay.data" />
        <input type="hidden" name="signature" :value="quickMeetingsLiqpay.signature" />
        <div class="row jc-center">
          <ProfileCard :title="1" :price="0.99" :activeItem="activeItem" @setCheckCard="setCheckCard" />
          <ProfileCard :title="10" :price="8.99" :activeItem="activeItem" @setCheckCard="setCheckCard" />
          <ProfileCard :title="50" :price="32.99" :activeItem="activeItem" @setCheckCard="setCheckCard" />
          <ProfileCard :title="100" :price="54.99" :activeItem="activeItem" @setCheckCard="setCheckCard" />
        </div>
        <button class="button button__full">Оплатить c помощью <LiqpayIcon/></button>
      </form>
    </div>

    <div class="modal-body" v-else>
      <h2 class="title">Быстрые свидания</h2>
      <p class="text">Назначай встречу прямо сейчас.</p>
      <span class="quick-meeting-modal__icon">
       <inline-svg src="icons/quick-meetings-modal.svg"/>
     </span>
      <p class="quick-meeting-modal__description">Общайся с пользователями, которые готовы к знакомству вживую.</p>
      <!--button class="button button__full" @click="$emit('next')">Войти</button-->
      <div>
        <input type="hidden" name="data" :value="quickMeetingsLiqpay.data" />
        <input type="hidden" name="signature" :value="quickMeetingsLiqpay.signature" />
        <button
          class="button button__full liqpay-btn"
          @click="topUpBalance"
          onmouseover="this.style.opacity='0.5';"
          onmouseout="this.style.opacity='1';">
          <img src="https://static.liqpay.ua/buttons/logo-small.png" name="btn_text" class="liqpay-img"/>
          <span>Купить монеты</span>
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name:'SentPasswordModal',
  props:{
    modal:{
      type: Object,
      required: true
    }
  },
  data() {
    return {
      topUp: false,
    }
  },
  computed: {
    quickMeetingsLiqpay() {
      return this.$store.getters["quick-dating/getQuickMeetingsLiqpay"];
    },
    getUserData() {
      return this.$store.getters["user/user"];
    },
    coins() {
      return this.$store.getters["user/coins"];
    },
    qDateOff() {
      let showWindow = true
      if (this.coins.coins <= 0) {
        showWindow = true
      } else if (this.$ws.store.qDateOff.length) {
        showWindow = this.getUserData.profile.gender !== "female";
      } else {
        showWindow = false
      }
      return showWindow
    }
  },
  methods: {
    topUpBalance() {
      this.topUp = true
    },
    async setCheckCard(card){
      this.activeItem = card.name
      await this.$store.dispatch('quick-dating/generateLiqpay', { "amount" : card.title });
    },
  },
  async created(){
    await this.$store.dispatch('quick-dating/generateLiqpay', { "amount" : 10 });
    if (this.coins.coins > 0) {
      await this.$store.dispatch("quick-dating/wantQdate", { "status": this.modal.show });
    }
  }
}
</script>


<style>
[v-cloak] {
  display: none;
}
.liqpay-btn{
  min-width: 250px;
}
.liqpay-img{
  margin-right: 7px !important;
}
</style>
