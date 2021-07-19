<template>
  <div class="leader-line" @click="pay(price)">
    <div class="column ai-center jc-center">
      <div class="row">
        <Icon name="crown" class="crown"/>
        <h2 class="leader-line__title">{{ title }}</h2>
      </div>
      <template v-if="!description">
        <p class="leader-line__description">Ваша фотография отображается на вершине списка лидеров. Ваша фотография
          гарантировано будет отображаться в течении 30 минут.</p>
        <span class="leader-line__description-bottom">По истечению этого времени, ваша фотография будет отображаться до тех пор,
        пока эту функцию не оплатит другой пользователь</span>
      </template>
      <p class="leader-line__description" v-else-if="description">{{description}}</p>

      <div class="leader-line__price-block">
        <div class="line"></div>
        <div class="row jc-center ai-center">
          <span class="leader-line__price">{{ price }}</span>
          <Icon name="gold" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  components: {Icon},
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true
    },
  },
  data(){
    return {
    }
  },
  methods:{
    pay(id){
      this.$emit('payLeader', id)
    }
  },
  watch:{
    '$router'(){
      console.log(this.$router)
    }
  }

}
</script>

<style scoped>

</style>
