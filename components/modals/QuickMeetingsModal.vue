<template>
  <div class="overlay" v-if="qDateOff">
  <div class="modal quick-meeting-modal">
     <!--span class="close" @click="$emit('close')">
      <inline-svg src="icons/close-modal.svg"/>
    </span-->
    <div class="modal-body">
      <h2 class="title">Быстрые свидания</h2>
      <p class="text">Назначай встречу прямо сейчас.</p>
      <span class="quick-meeting-modal__icon">
       <inline-svg src="icons/quick-meetings-modal.svg"/>
     </span>
      <p class="quick-meeting-modal__description">Общайся с пользователями, которые готовы к знакомству вживую.</p>
      <!--button class="button button__full" @click="$emit('next')">Войти</button-->
      <form method="POST" accept-charset="utf-8" action="https://www.liqpay.ua/api/3/checkout">
        <input type="hidden" name="data" :value="quickMeetingsLiqpay.data" />
        <input type="hidden" name="signature" :value="quickMeetingsLiqpay.signature" />
        <button
          class="button button__full liqpay-btn"
          onmouseover="this.style.opacity='0.5';"
          onmouseout="this.style.opacity='1';">
          <img src="https://static.liqpay.ua/buttons/logo-small.png" name="btn_text" class="liqpay-img"/>
          <span>Купить 10 монет</span>
        </button>
      </form>
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
  computed: {
    quickMeetingsLiqpay() {
      return this.$store.getters["quick-dating/getQuickMeetingsLiqpay"];
    },
    getUserData() {
      return this.$store.getters["user/user"];
    },
    qDateOff() {
      let showWindow = false
      if (this.$ws.store.qDateOff.length) {
        console.log("gender", this.getUserData.profile.gender);
        showWindow = this.getUserData.profile.gender !== "female";
      } else {
        showWindow = false
      }
      return showWindow
    }
  },
  async created(){
    await this.$store.dispatch('quick-dating/generateLiqpay', { "amount" : 10 });
    await this.$store.dispatch("quick-dating/wantQdate", { "status": this.modal.show });
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
