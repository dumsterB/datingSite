<template>
  <div class="ballance">
    <div class="ballance-title">
      <span class="back" @click="$emit('setBallance')">
        <inline-svg src="/icons/arrow-left.svg" />
      </span>
      <h2 class="title">Ballance</h2>
    </div>
    <div class="column ai-center" v-if="!isRefill">
      <div class="ballance-block">
        <span class="ballance__bill">10</span>
        <BallanceIcon />
      </div>
      <!-- <span class="ballance__bill">10 <BallanceIcon /></span> -->
      <button class="button button__full" @click="setRefill">Top up</button>
    </div>
    <form
      class="ballance-card-block"
      v-else
      method="POST"
      accept-charset="utf-8"
      action="https://www.liqpay.ua/api/3/checkout"
    >
      <input type="hidden" name="data" :value="quickMeetingsLiqpay.data" />
      <input
        type="hidden"
        name="signature"
        :value="quickMeetingsLiqpay.signature"
      />
      <div class="row jc-center">
        <ProfileCard
          :title="1"
          :price="0.99"
          :activeItem="activeItem"
          @setCheckCard="setCheckCard"
        />
        <ProfileCard
          :title="10"
          :price="8.99"
          :activeItem="activeItem"
          @setCheckCard="setCheckCard"
        />
        <ProfileCard
          :title="50"
          :price="32.99"
          :activeItem="activeItem"
          @setCheckCard="setCheckCard"
        />
        <ProfileCard
          :title="100"
          :price="54.99"
          :activeItem="activeItem"
          @setCheckCard="setCheckCard"
        />
      </div>
      <button class="button button__full">
        {{ $t("Pay with") }} <LiqpayIcon />
      </button>
    </form>
  </div>
</template>

<script>
import BallanceIcon from "@/static/icons/gold.svg";
import LiqpayIcon from "@/static/icons/liqpay.svg";
import ProfileCard from "@/components/ProfileCard";

export default {
  components: { BallanceIcon, LiqpayIcon, ProfileCard },
  data() {
    return {
      isRefill: false,
      activeItem: ""
    };
  },
  computed: {
    quickMeetingsLiqpay() {
      return this.$store.getters["quick-dating/getQuickMeetingsLiqpay"];
    }
  },
  methods: {
    setRefill() {
      this.isRefill = !this.isRefill;
    },
    async setCheckCard(card) {
      this.activeItem = card.name;
      await this.$store.dispatch("quick-dating/generateLiqpay", {
        amount: card.title
      });
    }
  }
};
</script>
